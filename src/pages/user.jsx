import React, { useState, useEffect } from "react";
// import { } from "firebase/auth";
import { db, ref, get , push,serverTimestamp , onAuthStateChanged, getAuth } from "../firebase/initializetion";
import UserList from "../components/userlist";
import ChatMessages from "../components/chatmassage";
import Title from "../components/title";
import NoUserSelected from "../components/nouser";
import Loader from "../components/Loader";
import MessageInput from "../components/massageInput";
import SearchComponent from "../components/search";

const ChatApp = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);  
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setLoggedInUserName(snapshot.val().fullName || "Unknown User");
            } else {
              setLoggedInUserName("Unknown User");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
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

  
  
  const HandleSubmit = (message) => {
    if (!message.trim()) return; // Avoid sending empty messages

    const chatRoomId = currentUserId < selectedUserId ? `${currentUserId}_${selectedUserId}` : `${selectedUserId}_${currentUserId}`;
    
    // Create a reference for the new message
    const messagesRef = ref(db, `chats/${chatRoomId}/messages`);
    
    // Create a new message object
    const newMessage = {
      sender: currentUserId,
      text: message,
      timestamp: serverTimestamp(),
    };
  
    // Push the new message to Firebase
    push(messagesRef, newMessage)
      .then(() => {
        // Optionally, handle any post-send logic, e.g., clearing input field
        alert(`Message Sent: ${message}`);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };



  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar (Users List) */}
        <div className={`bg-gray-200 w-full sm:w-1/3 md:w-1/4 sm:block ${selectedUserId ? "hidden sm:block" : "block"}`}>
          <Title />
          <SearchComponent users={users} onSelectUser={handleSelectUser} />
          {users.length > 0 ? (
            <UserList users={users} onSelectUser={handleSelectUser} />
          ) : (
            <p className="text-center font-(--my-font) text-gray-700">No users available</p>
          )}
        </div>

        {/* Chat Section */}
        <div className={`flex-1 flex flex-col bg-gray-100 ${selectedUserId ? "block" : "hidden sm:block"}`}>
          <div className="flex items-center justify-between bg-yellow-400 p-4 text-black">
            <div className="cursor-pointer font-bold" onClick={handleBackToUsers}>
              {selectedUserId ? users.find((user) => user.id === selectedUserId)?.fullName : loggedInUserName}
            </div>
          </div>

          {selectedUserId ? (
            <>
              <ChatMessages senderId={currentUserId} receiverId={selectedUserId} />
              <MessageInput
                onSendMessage={HandleSubmit}
                senderId={currentUserId}
                receiverId={selectedUserId}
              />

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
