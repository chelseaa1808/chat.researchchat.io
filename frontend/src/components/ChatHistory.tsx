import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PathConstants from "@/routes/PathConstants";
import ChatMessage from "./ChatMessage";
import {
  useGetConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../store";
import { PulseLoader, FadeLoader } from "react-spinners";

interface Message {
  id: string;
  actor: string;
  text: string;
  timestamp: string;
}

interface ChatHistoryProps {
  slug: string;
  uuid: string;
}

const ChatHistory = ({ slug, uuid }: ChatHistoryProps) => {
  const { data, isLoading, isFetching, isError } = useGetMessagesQuery(uuid, {
    skip: !uuid,
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation({
    fixedCacheKey: "message-sending",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const {
    data: conversation,
    isLoading: conversationLoading,
    isError: conversationError,
  } = useGetConversationQuery(uuid, { skip: !uuid });

  let botName = "Bot Name";
  if (conversation) {
    botName = conversation.chat_page.bot.display_name;
  }

  let content;
  if (isLoading) {
    content = (
      <div>
        <FadeLoader color="#314155" />
      </div>
    );
  } else if (isError) {
    content = <div>Error!</div>;
  } else {
    content =
      data?.map((message: Message) => (
        <ChatMessage
          key={message.id}
          actor={message.actor}
          text={message.text}
          timestamp={message.timestamp}
        />
      )) || (
        <div className="flex items-center justify-center h-full">
          <FadeLoader color="#314155" />
        </div>
      );
  }

  return (
    <>
      {/* Chat header */}
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
          alt=""
          className="object-cover w-10 h-10 rounded-full"
        />
        <span className="block ml-2 font-bold text-gray-600">{botName}</span>
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>

     {/* Admin Dashboard Link *
      <div className="px-4 py-2 text-right bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Link
          to={PathConstants.ADMIN_DASHBOARD}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ➤ View Admin Dashboard
        </Link>*/}
      </div>*/}

      {/* Messages list */}
      <div className="space-y-4 relative w-full p-6 overflow-y-auto scroll-smooth h-[30rem]">
        {content}
        {(isFetching || isSending) && (
          <div className="flex items-center pt-8 justify-left">
            <PulseLoader speedMultiplier={0.7} color="#314155" />
          </div>
        )}
        <div className="float-left clear-both" ref={messagesEndRef}></div>
      </div>
    </>
  );
};

export default ChatHistory;
