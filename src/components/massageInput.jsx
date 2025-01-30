import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage({ type: 'text', content: message });
      setMessage('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage({ type: 'image', content: reader.result });
      };
      reader.readAsDataURL(file);
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
      <label className="ml-2 p-2 rounded-full bg-yellow-300 text-white hover:bg-yellow-400 cursor-pointer">
        <FaCamera size={24} />
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>
      <button type="submit" className="ml-2 p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
        <IoMdSend size={24} />
      </button>
    </form>
  );
}
