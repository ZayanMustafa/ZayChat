import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase/initializetion";
import { auth } from "../firebase/initializetion"; 
import Loader from "../components/Loader"; 

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

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

    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userList = Object.keys(userData)
          .filter((key) => key !== currentUser) 
          .map((key) => ({
            id: key,
            name: userData[key].fullName || "No Name",
            email: userData[key].email || "No Email",
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); 
        setUsers(userList);
      } else {
        setUsers([]);
      }
      setLoading(false);
    }, () => {
      setLoading(false);
    });

  }, [currentUser]); 

  return (
    <div className="max-h-[95vh] overflow-y-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader /> 
        </div>
      ) : users.length > 0 ? (
        users.map((user) => (
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
              <p className="text-sm text-gray-500">{user.email}</p>
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
