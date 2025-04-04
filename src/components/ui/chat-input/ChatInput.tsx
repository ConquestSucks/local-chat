import React, { useRef, useLayoutEffect } from "react";
import styles from "./chat-input.module.css";

interface ChatInputProps {
  value: string;
  placeholder: string;
  onChange?: (text: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  placeholder,
  onChange,
  onKeyDown,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 100;

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // сброс
      textarea.style.height = Math.min(textarea.scrollHeight, MAX_HEIGHT) + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className={styles.chat}
      placeholder={placeholder}
      value={value}
      name="text"
      autoComplete="off"
      onChange={(e) => onChange?.(e.target.value.replace(/\n$/, ""))} // убираем лишний \n
      onKeyDown={onKeyDown}
      rows={1}
    />
  );
};

export default ChatInput;
