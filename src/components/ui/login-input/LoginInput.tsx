import React from "react";
import styles from "./login-input.module.css";

interface LoginInputProps {
  value: string;
  placeholder: string;
  onChange?: (text: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  value,
  placeholder,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      className={styles.login}
      placeholder={placeholder}
      value={value}
      name="text"
      autoComplete="off"
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};

export default LoginInput;
