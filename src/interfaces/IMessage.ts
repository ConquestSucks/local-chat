export default interface Message {
    id: string;
    user: string;
    text: string;
    media?: {
        url: string;
        type: string;
    };
}