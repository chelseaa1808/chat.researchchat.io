import MarkdownWrapper from "./MarkdownWrapper";
import classNames from "classnames";

interface ChatMessageProps {
  actor: string;
  text: string;
  timestamp: string;
}

export default function ChatMessage({ actor, text, timestamp }: ChatMessageProps) {
  const selfMessage = actor === "user";

  const classes = classNames(
    "relative max-w-md mx-4 px-4 py-2 text-gray-700 rounded shadow border-gray-500 justify-start text-left bg-gray-100",
    {
      "bg-lime-100": selfMessage,
      "justify-end": selfMessage,
      "float-right text-right": selfMessage,
      "float-left text-left": !selfMessage,
    }
  );

  return (
    <div className="flow-root">
      <div className={classes}>
        <span className="block">
          {selfMessage ? text : <MarkdownWrapper text={text} />}
        </span>
        {/* Optional: Add time */}
        <span className="block text-xs text-gray-400 mt-1">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}