"use client"

import { useState } from "react"
import { AvatarImage, Avatar, AvatarFallback } from "./avatar"
import { ArrowLeft, ImageIcon, Send } from "lucide-react"
import Button from "./button"
import InputFeild from "./inputfeild"

export function ChatWindow({ user, messages, onBack, isMobile }) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <div className="flex items-center p-4 bg-white border-b">
        {isMobile && (
          < Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="ml-4 font-medium">{user.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isOwn ? "bg-blue-500 text-white" : "bg-white text-gray-900"
              }`}
            >
              <p>{message.text}</p>
              <span className={`text-xs ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white">
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="icon" className="shrink-0">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <InputFeild
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

