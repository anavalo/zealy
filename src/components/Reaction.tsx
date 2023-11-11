import { Button, IconButton, Popover, TextField } from "@mui/material"
import Card from "@mui/material/Card"
import { useEffect, useState } from "react"
import EmojiEmotionIcon from "@mui/icons-material/EmojiEmotions"

type Props = {
    children: React.ReactNode
}

const Reaction = ({children}: Props) => {
    const [reaction, setReaction] = useState(null)
    const [comment, setComment] = useState('')
    const[anchorEl, setAnchorEl] = useState(null)
    const [cursorPosition, setCursorPosition] = useState({
        x: 0,
        y: 0
    })
    console.log(cursorPosition);
   useEffect(() => {
    document.getElementById('testBox')?.addEventListener('click', (event) => {  
        setCursorPosition({
            x: event.clientX,
            y: event.clientY
        })
    }
    )
    return () => {
        document.getElementById('testBox')?.removeEventListener('click', () => {})
    }
    }, [])
    


    return (
        <Card sx={{left: cursorPosition.x, top: cursorPosition.y, position:'fixed'}}>
            {children}
        </Card>
    )
}

export default Reaction