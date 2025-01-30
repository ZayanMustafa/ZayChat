import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";

export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-200 flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 rounded-lg border border-gray-300"
      />
      <button type="submit" className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
        <IoMdSend size={24} />
      </button>
    </form>
  );
}