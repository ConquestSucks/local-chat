import React, { createContext, useState, ReactNode } from "react";

interface Message {
    id: string;
    user: string;
    text: string;
    media?: {
        url: string;
        type: string;
    };
}

export interface ChatContextType {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    room: string;
    setRoom: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");

    const sendMessage = (file?: File) => {
        if (!input.trim() && !file) return;
    
        let media = undefined;

        if (file) {
            media = {
                url: URL.createObjectURL(file),
                type: file.type.startsWith("image") ? "image" : "video"
            };
        }
    
        const newMessage: Message = {
            id: new Date().toISOString(),
            user: username,
            text: input,
            media
        };
    
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`chat-${room}`, JSON.stringify(updatedMessages));
        setInput("");
    };
    

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                input,
                setInput,
                sendMessage,
                room,
                setRoom,
                username,
                setUsername,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
