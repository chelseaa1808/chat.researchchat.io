import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import ChatInterface from "@/components/ChatInterface";
import ChatHistory from "@/components/ChatHistory";
import ChatForm from "@/components/ChatForm";
import {
  useCreateConversationMutation,
  useGetConversationQuery,
} from "@/store";

const ChatPage: React.FC = () => {
  const { slug, uuid } = useParams<{ slug: string; uuid?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  const [createConversation] = useCreateConversationMutation();
  const { data: conversation } = useGetConversationQuery(uuid, { skip: !uuid });

  const disclaimerText = conversation?.chat_page?.disclaimer;

  useEffect(() => {
    if (slug && !uuid) {
      const external_id = searchParams.get("uid");
      createConversation({ slug, external_id }).then((res) => {
        if (res?.data?.uuid) {
          navigate(`/chat/${slug}/${res.data.uuid}`);
        }
      });
    }
  }, [slug, uuid, searchParams, createConversation, navigate]);

  useEffect(() => {
    if (disclaimerText) setShowBanner(true);
  }, [disclaimerText]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {showBanner && (
        <div className="flex items-center justify-between p-3 text-sm text-white bg-red-500 rounded-md shadow">
          <span className="flex items-center gap-1">
            <ExclamationTriangleIcon className="w-4 h-4" />
            {disclaimerText}
          </span>
          <button onClick={() => setShowBanner(false)}>
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <ChatInterface />

      <div className="bg-white dark:bg-gray-800 border rounded-lg shadow overflow-hidden">
        <ChatHistory slug={slug} uuid={uuid} />
        <div className="border-t px-4 py-3 bg-gray-50 dark:bg-gray-900">
          <ChatForm uuid={uuid} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
