import Message from "../interfaces/IMessage";

const DB_NAME = "chat-media-db";
const STORE_NAME = "media";

export class ChatStorageService {
    private static listeners: ((messages: Message[]) => void)[] = [];

    private static openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    }

    static async saveMediaBlob(id: string, blob: Blob) {
        const db = await this.openDB();
        return new Promise<void>((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            store.put(blob, id);

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });
    }

    static async getMediaBlob(id: string): Promise<Blob | undefined> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const request = tx.objectStore(STORE_NAME).get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    static loadMessages(room: string): Message[] {
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
