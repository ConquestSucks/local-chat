import { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";

const Room = () => {
  const { room, messages, setMessages, input, setInput, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedMessages = localStorage.getItem(`chat-${room}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [room, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className="room">
      <h2>Комната: {room}</h2>
      <div className="room-container">
        <div
          className="messages"
        >
          {messages.map((msg) => (
            <MessageItem key={msg.id} user={msg.user} text={msg.text} media={msg.media}/>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Room;
