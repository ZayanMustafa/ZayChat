import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSendMessage, senderId, receiverId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message.trim(), senderId, receiverId);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex items-center space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      <button
        type="submit"
        className={`bg-yellow-500 text-white p-2 rounded-lg ${
          !message.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!message.trim()}
      >
        <FaPaperPlane size={20} className="text-white" />
      </button>
    </form>
  );
};

export default MessageInput;
