const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{msg.from}</p>
          <p className="text-gray-700">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;


