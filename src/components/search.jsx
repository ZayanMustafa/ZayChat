import React, { useState, useEffect } from "react";

const SearchComponent = ({ users, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Handle search term change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle user click
  const handleNameClick = (id) => {
    onSelectUser(id);
    setSearchTerm("");
    setFilteredUsers([]);
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
          filteredUsers.map((user) => (
            <div
            key={user.id}
            onClick={() => handleNameClick(user.id)}
            className="cursor-pointer ms-4 mb-2 text-black hover:text-yellow-500"
          >
          
              {user.fullName}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
