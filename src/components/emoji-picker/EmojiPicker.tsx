import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import styles from "./emoji-picker.module.css";
import EmoticonsButton from "../ui/emoticons-button/EmoticonsButton";

interface EmojiPickerComponentProps {
  onSelectEmoji: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({
  onSelectEmoji,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    onSelectEmoji(emoji.emoji);
  };

  return (
    <div className={styles["emoji-btn-container"]}>
      <EmoticonsButton onClick={() => setShowPicker(!showPicker)} />
      {showPicker && (
        <div className={styles.emoji}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            skinTonesDisabled={true}
            theme={"auto" as Theme}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
