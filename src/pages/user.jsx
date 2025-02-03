import React, { useState } from "react";
import { MessageInput } from "../components/massageInput";
import SearchComponent from "../components/search";
import { MESSAGES , USERS } from "../components/users";


const ChatApp = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
  };
  const HandleSumbit = () =>{
    alert("Hasan")
  }

  const selectedMessages = MESSAGES[selectedUserId] || [];

  return (
    <div className="h-screen flex flex-col">
      {/* Outer container to handle responsiveness */}
      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar (Users List) */}
        <div
          className={`
            bg-gray-200 w-full sm:w-1/3 md:w-1/4
            sm:block
            ${selectedUserId ? "hidden sm:block" : "block"}
          `}
        >
          {/* App Title */}
          <div className="bg-yellow-400 text-black p-4 font-bold">
            chat app by zayyan
          </div>

          {/* Search */}
            <SearchComponent messages={MESSAGES} />

          {/* User List */}
          <div>
            {USERS.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectUser(user.id)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black rounded-full mr-4">
                  {user.avatar}
                </div>
                <div>{user.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div
          className={`
            flex-1 flex flex-col
            bg-gray-100
            ${selectedUserId ? "block" : "hidden sm:block"}
          `}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-yellow-400 p-4 text-black">
            {/* If on mobile, show a "back" trigger by clicking the name */}
            <div
              className="cursor-pointer font-bold"
              onClick={handleBackToUsers}
            >
              {/* Show the selected user’s name or a default */}
              {selectedUserId
                ? USERS.find((user) => user.id === selectedUserId)?.name
                : "No user selected"}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedMessages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{msg.from}</p>
                <p className="text-gray-700">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <MessageInput onSendMessage={HandleSumbit} />
          </div>
        </div>
      </div>
  );
};

export default ChatApp;
