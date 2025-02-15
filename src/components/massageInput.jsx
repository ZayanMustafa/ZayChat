import React, { useState } from "react";
import { db, ref, push, set, serverTimestamp } from "../firebase/initializetion";

const MessageInput = ({ onSendMessage, senderId, receiverId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return; // Prevent empty messages

    // Call the parent function to send the message
    onSendMessage(message.trim(), senderId, receiverId);
    
    // Clear the input field after sending
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
