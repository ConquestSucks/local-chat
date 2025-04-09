import React from "react";
import MessageItem from "../message-item/MessageItem";
import Message from "../../interfaces/IMessage";
import styles from "./display-room-data.module.css";
import ExitButton from "../ui/exit-button/ExitButton";

interface DisplayRoomDataProps {
  room: string;
  messages: Message[];
  setReplyTo: React.Dispatch<React.SetStateAction<Message | null>>;
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
  currentUser: string;
  onExit: () => void;
}

const DisplayRoomData: React.FC<DisplayRoomDataProps> = ({
  room,
  messages,
  setReplyTo,
  messagesEndRef,
  currentUser,
  onExit
}) => {
  return (
    <div className={styles["room-data"]}>
      <div className={styles["room-name"]}>
        <span>Комната {room}</span>
        <ExitButton onClick={onExit}/>
      </div>
      <div className={`${styles["messages-empty"]} ${messages.length ? styles["messages"] : ""}`}>
        {messages.length === 0 && (
          <div className={styles["messages-empty-text"]}>Здесь пока пусто</div>
        )}
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            messages={messages}
            setReplyTo={setReplyTo}
            ui={msg.user === currentUser}
            userColor={msg.color}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default DisplayRoomData;
