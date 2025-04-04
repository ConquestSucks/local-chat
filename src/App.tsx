import { ChatProvider } from "./context/ChatContext";
import ChatForm from "./components/chat-form/ChatForm";
import Room from "./components/room/Room";
import { useState } from "react";
import "./App.css";

export default function ChatApp() {
  const [isInChat, setIsInChat] = useState(false);

  return (
    <ChatProvider>
      {!isInChat ? <ChatForm setIsInChat={setIsInChat} /> : <Room />}
    </ChatProvider>
  );
}
