import Message from "../interfaces/IMessage";

export class ChatStorageService {
    private static listeners: ((messages: Message[]) => void)[] = [];

    static loadMessages(room: string) {
        const storedMessages = localStorage.getItem(`chat-${room}`);
        return storedMessages ? JSON.parse(storedMessages) : [];
    }

    static saveMessages(room: string, messages: Message[]) {
        localStorage.setItem(`chat-${room}`, JSON.stringify(messages));
    }

    static subscribe(room: string, callback: (messages: Message[]) => void) {
        const syncMessages = (event: StorageEvent) => {
            if (event.key === `chat-${room}`) {
                callback(JSON.parse(event.newValue || "[]"));
            }
        };

        window.addEventListener("storage", syncMessages);
        this.listeners.push(callback);

        return () => {
            window.removeEventListener("storage", syncMessages);
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }
}
