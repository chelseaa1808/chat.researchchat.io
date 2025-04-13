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
  } as const;
  
  export type PathKey = keyof typeof PathConstants;
  export type PathValue = typeof PathConstants[PathKey];
  
  export default PathConstants;
  
  