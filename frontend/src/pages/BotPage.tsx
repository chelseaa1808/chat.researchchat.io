import React from "react";
import { useGetBotsQuery } from "../store/apis/chatApi";
import BotTable from "../components/BotTable";

const BotPage: React.FC = () => {
  const { data, isLoading, isError } = useGetBotsQuery();

  const headers = [
    { key: "display_name", name: "Display Name" },
    { key: "model", name: "Model" },
    { key: "bot_initiates", name: "Bot Initiates?" },
    { key: "system_message", name: "System Message" },
  ];

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Available Bots
      </h1>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading bots...</p>
      ) : isError ? (
        <p className="text-red-600 dark:text-red-400">Failed to load bots.</p>
      ) : (
        <BotTable headers={headers} tableData={data} />
      )}
    </div>
  );
};

export default BotPage;
