import { useChat } from "../hooks/useChat";

interface ChatFormProps {
    setIsInChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatForm: React.FC<ChatFormProps> = ({ setIsInChat }) => {
    const { username, room, setUsername, setRoom } = useChat();

    const enterChat = () => {
        if (username.length < 3 || room.length < 3) {
            alert("Имя и название комнаты должны содержать не менее 3 символов");
            return;
        }

        setIsInChat(true);
    };

    return (
        <div className="chat-form">
            <div>
                <input id="form" placeholder="Введите имя" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input id="form" placeholder="Название комнаты" value={room} onChange={(e) => setRoom(e.target.value)} />
            </div>
            <button className="btn" onClick={enterChat}>Войти в чат</button>
        </div>
    );
};

export default ChatForm;
