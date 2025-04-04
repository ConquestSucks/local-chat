import { createContext, ReactNode, useState } from "react";

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
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");

  return (
    <ChatContext.Provider
      value={{ room, username, color, setColor, setRoom, setUsername }}
    >
      {children}
    </ChatContext.Provider>
  );
};
