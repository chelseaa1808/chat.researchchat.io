import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatHistory from "../components/ChatHistory";
import ChatForm from "../components/ChatForm";
import {
  useCreateConversationMutation,
  useGetConversationQuery,
} from "../store";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ChatPage: React.FC = () => {
  const { slug, uuid } = useParams<{ slug: string; uuid?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [createConversation] = useCreateConversationMutation();
  const { data: conversation } = useGetConversationQuery(uuid, { skip: !uuid });

  const [showBanner, setShowBanner] = useState(false);

  const disclaimerText = conversation?.chat_page?.disclaimer;

  // Create new conversation on mount if only slug is present
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

  // Show disclaimer banner if present
  useEffect(() => {
    if (disclaimerText) {
      setShowBanner(true);
    }
  }, [disclaimerText]);

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {showBanner && (
        <div className="flex items-center justify-between p-3 mb-4 text-sm text-white bg-rose-500 rounded">
          <span>
            <ExclamationTriangleIcon className="inline w-4 h-4 mr-1 -mt-0.5" />
            {disclaimerText}
          </span>
          <button onClick={handleBannerClose}>
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border rounded-lg shadow overflow-hidden">
        <ChatHistory slug={slug} uuid={uuid} />
        <div className="border-t px-4 py-2 bg-gray-50 dark:bg-gray-900">
          <ChatForm uuid={uuid} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
