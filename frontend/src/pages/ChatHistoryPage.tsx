import React from "react";
import { useParams } from "react-router-dom";
import ChatHistory from "../components/ChatHistory";

const ChatHistoryPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
          Invalid chat session. UUID is missing.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Chat History
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded shadow">
        <ChatHistory uuid={uuid} />
      </div>
    </div>

  

export default ChatHistoryPage;
