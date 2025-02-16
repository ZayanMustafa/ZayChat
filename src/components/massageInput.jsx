import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";  // Importing the paper plane icon

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
    <form onSubmit={handleSubmit} className="p-4 flex items-center space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none"
      />
      {/* Send Button with yellow color */}
      <button type="submit" className="bg-yellow-500 text-white p-2 rounded-lg">
        <FaPaperPlane size={20} className="text-white" />
      </button>
    </form>
  );
};

export default MessageInput;
