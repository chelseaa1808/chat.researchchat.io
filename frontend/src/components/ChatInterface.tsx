import React, { useState } from "react";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
    { text: "I want to know more about your platform.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-4 border-b border-gray-300 text-center font-semibold text-gray-700">
          Research Chat
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs break-words px-4 py-2 rounded-md ${
                msg.sender === "bot"
                  ? "bg-teal-200 text-blue-900 self-start"
                  : "bg-green-200 text-green-900 ml-auto text-right"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative border-t border-gray-200">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-3 pr-24 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 bottom-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 font-semibold text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;