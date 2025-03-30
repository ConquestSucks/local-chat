import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerComponentProps {
  onSelectEmoji: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ onSelectEmoji }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    onSelectEmoji(emoji.emoji);
    setShowPicker(false);
  };

  return (
    <div className='emoji-btn-container'>
      <button onClick={() => setShowPicker(!showPicker)}>
        {showPicker ? '😡' : '🥰'}
      </button>
      {showPicker && (
        <div className='emoji'>
          <EmojiPicker onEmojiClick={handleEmojiClick} searchDisabled={true} skinTonesDisabled={true}/>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
