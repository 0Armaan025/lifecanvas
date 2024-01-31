import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';

import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";


const AuthPage = () => {


  let user = null;


  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const firebaseConfig = {
    apiKey: "AIzaSyACkCTvtbzjAYUXWFCZVQkmHIj9oDmGmDQ",
    authDomain: "lifecanvas-11e.firebaseapp.com",
    projectId: "lifecanvas-11e",
    storageBucket: "lifecanvas-11e.appspot.com",
    messagingSenderId: "830599258206",
    appId: "1:830599258206:web:929be923aa6eb922c654cf",
    measurementId: "G-GMD8LBH8X6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const submitUserData = async () => {


    try {


      const specificDocRef = doc(db, "users", user.uid);

      if (image != null) {
        const storageRef = ref(storage, `files/${user.uid}/${image.name}`);
        
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          },
          (error) => {
            alert(error);
          },
          () => {
            
          }
        );
      }


      if (imageUrl == '') {
        const userData = {
          uid: user.uid,
          username: username,
          password: password,
          email: email,
          imageUrl: '',        
          }
        console.log('trying');
        await setDoc(specificDocRef, userData);
      }
      else {
        const userData = {
          uid: user.uid,
          username: username,
          password: password,
          email: email,
          imageUrl: imageUrl,
        }
        console.log('trying');
        await setDoc(specificDocRef, userData);
      }




    } catch (err) {
      console.error("Error writing document: ", err);
    }
  }




  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);
  };


  const signUp = async () => {


    // const ref = firestore.collection('users');

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;


        submitUserData();

        console.log("signed in");
        setEmail("");
        setPassword("");





      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        // ..
      });


    // Password toggle handler
  };

  const logIn = async () => {


    // const ref = firestore.collection('users');

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;




        console.log("signed in");
        setEmail("");
        setPassword("");





      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        // ..
      });


    // Password toggle handler
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login/signup logic here
    console.log('Form submitted!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full  p-8 rounded-md shadow-md">
          <h2 className="text-4xl font-extrabold text-center overflow-hidden text-black mb-6" style={{ fontFamily: "poppins" }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="profilePic" className="block text-base font-medium text-black">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-base font-medium text-black">
                  Username:
                </label>
                <input
                  onChange={handleUsernameChange}
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-base font-medium text-black">
                Email:
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-medium text-black">
                Password:
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                isLogin ? logIn() : signUp();
              }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-center text-base text-black">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={handleToggle}
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
