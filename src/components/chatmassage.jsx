import { useEffect, useState } from "react";
import { db, ref, onValue, push } from "../firebase/initialization";
import { FaCommentAlt } from "react-icons/fa"; 

const ChatMessages = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState("");  // Use state to track sender name
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!senderId || !receiverId) return;

    const senderRef = ref(db, `users/${senderId}`);
    onValue(senderRef, (snapshot) => {
      if (snapshot.exists()) {
        setSenderName(snapshot.val().fullName || "You"); 
      } else {
        setSenderName("You");
      }
    });

    const chatRoomId =
      senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
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

  const sendMessage = () => {
    if (messageText.trim()) {
      const chatRoomId =
        senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
      const messagesRef = ref(db, `chats/${chatRoomId}/messages`);

      const messageData = {
        sender: senderId,
        senderName: senderName,  
        text: messageText,
        timestamp: Date.now(),
      };

      push(messagesRef, messageData)
        .then(() => setMessageText(""))
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full text-xl text-gray-700">
          <FaCommentAlt className="mb-2 text-yellow-500" size={250} />

          <p>
            <strong className="text-gray-800" >{senderName}</strong>!
            Sometimes the best connections start with a simple 'hi.' <br />
            Ready to make one, 
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${msg.sender === senderId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 max-w-xs rounded-lg ${
                msg.sender === senderId ? "bg-gray-200 text-white" : "bg-yellow-200"
              }`}
            >
              <p className="text-gray-700">{msg.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
