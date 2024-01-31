import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

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

const Navbar = () => {

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

    return (
        <>


            <nav className="">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="text-white font-bold text-3xl">LifeCanvas</span>
                    </Link>
                    <button data-collapse-toggle="mega-menu-full" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div id="mega-menu-full" className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className='navbarItem'>
                                <Link to="/" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                            </li>

                            <li className='navbarItem'>
                                {auth.currentUser ? (
                                    <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
                                ) : null}
                            </li>
                            <li className='navbarItem'>
                                {auth.currentUser ? (
                                    <Link to="/profile" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Profile</Link>
                                ) : null}
                            </li>
                            <li className='navbarItem'>
                                <Link to="/write-journal"><input type="button" value="Write for today ✏️" className='writeForTodayBtn' /></Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default Navbar
