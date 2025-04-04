import React from "react";
import MessageItem from "../message-item/MessageItem";
import Message from "../../interfaces/IMessage";
import styles from "./display-messages.module.css";

interface DisplayMessagesProps {
  messages: Message[];
  setReplyTo: React.Dispatch<React.SetStateAction<Message | null>>;
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
  currentUser: string;
}

const DisplayMessages: React.FC<DisplayMessagesProps> = ({
  messages,
  setReplyTo,
  messagesEndRef,
  currentUser,
}) => {
  return (
    <div
      className={`${styles.messages} ${
        messages.length === 0 ? styles.empty : styles.hasMessages
      }`}
    >
      {messages.length === 0 ? (
        <div className={styles.emptyMessage}>Здесь пока пусто</div>
      ) : (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            messages={messages}
            setReplyTo={setReplyTo}
            ui={msg.user === currentUser}
            userColor={msg.color}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default DisplayMessages;
