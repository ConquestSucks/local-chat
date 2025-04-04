import Message from "../../interfaces/IMessage";
import { DisplayMessageMedia } from "../DisplayMessageMedia";
import QuotedMessage from "../quoted-message/QuotedMessage";
import ReplyButton from "../ui/reply-button/ReplyButton";
import styles from "./message-item.module.css";

const MessageItem = ({
  message,
  ui,
  userColor,
  messages,
  setReplyTo,
}: {
  message: Message;
  ui: boolean;
  userColor: string;
  messages: Message[];
  setReplyTo: React.Dispatch<React.SetStateAction<Message | null>>;
}) => {
  if (!message) return null;

  const repliedMessage = messages.find((msg) => msg.id === message.replyTo);

  return (
    <div className={`${styles.container} ${ui ? styles.owner : ""}`}>
      <div className={styles.avatar} style={{ backgroundColor: userColor }}>
        {message.user[0]}
      </div>
      <div className={styles["data-container"]}>
        <div className={styles["data-wrap"]}>
          <div className={styles.data}>
            <span className={styles.name}>{message.user}</span>
            {repliedMessage && <QuotedMessage message={repliedMessage} />}
            {message?.media && <DisplayMessageMedia media={message.media} />}
            <span className={styles.text}>{message.text}</span>
          </div>
          <div className={styles.time}>
            <span>{message.date}</span>
          </div>
        </div>
        <div className={styles["reply-button"]} onClick={() => setReplyTo(message)} >
          <ReplyButton />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
