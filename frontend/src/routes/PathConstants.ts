const PathConstants = {
  ABOUT: "/about",
  HOME: "/",
  BASE_CHAT: "/chat",
  BOT_PAGE: "/bots",
  CONVERSATION_PAGE: "/bots/:name",
  NEW_CHAT: "/chat/:slug",
  CHAT_HISTORY: "/bots/:name/:uuid",
  CHAT_PAGE: "/chat/:slug/:uuid",
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  PROFILE: "/profile",
  ADMIN_DASHBOARD: "/adminpanel",
  ADMIN_BOTS: "/adminpanel/bots",
  ADMIN_NEW_BOT: "/adminpanel/bots/new",
  ADMIN_CHAT_HISTORY: "/adminpanel/chat-history",
  ADMIN_CHATS: "/adminpanel/chats",
  ADMIN_CONVERSATIONS: "/adminpanel/conversations",
  ADMIN_PROFILE: "/adminpanel/profile",
  ADMIN_CONDITIONS: "/adminpanel/conditions",
} as const;
  
  export type PathKey = keyof typeof PathConstants;
  export type PathValue = typeof PathConstants[PathKey];
  
  export default PathConstants;
  
  
