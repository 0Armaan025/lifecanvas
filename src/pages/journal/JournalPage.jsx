// JournalPage.jsx

import React, { useState } from 'react';
import './journalpage.css';
import Navbar from '../../components/navbar/Navbar';

const JournalPage = () => {
  const [entryText, setEntryText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (event) => {
    setEntryText(event.target.value);
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

  const handleSaveEntry = () => {
    // Implement logic to save the entry to a database or perform other actions
    console.log('Entry saved:', entryText);
    console.log('Selected File:', selectedFile);
    console.log('Current Time:', getCurrentDateTime());
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
                <textarea
                  style={{ width: '450px' }}
                  value={entryText}
                  onChange={handleTextChange}
                  placeholder="Write your thoughts here..."
                  className="entry-textarea h-80 p-2 border rounded-md mb-4 resize-none"
                ></textarea>
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

            <button onClick={handleSaveEntry} className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save Entry
            </button>
          </div>
        </div>
      </center>
    </>
  );
};

export default JournalPage;
