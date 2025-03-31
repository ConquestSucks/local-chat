import { useState, useEffect } from "react";
import Message from "../interfaces/IMessage";
import { ChatStorageService } from "../service/ChatStorageService";
import {
  appendMessage,
  createMessage,
  processFile,
} from "../utils/chatHelpers";

export const useChatRoom = (username: string, room: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!room) return;

    setMessages(ChatStorageService.loadMessages(room));

    const unsubscribe = ChatStorageService.subscribe(room, setMessages);
    return unsubscribe;
  }, [room]);

  const sendMessage = (text: string, file?: File) => {
    if (!text.trim() && !file) return;

    if (file) {
      processFile(file, (media) => {
        const newMessage = createMessage(username, text, media);
        setMessages((prev) => appendMessage(room, prev, newMessage));
      });
    } else {
      const newMessage = createMessage(username, text);
      setMessages((prev) => appendMessage(room, prev, newMessage));
    }
  };

  return { messages, sendMessage };
};
