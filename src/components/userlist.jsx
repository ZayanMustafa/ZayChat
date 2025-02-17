import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase/initialization";
import { auth } from "../firebase/initialization"; 
import Loader from "./loder"; 

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [recentChats, setRecentChats] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch all users
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userList = Object.keys(userData)
          .filter((key) => key !== currentUser) 
          .map((key) => ({
            id: key,
            name: userData[key].fullName || "No Name",
          }));

        setUsers(userList);
      } else {
        setUsers([]);
      }
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    // Fetch recent chats for sorting
    const recentChatsRef = ref(db, `users/${currentUser}/recentChats`);
    onValue(recentChatsRef, (snapshot) => {
      if (snapshot.exists()) {
        setRecentChats(snapshot.val());
      } else {
        setRecentChats({});
      }
    });

  }, [currentUser]);


  const sortedUsers = [...users].sort((a, b) => {
    const timeA = recentChats[a.id] || 0;
    const timeB = recentChats[b.id] || 0;
    return timeB - timeA; 
  });

  return (
    <div className="max-h-[95vh] overflow-y-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : sortedUsers.length > 0 ? (
        sortedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 mb-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectUser(user.id)}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black rounded-full mr-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-5">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
