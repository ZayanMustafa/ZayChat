"use client"

import { useEffect, useState } from "react";
import { UserList } from "../components/userlist";
import { ChatWindow } from "../components/chatwindow";
import { getUsers } from "../lib/api";

export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([
      {
        id: "1",
        userId: user.id,
        text: "Hey!",
        timestamp: new Date().toISOString(),
        isOwn: false,
      },
      {
        id: "2",
        userId: "2",
        text: "Hey, how are you",
        timestamp: new Date().toISOString(),
        isOwn: true,
      },
    ]);
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat-app flex">
      <UserList users={users} selectedUserId={selectedUser?.id} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
      )}
    </div>
  );
}