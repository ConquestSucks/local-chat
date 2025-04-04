import styles from "./send-button.module.css"

const SendButton = ({ onClick } : { onClick : () => void}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"

      className={styles.send}
      onClick={onClick}
    >
      <polygon points="3 3 20 12 3 21 6 12 3 3"></polygon>
      <line x1="10" y1="12" x2="6" y2="12"></line>
    </svg>
  );
};

export default SendButton;
