import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

interface ConfigState {
    characters: Array<Character>
    vars: Array<string>
    char_input: string
}

type Character = {
    name: string
    mug: string
}

export default function Configuration() {
    const [state, setState] = useState({characters:[], vars:[], char_input:""} as ConfigState)

    const handleChangeChar = (e: any) => {
        console.log(e.target.value)
        let newState = state
        newState.char_input = e.target.value
        setState(newState)
    }

    const createChar = () => {
        let newState = state
        newState.characters = [...state.characters, {name:state.char_input,mug:''}]
        newState.char_input = ""
        setState(newState)
        
    }

    return (
        <div>
            <h2>Characters</h2>
            <Button
                variant="contained"
                onClick={createChar}
            >
                Add
            </Button>
            <TextField
                name="char_input"
                value={state.char_input}
                onChange={handleChangeChar}
                />
            {
                state.characters.map(char => 
                    <p>{char.name}</p>
                )
            }
            <h2>Variables</h2>
            {
                state.vars.map(v => 
                    <p>{v}</p>
                )
            }
        </div>
    )
}
