import React from "react";
import { useGetBotsQuery } from "../store/apis/chatApi";
import BotTable from "../components/BotTable";

const BotPage: React.FC = () => {
  const { data, isLoading, isError } = useGetBotsQuery();

  const headers = [
    { key: "display_name", name: "Display Name" },
    { key: "description", name: "Description" },
    { key: "model", name: "Model" },
    { key: "bot_initiates", name: "Bot Initiates?" },
  ];

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Listing Bots
        </h1>
        <button
          className="px-4 py-2 text-white bg-black rounded hover:opacity-90"
          onClick={() navigate("/bots/new")}
        >
            New Bot
        </button>
      </div>
    
    </div>
  );
};

export default BotPage;
