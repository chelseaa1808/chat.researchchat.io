import React from "react";
import ResearchChatLogo from "./ChattrLogo";

const Header: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <ResearchChatLogo className="w-8 h-8" />
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        ResearchChat
      </h1>
    </div>
  );
};

export default Header;
