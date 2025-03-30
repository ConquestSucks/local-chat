import Message from "../interfaces/IMessage";

export class ChatStorageService {
    static loadMessages(room: string) {
        const storedMessages = localStorage.getItem(`chat-${room}`);
        return storedMessages ? JSON.parse(storedMessages) : [];
    }

    static saveMessages(room: string, messages: Message[]) {
        localStorage.setItem(`chat-${room}`, JSON.stringify(messages));
    }
}
