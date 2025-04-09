import styles from "./exit-button.module.css";

const ExitButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.exit}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6666 8L17.75 10.5L15.6666 8Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6666 13L17.75 10.5L15.6666 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 10.5L10 10.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="3.5"
        x2="13"
        y2="3.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="17.5"
        x2="13"
        y2="17.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 3.5V7.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 13.5V17.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 3.5L4 17.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ExitButton;
