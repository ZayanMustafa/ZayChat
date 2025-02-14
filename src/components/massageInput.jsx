import { db, ref, push, set, serverTimestamp } from "../firebase/initializetion";

const HandleSubmit = (message, senderId, receiverId) => {
  if (!message.trim()) return;

  // Create unique chat room ID based on both UIDs (sorted to avoid duplicates)
  const chatRoomId = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

  // Reference to the chat messages
  const messagesRef = ref(db, `chats/${chatRoomId}/messages`);

  // Push new message to the chat
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    sender: senderId,
    receiver: receiverId,
    text: message,
    timestamp: serverTimestamp(),
  });
};
