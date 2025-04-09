import { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import MessageInput from "../message-input/MessageInput";
import { useChatRoom } from "../../hooks/useChatRoom";
import styles from "./room.module.css";
import DisplayRoomData from "../display-room-data/DisplayRoomData";

interface RoomProps {
  onExit: () => void;
}

const Room: React.FC<RoomProps> = ({ onExit }) => {
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
      <DisplayRoomData
        room={room}
        messages={messages}
        setReplyTo={setReplyTo}
        messagesEndRef={messagesEndRef}
        currentUser={username}
        onExit={onExit}
      />
      <MessageInput
        sendMessage={sendMessage}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </div>
  );
};

export default Room;
