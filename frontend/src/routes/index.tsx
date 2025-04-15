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

const routes = [
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },

  // Protected routes wrapped in RequireAuth --Temporarily disabled chat page security
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
  { path: "*", element: <Navigate to={PathConstants.HOME} /> },  {/*{
    path: PathConstants.BASE_CHAT,
    element: (
      <RequireAuth>
        <ChatPage />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.NEW_CHAT,
    element: (
      <RequireAuth>
        <ChatPage />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.CHAT_PAGE,
    element: (
      <RequireAuth>
        <ChatPage />
      </RequireAuth>
    ),
  }, */}
  
];

export default routes;