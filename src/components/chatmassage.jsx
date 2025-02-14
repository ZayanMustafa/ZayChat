import { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase/initializetion";

const ChatMessages = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!senderId || !receiverId) return;

    const chatRoomId = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
    const messagesRef = ref(db, `chats/${chatRoomId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = Object.values(snapshot.val());
        setMessages(messagesData.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [senderId, receiverId]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{msg.sender === senderId ? "You" : "Friend"}</p>
          <p className="text-gray-700">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
