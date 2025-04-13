import React from "react";
import { Link, useLocation } from "react-router-dom";
import ResearchChatLogo from "./ChattrLogo";
import { mainNav } from "./Navigation";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <ResearchChatLogo className="w-8 h-8" />
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          ResearchChat
        </span>
      </div>

      <nav className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
        {mainNav.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`hover:text-black dark:hover:text-white ${
              pathname.startsWith(item.href) ? "font-semibold text-black dark:text-white" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;

