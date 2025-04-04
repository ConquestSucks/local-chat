import { useChat } from "../../hooks/useChat";
import { getRandomColor } from "../../utils/getRandomColor";
import LoginInput from "../ui/login-input/LoginInput";
import styles from "./chat-form.module.css";

interface ChatFormProps {
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatForm: React.FC<ChatFormProps> = ({ setIsInChat }) => {
  const { username, room, setUsername, setRoom, setColor } = useChat();

  const enterChat = () => {
    if (username.length < 5 || room.length < 3) {
      alert("Имя и название комнаты должны содержать не менее 5 и 3 символов");
      return;
    }

    const color = getRandomColor(username);
    setColor(color);

    setIsInChat(true);
  };

  return (
    <div className={styles["chat-form"]}>
      <div>
        <LoginInput
          value={username}
          onChange={setUsername}
          placeholder="Введите имя"
        />
        <LoginInput
          value={room}
          onChange={setRoom}
          placeholder="Введите комнату"
        />
      </div>
      <button className={styles.enter} onClick={enterChat}>
        Войти в чат
      </button>
    </div>
  );
};

export default ChatForm;
