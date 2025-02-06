import React, { useState, useEffect } from "react";
import {   getAuth , getFirestore, collection, getDocs } from "../firebase/initializetion"; 
const SearchComponent = ({ messages, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const auth = getAuth();
  const db = getFirestore();

  // Fetch users from Firebase Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users"); // Assuming your users are stored in the "users" collection
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data());
      setUsers(userList);
    };

    fetchUsers();
  }, [db]);

  // Handle search term change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle user click
  const handleNameClick = (id) => {
    onSelectUser(id); // Show the chat for the selected user
    setSearchTerm(""); // Clear the search input
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Names"
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
      />
      <div className="mt-4">
        {searchTerm && filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => handleNameClick(user.id)}
              className="cursor-pointer ms-4 mb-2 text-black-500 hover:underline"
            >
              {user.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
