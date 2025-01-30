import React, { useState } from 'react';
import { MessageInput } from './massageInput';

export function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.type === 'text' ? (
              <p>{msg.content}</p>
            ) : (
              <img src={msg.content} alt="User upload" />
            )}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}