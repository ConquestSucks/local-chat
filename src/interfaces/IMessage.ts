export default interface Message {
    id: string;
    user: string;
    color: string;
    text: string;
    media?: {
        url: string;
        type: string;
    };
    date: string;
    replyTo?: string;
}