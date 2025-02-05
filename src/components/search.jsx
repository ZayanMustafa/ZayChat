import React, { useState } from "react";

const SearchComponent = ({ messages, users, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameClick = (name) => {
    const user = users.find((user) => user.name === name);
    if (user) {
      onSelectUser(user.id);
      setSearchTerm(""); // Clear the search input
    }
  };

  const filteredNames = Object.values(messages)
    .flat()
    .map((message) => message.from)
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()));

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
        {searchTerm && filteredNames.length === 0 ? (
          <p className="text-gray-500">No names found</p>
        ) : (
          searchTerm &&
          filteredNames.map((name, index) => (
            <div
              key={index}
              onClick={() => handleNameClick(name)}
              className="cursor-pointer ms-4 mb-2 text-black-500 hover:underline"
            >
              {name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
