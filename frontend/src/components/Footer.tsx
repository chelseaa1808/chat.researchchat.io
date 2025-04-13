import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 py-6 text-sm text-center text-gray-500 border-t dark:border-gray-700 dark:text-gray-400">
      <span>© {new Date().getFullYear()} ResearchChat. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
