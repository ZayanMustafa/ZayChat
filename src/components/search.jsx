import React, { useState } from "react";

const SearchComponent = ({ messages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameClick = (name) => {
    setSelectedName(name);
  };

  const uniqueNames = Object.values(messages)
    .flat()
    .map((message) => message.from)
    .filter((value, index, self) => self.indexOf(value) === index);

  const filteredNames = uniqueNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessages =
    selectedName &&
    Object.values(messages)
      .flat()
      .filter((message) => message.from === selectedName);

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
          <p>No names found</p>
        ) : (
          searchTerm && 
          filteredNames.map((name, index) => (
            <div
              key={index}
              onClick={() => handleNameClick(name)}
              className="cursor-pointer mb-2 text-blue-500 hover:underline"
            >
              {name}
            </div>
          ))
        )}
      </div>
      {selectedMessages && selectedMessages.length > 0 && (
        <div className="mt-4">
          <h3>Messages from {selectedName}:</h3>
          {selectedMessages.map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.from}:</strong> {message.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
