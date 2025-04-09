import { SESSION_KEYS } from "../constants/session";

export const SessionService = {
  saveSession(username: string, room: string, color: string) {
    sessionStorage.setItem(SESSION_KEYS.username, username);
    sessionStorage.setItem(SESSION_KEYS.room, room);
    sessionStorage.setItem(SESSION_KEYS.color, color);
    sessionStorage.setItem(SESSION_KEYS.isInChat, "true");
  },

  loadSession() {
    return {
      username: sessionStorage.getItem(SESSION_KEYS.username) || "",
      room: sessionStorage.getItem(SESSION_KEYS.room) || "",
      color: sessionStorage.getItem(SESSION_KEYS.color) || "",
      isInChat: sessionStorage.getItem(SESSION_KEYS.isInChat) === "true",
    };
  },

  clearSession() {
    Object.values(SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
  },
};
