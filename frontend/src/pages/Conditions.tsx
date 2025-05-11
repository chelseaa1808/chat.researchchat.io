import React from "react";
import { useParams } from "react-router-dom";
import { useGetConversationsQuery } from "../store/apis/chatApi";
import ConversationTable from "../components/ConversationTable";

const ConversationPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, isError } = useGetConversationsQuery(name, {
    skip: !name,
  });

  const headers = [
    { key: "uuid", name: "UUID" },
    { key: "created", name: "Created At" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Conversations for Bot: <span className="font-mono">{name}</span>
      </h1>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading conversations...</p>
      ) : isError ? (
        <p className="text-red-600 dark:text-red-400">Failed to load conversations.</p>
      ) : (
        <ConversationTable headers={headers} tableData={data || []} />
      )}
    </div>
  );
};

export default ConversationPage;
