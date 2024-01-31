// ProfilePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import './profilepage.css';
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import Navbar from '../../components/navbar/Navbar';

const ProfilePage = () => {


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

  let ourUser = null;
  

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('Current Username');
  const [newEmail, setNewEmail] = useState('Current Email');
  
  const [profilePicture, setProfilePicture] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&usqp=CAU');
  const fileInputRef = useRef(null);

  const handleSave = async () => {
    try {

      ourUser = auth.currentUser;

      if (!ourUser) {
        console.log("User not authenticated");
        return;
      }

      const specificDocRef = doc(db, "users", ourUser.uid.toString());
      const docSnapshot = await getDoc(specificDocRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        await setDoc(specificDocRef, {
          username: newUsername,
          email: newEmail,
          uid: ourUser.uid,
          password: userData.password,
          imageUrl: profilePicture,
        });

        setIsEditing(false);

        console.log("User data updated successfully");
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  

  const getDataFromServer = async () => {
      

    
      const specificDocRef = doc(db, "users", ourUser.uid.toString());
      const docSnapshot = await getDoc(specificDocRef);
  
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        console.log("we got the data", userData);

        setNewUsername(userData.username);
        setNewEmail(userData.email);

        if(userData.imageUrl!='') {
          setProfilePicture(userData.profilePicture);
        } 

        
        
        console.log(userData);
      } else {
        console.log("Document does not exist");
      }
    }
   

   


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleImageChange = () => {
    // Trigger the file input click when the pencil icon for the image is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file selection and update the profile picture
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Close editing fields when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        ourUser = user;
        getDataFromServer();
      } else {
        console.log('User is not signed in.');
      }
    });

    return () => unsubscribe();
  }, [auth]); 
  

  return (
    <>
    <Navbar/>

    <center>
      <h4 className='font-bold text-4xl mt-4 color-white overflow-hidden' style={{fontFamily: "Poppins", textShadow: "2px 1px 3px yellow"}}>Time to update profile! :D</h4>
    </center>
    <div className="container mt-4 p-4 m-2 mr-16 bg-green-400 shadow-lg rounded-lg" style={{ margin: "20px", marginRight: "80px" }}>
      <div className="flex items-center mr-8">
        {/* Profile Picture */}
        <div className="mr-8 ml-12" style={{ marginLeft: "14px", marginTop: "30px" }}>
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 ml-5 h-24 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageChange}
          />
          {/* Edit profile picture */}
          <span
            className="mt-2 block text-center text-white cursor-pointer"
            onClick={handleImageChange}
          >
            Change Picture
          </span>
          {/* Hidden file input for image selection */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {/* User Details */}
        <div>
          {/* Username */}
          <div className="mb-4 mt-4">
            <span className="font-semibold text-lg">Username:</span>
            {isEditing ? (
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="block w-full mt-2 p-2 border-b-2 border-blue-500 outline-none focus:border-blue-700"
              />
            ) : (
              <span className="text-lg ml-2">{newUsername}</span>
            )}
            {/* Edit username */}
            <span
              className="block mt-2 text-white cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Username
            </span>
          </div>

          {/* Email */}
          <div className="mb-4">
            <span className="font-semibold text-lg">Email:</span>
            {isEditing ? (
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="block w-full mt-2 p-2 border-b-2 border-blue-500 outline-none focus:border-blue-700"
              />
            ) : (
              <span className="text-lg ml-2">{newEmail}</span>
            )}
            {/* Edit email */}
            <span
              className="block mt-2 text-white cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Email
            </span>
          </div>

         

          {/* Save button */}
          {isEditing && (
            <button
              className="bg-blue-500 text-white py-2 mb-16 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
            
          )}
          <br/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
