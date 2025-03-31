import { createContext, ReactNode, useState } from "react";

export interface ChatContextType {
  room: string;
  username: string;
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

  return (
    <ChatContext.Provider value={{ room, username, setRoom, setUsername }}>
      {children}
    </ChatContext.Provider>
  );
};
