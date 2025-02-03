import React, { useState } from "react";
import { MessageInput } from "../components/massageInput";
import SearchComponent from "../components/search";
import { MESSAGES, USERS } from "../components/users";
import UserList from "../components/userlist";


const ChatApp = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
  };
  const HandleSumbit = () => {
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
              Zayyan Mustafa
          </div>

          {/* Search */}
          <SearchComponent messages={MESSAGES} />

          {/* User List */}
          <UserList users={USERS} onSelectUser={handleSelectUser} />
          {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}

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
