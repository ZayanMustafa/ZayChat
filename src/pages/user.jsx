import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db, ref, get } from "../firebase/initializetion"; // Importing Firebase methods
import { MESSAGES, USERS } from "../components/users"; // Assuming these are predefined somewhere
import UserList from "../components/userlist"; // User list component
import ChatMessages from "../components/chatmassage"; // Chat messages component
import Title from "../components/title"; // Title component
import NoUserSelected from "../components/nouser"; // No user selected component
import Loader from "../components/Loader"; // Loader component for loading state
import { MessageInput } from "../components/massageInput"; // Message input component
import SearchComponent from "../components/search"; // Search component

const ChatApp = () => {
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
  const [loggedInUserName, setLoggedInUserName] = useState(""); // Store logged-in user's name
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [initialLoad, setInitialLoad] = useState(true); // Initial loading state for the layout
  const auth = getAuth(); // Initialize Firebase authentication

  useEffect(() => {
    const user = auth.currentUser; // Get the current user from Firebase auth

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setLoggedInUserName(snapshot.val().fullName); // Assuming 'fullName' is stored
          } else {
            console.log("No user data available");
            setLoggedInUserName("Unknown User");
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
          setLoggedInUserName("Unknown User");
        })
        .finally(() => {
          setLoading(false); // Mark loading as done once data is fetched
          setInitialLoad(false); // Ensure layout rendering is done
        });
    }
  }, [auth]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null); // Deselect the user and go back to the users list
  };

  const HandleSubmit = () => {
    alert("Message Sent");
  };

  // Get the messages for the selected user (if any)
  const selectedMessages = MESSAGES[selectedUserId] || [];

  // Show layout and structure first, while loading data in the background
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Users List) */}
        <div
          className={`bg-gray-200 w-full sm:w-1/3 md:w-1/4 sm:block ${selectedUserId ? "hidden sm:block" : "block"}`}
        >
          <Title /> {/* Title component */}

          {/* Search Component */}
          <SearchComponent
            messages={MESSAGES}
            users={USERS}
            onSelectUser={handleSelectUser}
          />

          {/* User list */}
          <UserList users={USERS} onSelectUser={handleSelectUser} />
          {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}
        </div>

        {/* Chat Section */}
        <div
          className={`flex-1 flex flex-col bg-gray-100 ${selectedUserId ? "block" : "hidden sm:block"}`}
        >
          <div className="flex items-center justify-between bg-yellow-400 p-4 text-black">
            {/* Show the logged-in user's name or the selected user's name */}
            <div className="cursor-pointer font-bold" onClick={handleBackToUsers}>
              {initialLoad ? (
                <div className="w-32 h-6 bg-yellow-300 animate-pulse rounded" /> // Placeholder while loading
              ) : (
                selectedUserId
                  ? USERS.find((user) => user.id === selectedUserId)?.name
                  : loggedInUserName
              )}
            </div>
          </div>

          {selectedUserId ? (
            <>
              <ChatMessages messages={selectedMessages} />
              <MessageInput onSendMessage={HandleSubmit} />
            </>
          ) : (
            <NoUserSelected />
          )}
        </div>
      </div>

      {/* Show the loader if the data is still loading */}
      {loading && <Loader />}
    </div>
  );
};

export default ChatApp;
