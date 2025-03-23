export function getChatMessages(room: string) {
    const storedMessages = localStorage.getItem(`chat-${room}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  }
  
  export function saveChatMessages(room: string, messages: unknown[]) {
    localStorage.setItem(`chat-${room}`, JSON.stringify(messages));
  }
  