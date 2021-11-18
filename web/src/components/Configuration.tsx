import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import CharacterLine from './ConfigComponents/CharacterLine'

interface ConfigState {
    characters: Array<Character | undefined>
    vars: Array<string>
}

type Character = {
    id: number
    name: string
    mug: string
}

const paperStyle = {
    padding:'20px', 
    margin:'20px', 
    width: '300px'
}

export default function Configuration() {
    const [state, setState] = useState({characters:[], vars:[]} as ConfigState)
    const [char, setChar] = useState("")
    const [toggle, setToggle] = useState(false)

    const handleChangeChar = (e: any) => {
        setChar(e.target.value)
    }

    const createChar = () => {
        let newState = state
        newState.characters = [...state.characters, {id: state.characters.length, name:char, mug:''}]
        setChar("")
        setState(newState)
    }

    const editChar = (id: number, value: string) => {
        let newState = state
        let thisOne = state.characters.find(c => c?.id === id);
        console.log(thisOne)
        thisOne?.name !== undefined ? thisOne.name = value : console.log();
        let restOf = state.characters.filter(c => c?.id !== id);
        console.log(restOf)
        let newArray = [...restOf, thisOne].sort( compare );
        console.log(newArray)
        newState.characters = newArray
        console.log(newState)
        setState(newState)
        setToggle(!toggle)
    }

    function compare( a: any , b: any ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }

    return (
        <div style={{display:'flex'}}>
        <Paper sx={paperStyle}>
            <h2>Characters</h2>
            <div style={{display:'flex', alignItems:'center'}}>
                <TextField
                    name="char_input"
                    label="Add Name" 
                    variant="standard"
                    value={char}
                    onChange={handleChangeChar}
                    />
                <Button
                    onClick={createChar}
                >
                    Add
                </Button>
            </div>
            {
                state.characters.map((char) =>
                    <CharacterLine key={char !== undefined ? char.id : 0} id={char !== undefined ? char.id : 0} name={char !== undefined ? char.name : ""} editChar={editChar} />
                )
            }
        </Paper>
        <Paper sx={paperStyle}>
            <h2>Variables</h2>
            {
                state.vars.map(v => 
                    <p>{v}</p>
                )
            }
        </Paper>
        </div>
    )
}
