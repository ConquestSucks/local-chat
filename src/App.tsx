import { ChatProvider } from "./context/ChatContext";
import ChatForm from "./components/chat-form/ChatForm";
import Room from "./components/room/Room";
import { useState } from "react";
import "./App.css";
import { SessionService } from "./service/SessionService";

export default function ChatApp() {
  const session = SessionService.loadSession();
  const [isInChat, setIsInChat] = useState(session.isInChat);
  const [sessionKey, setSessionKey] = useState(0);

  const handleExit = () => {
    SessionService.clearSession();
    setIsInChat(false);
    setSessionKey((prev) => prev + 1);
  };
  return (
    <ChatProvider key={sessionKey}>
      {!isInChat ? (
        <ChatForm setIsInChat={setIsInChat} />
      ) : (
        <Room onExit={handleExit} />
      )}
    </ChatProvider>
  );
}
