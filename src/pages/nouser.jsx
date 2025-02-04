import React from 'react';
import FindImage from '../assets/User.png';

const NoUserSelected = () => {
  return (
    <div className="select-none flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <img 
        src={FindImage}
        alt="No user selected" 
        className="w-150 h-150 mb-6" 
      />
      <p className="text-2xl font-bold text-gray-800">Select to start conversation</p>
      <p className="text-lg text-gray-600 mt-2">
        Please select a user from the list to start a conversation.
      </p>
      <p className="text-lg text-gray-600">
        Your messages will appear here once you choose a contact.
      </p>
    </div>
  );
};

export default NoUserSelected;
