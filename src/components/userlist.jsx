import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import Input from './input';
// import { UserList } from './userlist';
export function UserList({ users, selectedUserId, onSelectUser }) {
    return (
        <div className="flex flex-col h-full bg-[#fdd835]">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold mb-4">Chat App</h1>
                <Input
                    type="text"
                    placeholder="Search users..."
                    className="bg-white border border-gray-300 rounded-lg p-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm hover:shadow-lg"
                />

            </div>
            <div className="flex-1 overflow-y-auto">
                {users.length > 0 ? (
                    users.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => onSelectUser(user)}
                            className={`flex items-center w-full p-4 hover:bg-white-400 transition-colors ${selectedUserId === user.id.toString() ? "bg-white-400" : ""
                                }`}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="ml-4 text-left font-medium">{user.name}</span>
                        </button>
                    ))
                ) : (
                    <p className="p-4">No users available</p>
                )}
            </div>
        </div>
    );
}