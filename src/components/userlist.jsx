import React from 'react';

export function UserList({ users, selectedUser, onSelectUser }) {
  return (
    <div className="w-[280px] fix bg-gray-100 p-4 h-auto">
      <h2 className="font-bold text-lg">Users</h2>
      <ul className="overflow-y-auto h-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className={`p-2 rounded-lg cursor-pointer ${selectedUser?.id === user.id ? 'bg-yellow-300' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <img src={user.avatar} alt={user.name} className=" text-white-800 inline-block w-8 h-8 rounded-full mr-2" />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
