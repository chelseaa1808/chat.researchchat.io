import React from "react";
import PathConstants from "./PathConstants";
import RequireAuth from "@/components/RequireAuth";
import ChatHistory from "@/components/ChatHistory";

// Lazy-load pages
const About = React.lazy(() => import("../pages/About"));
const Home = React.lazy(() => import("../pages/Home"));
const ChatPage = React.lazy(() => import("../pages/ChatPage"));
const BotPage = React.lazy(() => import("../pages/BotPage"));
const ConversationPage = React.lazy(() => import("../pages/ConversationPage"));
const ChatHistoryPage = React.lazy(() => import("../pages/ChatHistoryPage"));
const Login = React.lazy(() => import("../pages/UserLoginPage"));
const Register = React.lazy(() => import("../pages/UserRegisterPage"));
const UserProfile = React.lazy(() => import("../pages/UserProfilePage"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboardPage"));

// Optional: define route shape
interface Route {
  path: string;
  element: JSX.Element;
}


const routes: Route[] = [
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.BASE_CHAT, element: <ChatPage /> },
  { path: PathConstants.NEW_CHAT, element: <ChatPage /> },
  { path: PathConstants.CHAT_PAGE, element: <ChatPage /> },
  { path: PathConstants.BOT_PAGE, element: <BotPage /> },
  { path: PathConstants.CONVERSATION_PAGE, element: <ConversationPage /> },
  { path: PathConstants.CHAT_HISTORY, element: <ChatHistoryPage /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },
  { path: PathConstants.PROFILE, element: <UserProfile /> }, // Fix key
  { path: PathConstants.ADMIN_DASHBOARD, element: <AdminDashboard /> },
  {
    path: "/chat",
    element: (
      <RequireAuth>
        <ChatHistory />
      </RequireAuth>
    ),
  }
];

export default routes;