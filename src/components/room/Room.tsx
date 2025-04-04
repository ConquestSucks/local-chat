import { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import MessageInput from "../message-input/MessageInput";
import { useChatRoom } from "../../hooks/useChatRoom";
import styles from "./room.module.css";
import DisplayMessages from "../display-messages/DisplayMessages";

const Room: React.FC = () => {
  const { username, room, color } = useChat();
  const { messages, sendMessage, replyTo, setReplyTo } = useChatRoom(
    username,
    room,
    color
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.room}>
      <h2>Комната: {room}</h2>
      <div className={styles["room-container"]}>
        <DisplayMessages
          messages={messages}
          setReplyTo={setReplyTo}
          messagesEndRef={messagesEndRef}
          currentUser={username}
        />
        <MessageInput
          sendMessage={sendMessage}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
        />
      </div>
    </div>
  );
};

export default Room;
