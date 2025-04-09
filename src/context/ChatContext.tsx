import { createContext, ReactNode, useState } from "react";
import { SessionService } from "../service/SessionService";

export interface ChatContextType {
  room: string;
  username: string;
  color: string;
  setColor: (color: string) => void;
  setRoom: (room: string) => void;
  setUsername: (username: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = SessionService.loadSession();

  const [username, setUsernameState] = useState(session.username);
  const [room, setRoomState] = useState(session.room);
  const [color, setColorState] = useState(session.color);

  const setUsername = (name: string) => {
    setUsernameState(name);
    sessionStorage.setItem("username", name);
  };

  const setRoom = (room: string) => {
    setRoomState(room);
    sessionStorage.setItem("room", room);
  };

  const setColor = (color: string) => {
    setColorState(color);
    sessionStorage.setItem("color", color);
  };

  return (
    <ChatContext.Provider
      value={{ room, username, color, setColor, setRoom, setUsername  }}
    >
      {children}
    </ChatContext.Provider>
  );
};
