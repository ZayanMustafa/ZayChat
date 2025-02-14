import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, db , ref, get } from "../firebase/initializetion"; 
import UserList from "../components/userlist";
import ChatMessages from "../components/chatmassage";
import Title from "../components/title";
import NoUserSelected from "../components/nouser";
import Loader from "../components/Loader";
import { MessageInput } from "../components/massageInput";
import SearchComponent from "../components/search";

const ChatApp = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setLoggedInUserName(snapshot.val().fullName || "Unknown User hey Boss");
          } else {
            console.log("No user data available");
            setLoggedInUserName("Unknown User");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.log("No user is logged in");
      setLoggedInUserName("Guest");
    }
  });

  return () => unsubscribe(); 
}, []);

  useEffect(() => {
    const usersRef = ref(db, "users");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.keys(usersData).map((key) => ({
            id: key,
            ...usersData[key],
          }));
          setUsers(usersArray);
        } else {
          console.log("No users found");
          setUsers([]);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
  };

  const HandleSubmit = () => {
    alert("Message Sent");
  };

  const selectedMessages = {}; 

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Users List) */}
        <div className={`bg-gray-200 w-full sm:w-1/3 md:w-1/4 sm:block ${selectedUserId ? "hidden sm:block" : "block"}`}>
          <Title />
          <SearchComponent messages={selectedMessages} users={users} onSelectUser={handleSelectUser} />
          {users.length > 0 ? (
            <UserList users={users} onSelectUser={handleSelectUser} />
          ) : (
            <p className="text-center text-gray-500">No users available</p>
          )}
        </div>

        {/* Chat Section */}
        <div className={`flex-1 flex flex-col bg-gray-100 ${selectedUserId ? "block" : "hidden sm:block"}`}>
          <div className="flex items-center justify-between bg-yellow-400 p-4 text-black">
            <div className="cursor-pointer font-bold" onClick={handleBackToUsers}>
              {initialLoad ? (
                <div className="w-32 h-6 bg-yellow-300 animate-pulse rounded" />
              ) : (
                selectedUserId ? users.find((user) => user.id === selectedUserId)?.fullName : loggedInUserName
              )}
            </div>
          </div>

          {selectedUserId ? (
            <>
              <ChatMessages senderId={currentUserId} receiverId={selectedUserId} />
              <MessageInput onSendMessage={(msg) => HandleSubmit(msg.content, currentUserId, selectedUserId)} />
            </>
          ) : (
            <NoUserSelected />
          )}
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ChatApp;
