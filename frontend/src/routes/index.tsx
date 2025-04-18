import React from "react";
import { Navigate } from "react-router-dom";
import PathConstants from "./PathConstants";
import RequireAuth from "@/components/RequireAuth";

// Lazy-loaded pages
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

// Admin Panel Subroutes (if not protected, wrap manually)
const adminRoutes = [
  { path: "/adminpanel", element: <AdminDashboard /> },
  { path: "/adminpanel/bots", element: <BotPage /> },
  { path: "/adminpanel/chat-history", element: <ChatHistoryPage /> },
  { path: "/adminpanel/chats", element: <ChatPage /> },
  { path: "/adminpanel/conversations", element: <ConversationPage /> },
];

const routes = [
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },

  // Optionally protect pages
  {
    path: PathConstants.BOT_PAGE,
    element: (
      <RequireAuth>
        <BotPage />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.CONVERSATION_PAGE,
    element: (
      <RequireAuth>
        <ConversationPage />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.CHAT_HISTORY,
    element: (
      <RequireAuth>
        <ChatHistoryPage />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.PROFILE,
    element: (
      <RequireAuth>
        <UserProfile />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.ADMIN_DASHBOARD,
    element: (
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    ),
  },

  // Chat routes (currently not protected)
  {
    path: PathConstants.BASE_CHAT,
    element: <ChatPage />,
  },
  {
    path: PathConstants.NEW_CHAT,
    element: <ChatPage />,
  },
  {
    path: PathConstants.CHAT_PAGE,
    element: <ChatPage />,
  },

  // Admin subroutes added here (not protected by default)
  ...adminRoutes,

  // Fallback route
  { path: "*", element: <Navigate to={PathConstants.HOME} /> },
];

export default routes;
