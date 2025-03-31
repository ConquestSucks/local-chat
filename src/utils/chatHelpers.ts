import Message from "../interfaces/IMessage";
import { ChatStorageService } from "../service/ChatStorageService";

export const createMessage = (user: string, text: string, media?: { url: string; type: string }): Message => ({
    id: new Date().toISOString(),
    user,
    text,
    media,
});

export const processFile = (file: File, callback: (media: { url: string; type: string }) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback({
            url: reader.result as string,
            type: file.type.startsWith("image") ? "image" : "video",
        });
    };
    reader.readAsDataURL(file);
};

export const appendMessage = (room: string, messages: Message[], newMessage: Message): Message[] => {
    const updatedMessages = [...messages, newMessage];
    ChatStorageService.saveMessages(room, updatedMessages);
    return updatedMessages;
};
