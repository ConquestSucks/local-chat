import { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import { useChatRoom } from "../hooks/useChatRoom";

const Room: React.FC = () => {
  const { username, room } = useChat();
  const { messages, sendMessage } = useChatRoom(username, room);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="room">
      <h2>Комната: {room}</h2>
      <div className="room-container">
        <div className="messages">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Room;
