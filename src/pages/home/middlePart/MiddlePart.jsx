import React, { useEffect } from 'react';
import './middlepart.css';

import { initializeApp } from "firebase/app";
import { Link } from 'react-router-dom';
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

const MiddlePart = () => {

  let user = null;

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

  


  return (
    <>
     <div className="boxes">

            
            <h2 className='glowingText font-bold text-5xl mt-32 mr-72 overflow-hidden' style={{fontFamily: 'Poppins',marginTop: "32px", marginRight: "432px"}}> Welcome to LifeCanvas, lego! </h2>
            <h4 className='mt-32, font-semibold text-xl mt-32 mr-72' style={{fontFamily: "poppins", marginTop: "42px"}}> Your own personal journal to write your thoughts, feelings, ideas, attach graphics, and a lot more! </h4>
            <br/>
            <center>
            <Link to={auth.currentUser ? '/write-journal/' : '/auth'}>
      <button className='getStartedBtn overflow-hidden'>Get Started!</button>
    </Link>
              </center>
            <br/>
            <hr style={{width: "100%", height: "1px", color: "black"}}/>
            <center><h3 className='text-5xl font-bold ' style={{marginTop: "32px",fontFamily: "Poor story", color: "red", textShadow: "2px 1px 3px black"}}> It's Features </h3></center>

            <div className="features">
                <div className="feature">
                    <img className="mr-16" src="https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhcnl8ZW58MHx8MHx8fDA%3D" alt="image not loading, error 404 not found" height="160px" width="160px"/>
                    <p className='ml-16 text-lg' style={{fontFamily: "poppins"}}>Writing your diary/journal daily will help you analyze your progress, is gonna keep you motivated, and gonna be helpful in future with daily life memories, you can also add media graphics!</p>
                </div>

                <div className="feature">
                    
                    <p className='ml-16 text-lg' style={{fontFamily: "poppins"}}>Feature of dashboard is gonna allow you to see your stats, like total words/sentences/paragraphs written, total days streak(def. not copied from snapchat), or maybe you can just share a screenshot to make your friends jealous!</p>
                    <img className="mr-16" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww" alt="image not loading, error 404 not found" height="160px" width="160px"/>
                </div>

                <center>
                  <h4 className='text-3xl font-bold'> And more coming soon...!</h4>
                  <br/>
                  <br/>
                </center>
            </div>

       
     </div>
    </>
  )
}

export default MiddlePart
