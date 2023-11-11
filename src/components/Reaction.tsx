import React, { useState, useEffect } from 'react';
import {  TextField, Button, IconButton, Box } from '@mui/material';
import Picker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Reaction = () => {
    const [cursorPosition, setCursorPosition] = useState<Record<string, number> | null>(null);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [text, setText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        const handleClick = (event: any) => {  
            event.preventDefault();
            if (event.target.id === 'testBox') {
                setCursorPosition({
                    x: event.clientX,
                    y: event.clientY
                });
            }
        };

        document.getElementById('testBox')?.addEventListener('click', handleClick);

        return () => {
            document.getElementById('testBox')?.removeEventListener('click', handleClick);
        };
    }, []);

    const onEmojiClick = (emojiObject: any, event: any) => {
        event.stopPropagation();
        setChosenEmoji(emojiObject);
        setShowEmojiPicker(false);
        setText(text + emojiObject.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setShowEmojiPicker(false);
        setCursorPosition(null);
        const testBox = document.getElementById('testBox');
        const child = document.createElement('span');
        child.textContent = text;
        child.style.left = cursorPosition?.x + 'px';
        child.style.top = cursorPosition?.y + 'px';
        child.style.position = 'fixed';
        testBox?.appendChild(child);
        
        setText('');
    }

    return (
        <>
        {cursorPosition && <Box sx={{ left: cursorPosition?.x, top: cursorPosition?.y, position: 'fixed', display: "flex", gap: '16px', border: '1px solid gray', borderRadius: '8px', padding: "16px" }}>
            <IconButton onClick={toggleEmojiPicker}>
                <EmojiEmotionsIcon /> 
            </IconButton>
            {showEmojiPicker && (
                <div className='emoji_picker_wrapper'>
                    <Picker onEmojiClick={onEmojiClick} width={400} height={400} previewConfig={{showPreview: false}}/>
                </div>
            )}
            <TextField
                label="Your message"
                variant="outlined"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Send
            </Button>
        </Box>}
        </>
    );
};

export default Reaction;
