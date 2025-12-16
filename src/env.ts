import Avatar from "@/assets/image/Avatar/Aavatar.png";
// import type { ImportMetaEnv } from "vite";
export const base_env = {
  VITE_API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  VITE_WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws",
  VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID || "your-client-id",

  DEFAULT_AVATAR: Avatar,
};
