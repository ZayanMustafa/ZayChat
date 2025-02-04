// UserList.js
import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="max-h-[95vh]  overflow-y-auto"> 
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4 mb-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectUser(user.id)}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black rounded-full mr-4">
            {user.avatar}
          </div>
          <div >{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
