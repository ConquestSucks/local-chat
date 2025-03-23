import ChatForm from "./components/ChatForm";
import { ChatProvider } from "./context/ChatContext";
import Room from "./components/Room";
import { useState } from "react";
import './App.css'

export default function ChatApp() {
    const [isInChat, setIsInChat] = useState(false);

    return (
        <ChatProvider>
            {!isInChat ? (
                <ChatForm setIsInChat={setIsInChat} />
            ) : (
                <Room />
            )}
        </ChatProvider>
    );
}
