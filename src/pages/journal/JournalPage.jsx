// JournalPage.jsx

import React, { useState } from 'react';
import './journalpage.css';
import Navbar from '../../components/navbar/Navbar';

import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";


const JournalPage = () => {
  const [entryText, setEntryText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleTextChange = (event) => {
    setEntryText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEntryText(entryText + '\n');
      e.preventDefault(); // Prevent default behavior of adding newline in single-line input
    }
  };


  const submitJournal = async () => {
    let user = auth.currentUser;
  
    if (user !== null) {
      if (selectedFile != null) {
        const storageRef = ref(storage, `files/journalpics/${user.uid}/${getCurrentDateTime()}/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            alert(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrl(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
            }
          }
        );
      }
  
      const specificDocRef = doc(db, "journal", getCurrentDateTime());
  
      const userData = {
        uid: user.uid,
        journalText: entryText,
        dateTime: getCurrentDateTime().toString(),
        imageUrl: imageUrl || 'No image submitted',
      };
  
      try {
        await setDoc(specificDocRef, userData);
      } catch (error) {
        console.error("Error setting document:", error);
      }
    }
  };
  





  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navbar />
      <center>
        <div className="journal-container p-8 ml-2 mr-2 " style={{ width: '650px', height: '480px' }}>
          <div className="journal-header mb-6">
            <h1 className="text-3xl font-semibold color-black" style={{ fontFamily: 'Poppins' }}>
              My Journal
            </h1>
            <p className="text-gray-black mt-4">{getCurrentDateTime()}</p>
          </div>

          <div className="journal-entry p-4 rounded-md shadow-md">
            <div className="double-page">
              <div className="left-page pr-2" style={{ width: '40px', marginRight: '400px' }}>

                <input type="text" className='journalEntry' onKeyDown={handleKeyDown} value={entryText} onChange={handleTextChange} placeholder='Write your thoughts here....' />
                <br />
                {/* <textarea
                  style={{ width: '450px' }}
                  value={entryText}
                  onChange={handleTextChange}
                  placeholder="Write your thoughts here..."
                  className="entry-textarea h-80 p-2 border rounded-md mb-4 resize-none"
                ></textarea> */}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="fileInput" className="block text-base font-medium text-black" style={{ fontFamily: 'poppins' }}>
                Choose Image or Video from Gallery:
              </label>

              <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {selectedFile && (
              <div className="mb-4">
                <p className="block text-base font-medium text-black" style={{ fontFamily: 'poppins' }}>
                  Selected Image:
                </p>
                <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="max-w-full h-auto mb-2" />
              </div>
            )}

            <button onClick={submitJournal} className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save Entry
            </button>
          </div>
        </div>
        <br /><br /><br />
      </center>
    </>
  );
};

export default JournalPage;
