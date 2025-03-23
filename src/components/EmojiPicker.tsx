import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerComponentProps {
  setSelectedEmoji: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ setSelectedEmoji, setInput }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setSelectedEmoji(emoji.emoji);
    setInput((prevInput) => prevInput + emoji.emoji); 
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
