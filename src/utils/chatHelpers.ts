import Message from "../interfaces/IMessage";
import { ChatStorageService } from "../service/ChatStorageService";

export const createMessage = (
    id: string,
    user: string,
    color: string,
    text: string,
    date: string,
    media?: { url: string; type: string },
    replyTo?: string
): Message => ({
    id,
    user,
    color,
    text,
    date,
    media,
    replyTo,
});

export const processFile = async (
    file: File,
    messageId: string,
    callback: (media: { url: string; type: string }) => void
) => {
    await ChatStorageService.saveMediaBlob(messageId, file);

    callback({
        url: messageId,
        type: file.type.startsWith("image") ? "image" : "video"
    });
};

export const appendMessage = (room: string, messages: Message[], newMessage: Message): Message[] => {
    const updatedMessages = [...messages, newMessage];
    ChatStorageService.saveMessages(room, updatedMessages);
    return updatedMessages;
};
