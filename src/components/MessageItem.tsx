import Message from "../interfaces/IMessage";

const MessageItem = ({message} : {message: Message}) => {
    return (
        <div className="message-item">
            <strong>{message.user}:</strong> {message.text}
            {message.media && (
                <div>
                {message.media.type === "image" ? (
                    <img src={message.media.url} alt="attachment" style={{ maxWidth: "200px", borderRadius: "15px" }} />
                ) : (
                    <video controls style={{ maxWidth: "200px", borderRadius: "15px"  }}>
                        <source src={message.media.url} />
                    </video>
                )}
                </div>
    )}
        </div>
    );
};

export default MessageItem;
