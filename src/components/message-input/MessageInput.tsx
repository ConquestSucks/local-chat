import React, { useState } from "react";
import UploadButton from "../ui/upload-button/UploadButton";
import EmojiPickerComponent from "../emoji-picker/EmojiPicker";
import Message from "../../interfaces/IMessage";
import styles from "./message-input.module.css";
import { setDateTime } from "../../utils/setDateTime";
import QuotedMessage from "../quoted-message/QuotedMessage";
import CrosshairButton from "../ui/crosshair-button/CrosshairButton";
import SendButton from "../ui/send-button/SendButton";
import ChatInput from "../ui/chat-input/ChatInput";

interface MessageInputProps {
  sendMessage: (text: string, date: string, file?: File, replyTo?: string) => void;
  replyTo: Message | null;
  setReplyTo: React.Dispatch<React.SetStateAction<Message | null>>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  sendMessage,
  replyTo,
  setReplyTo,
}) => {
  const [input, setInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && input) {
      sendMessage(input, setDateTime(), selectedFile, replyTo?.id);
      setSelectedFile(undefined);
      setInput("");
      setReplyTo(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isValidFile = file && /^(video|image)\//.test(file.type);

    if (isValidFile) {
      setSelectedFile(file);
      alert(`Выбран файл: ${file.name}`);
    } else {
      alert("Возможна загрузка только изображений и видео");
    }

    e.target.value = "";
  };

  const handleSend = () => {
    if (!input.trim() && !selectedFile) return;

    sendMessage(input, setDateTime(), selectedFile, replyTo?.id);

    setSelectedFile(undefined);
    setInput("");

    if (!selectedFile) {
      setReplyTo(null);
    }
  };

  const handleSelectEmoji = (emoji: string) => {
    setInput((prevInput) => prevInput + emoji);
  };

  return (
    <div className={styles["message-input"]}>
      <div className={styles["message-container"]}>
        {replyTo && (
          <div className={styles.reply}>
            <QuotedMessage message={replyTo} />
            <CrosshairButton variant="close" onClick={() => setReplyTo(null)}/>
          </div>
        )}
        <div className={styles.edit}>
          <UploadButton onChange={handleFileChange} />
          <ChatInput
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение"
          />
          <div>
            <EmojiPickerComponent onSelectEmoji={handleSelectEmoji} />
            <SendButton onClick={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
