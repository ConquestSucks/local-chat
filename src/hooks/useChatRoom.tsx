import { useState, useEffect } from "react";
import Message from "../interfaces/IMessage";
import { ChatStorageService } from "../utils/ChatStorageService";

export const useChatRoom = (username: string, room: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (room) {
            setMessages(ChatStorageService.loadMessages(room));
        }
    }, [room]);

    const sendMessage = (text: string, file?: File) => {
        if (!text.trim() && !file) return;

        let media;
        if (file) {
            media = {
                url: URL.createObjectURL(file),
                type: file.type.startsWith("image") ? "image" : "video",
            };
        }

        const newMessage: Message = {
            id: new Date().toISOString(),
            user: username,
            text,
            media,
        };

        setMessages((prev) => {
            const updatedMessages = [...prev, newMessage];
            ChatStorageService.saveMessages(room, updatedMessages);
            return updatedMessages;
        });
    };

    return { messages, sendMessage };
};
