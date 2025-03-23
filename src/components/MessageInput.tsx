import React, { useState } from "react";
import UploadButton from "./UploadButton";
import EmojiPickerComponent from "./EmojiPicker";

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (file?: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, setInput, sendMessage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
      setSelectedFile(null);
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
    if (selectedFile) {
      sendMessage(selectedFile);
    } else {
      sendMessage();
    }
    setSelectedFile(null);
  };

  return (
    <div className="message-input">
      <div className="message-container">
        <UploadButton func={handleFileChange} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          onKeyDown={handleKeyDown}
        />
        <EmojiPickerComponent setSelectedEmoji={(emoji) => {}} setInput={setInput} />
      </div>
      <button onClick={handleSend} className="btn">Отправить</button>
    </div>
  );
};

export default MessageInput;
