// ProfilePage.jsx
import React, { useState, useRef, useEffect } from 'react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('Current Username');
  const [newEmail, setNewEmail] = useState('Current Email');
  const [newPassword, setNewPassword] = useState('********');
  const [profilePicture, setProfilePicture] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&usqp=CAU');
  const fileInputRef = useRef(null);

  const handleSave = () => {
    // Implement save functionality here
    setIsEditing(false);
    // Optionally, you can send updated data to the server
  };

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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        {/* Profile Picture */}
        <div className="mr-8">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageChange}
          />
          {/* Edit profile picture */}
          <span
            className="mt-2 block text-center text-blue-500 hover:text-blue-700 cursor-pointer"
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
          <div className="mb-4">
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
              className="block mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
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
              className="block mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Email
            </span>
          </div>

          {/* Password */}
          <div className="mb-4">
            <span className="font-semibold text-lg">Password:</span>
            {isEditing ? (
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full mt-2 p-2 border-b-2 border-blue-500 outline-none focus:border-blue-700"
              />
            ) : (
              <span className="text-lg ml-2">{newPassword}</span>
            )}
            {/* Edit password */}
            <span
              className="block mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              Change Password
            </span>
          </div>

          {/* Save button */}
          {isEditing && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
