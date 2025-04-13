import React, { useState, ReactNode } from "react";

interface CopyCodeBlockProps {
  children: ReactNode;
  language?: string;
}

export default function CopyCodeBlock({ children, language = "plaintext" }: CopyCodeBlockProps) {
  const [copyMessage, setCopyMessage] = useState("Copy code");

  // Extract raw code as string from nested children
  const extractedText = React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return child;
    } else if (React.isValidElement(child) && child.props.children) {
      return React.Children.map(child.props.children, (nested) =>
        typeof nested === "string" ? nested : ""
      )?.join("") ?? "";
    } else {
      return "";
    }
  })?.join("") ?? "";

  // Clipboard copy logic
  const handleCopyClick = () => {
    navigator.clipboard.writeText(extractedText);
    setCopyMessage("Copied!");
    setTimeout(() => {
      setCopyMessage("Copy code");
    }, 3000); // fix: string -> number
  };

  return (
    <div className="rounded-md overflow-hidden shadow-md border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-xs font-mono rounded-t-md">
        <span className="uppercase tracking-wider">{language}</span>
        <button
          id="CopyButton"
          className="flex gap-2 items-center hover:text-white transition"
          onClick={handleCopyClick}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon-sm"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          {copyMessage}
        </button>
      </div>

      {/* Code content */}
      <pre className="bg-black text-white text-sm overflow-x-auto px-4 py-2 font-mono">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}
