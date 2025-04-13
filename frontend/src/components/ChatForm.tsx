import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useSendMessageMutation } from "../store";
import { useGetMessagesQuery } from "../store";

// 1. Type for props
interface ChatFormProps {
  uuid: string;
}

export default function ChatForm({ uuid }: ChatFormProps) {
  // 2. Type for state
  const [message, setMessage] = useState<string>("");

  const [sendMessage, result] = useSendMessageMutation({ fixedCacheKey: "message-sending" });
  const { data: messages, updateQueryData } = useGetMessagesQuery();

  // 3. Typed event handlers
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      sendMessage({
        uuid: uuid,
        text: message,
      });
      setMessage("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // prevent newline
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
          <textarea
            placeholder="Type your message"
            id="chatInputTextarea"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-lg outline-none focus:text-gray-700 max-h-64 h-11 resize-none"
          />
          <button
            className="flex items-center px-3 py-2 mx-2 rounded-md bg-lime-200"
            type="submit"
            disabled={message.trim() === ""}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-500 origin-center" />
          </button>
        </div>
      </form>
    </div>
  );
}
