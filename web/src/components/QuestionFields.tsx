import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';

interface QuestionProps {
    dayIndex: number
    lineIndex: number
    yesAnswer: string
    noAnswer: string
    timeoutAnswer: string
    handleChangeYesAnswer: any
    handleChangeNoAnswer: any
    handleChangeTimeoutAnswer: any
}

export default function QuestionFields({ dayIndex, lineIndex, yesAnswer, noAnswer, timeoutAnswer, handleChangeYesAnswer, handleChangeNoAnswer, handleChangeTimeoutAnswer}: QuestionProps) {
    useEffect(() => {
    }, []);

    const fieldStyle = { 
        backgroundColor: 'white',
        margin: '10px 0'  
    }
    return (
        <div>
            <TextField
            multiline
            label="Yes Response"
            fullWidth={true}
            value={yesAnswer}
            onChange={handleChangeYesAnswer(dayIndex, lineIndex)}
            sx={fieldStyle}
            />
            <TextField
            multiline
            label="No Response"
            fullWidth={true}
            value={noAnswer}
            onChange={handleChangeNoAnswer(dayIndex, lineIndex)}
            sx={fieldStyle}
            />
            <TextField
            multiline
            label="Timeout Response"
            fullWidth={true}
            value={timeoutAnswer}
            onChange={handleChangeTimeoutAnswer(dayIndex, lineIndex)}
            sx={fieldStyle}
            />
            
        </div>
    )
}
