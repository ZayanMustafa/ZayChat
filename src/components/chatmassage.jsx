import React from 'react'

export function ChatMessages({ messages, currentUser }) {
  return (
    <div className="flex-1 p-4 h-full overflow-y-auto scroll-smooth">
      <div className="flex flex-col space-y-2">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-2 rounded-lg ${message.sender === currentUser ? 'bg-yellow-500 text-dark' : 'bg-gray-200'}`}>
              <span className="font-semiyellow"></span> {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
