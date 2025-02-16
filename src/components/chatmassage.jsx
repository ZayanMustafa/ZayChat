import { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase/initializetion";

const ChatMessages = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState("");  // State for receiver's name

  useEffect(() => {
    if (!senderId || !receiverId) return;

    // Fetch receiver's name from Firebase
    const receiverRef = ref(db, `users/${receiverId}`);
    onValue(receiverRef, (snapshot) => {
      if (snapshot.exists()) {
        setReceiverName(snapshot.val().fullName || "Unknown User");
      } else {
        setReceiverName("Unknown User");
      }
    });

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
          <p className="font-semibold">{msg.sender === senderId ? "You" : receiverName}</p> {/* Use receiverName here */}
          <p className="text-gray-700">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
