import Message from "../../interfaces/IMessage";
import styles from "./quoted-message.module.css";

const QuotedMessage = ({ message }: { message: Message }) => {
  return (
    <div className={styles.quoted}>
      <div></div>
      <div>
        <span>{message.user}</span>
        <span>{`${message.text ? message.text : message.media?.type == "image" ? "Фотография" : "Видео"}`}</span>
      </div>
    </div>
  );
};

export default QuotedMessage;
