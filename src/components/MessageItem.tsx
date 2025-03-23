interface MessageItemProps {
    user: string;
    text: string;
    media?: {
        url: string;
        type: string;
    };
}

const MessageItem = ({ user, text, media }: MessageItemProps) => {
    return (
        <div className="message-item">
            <strong>{user}:</strong> {text}
            {media && (
                <div>
                {media.type === "image" ? (
                    <img src={media.url} alt="attachment" style={{ maxWidth: "200px", borderRadius: "15px" }} />
                ) : (
                    <video controls style={{ maxWidth: "200px", borderRadius: "15px"  }}>
                        <source src={media.url} />
                    </video>
                )}
                </div>
    )}
        </div>
    );
};

export default MessageItem;
