import { useState, useEffect } from "react";
import Message from "../interfaces/IMessage";
import { ChatStorageService } from "../service/ChatStorageService";
import {
  appendMessage,
  createMessage,
  processFile,
} from "../utils/chatHelpers";

export const useChatRoom = (username: string, room: string, color: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

  useEffect(() => {
    if (!room) return;

    setMessages(ChatStorageService.loadMessages(room));

    const unsubscribe = ChatStorageService.subscribe(room, setMessages);
    return unsubscribe;
  }, [room]);

  const sendMessage = (
    text: string,
    date: string,
    file?: File,
    replyTo?: string
  ) => {
    if (!text.trim() && !file) return;

    const messageId = new Date().toISOString();

    if (file) {
      processFile(file, messageId, (media) => {
        const newMessage = createMessage(
          messageId,
          username,
          color,
          text,
          date,
          media,
          replyTo
        );
        setMessages((prev) => appendMessage(room, prev, newMessage));
        setReplyTo(null);
      });
    } else {
      const newMessage = createMessage(
        messageId,
        username,
        color,
        text,
        date,
        undefined,
        replyTo
      );
      setMessages((prev) => appendMessage(room, prev, newMessage));
      setReplyTo(null);
    }
  };

  return { messages, sendMessage, replyTo, setReplyTo };
};
