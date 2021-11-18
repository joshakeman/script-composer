import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import CharacterLine from './ConfigComponents/CharacterLine'

import { update, selectCharList, addNew } from '../redux/reducers/characters'

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
    const charList = useSelector(selectCharList);
    const dispatch = useDispatch();

    const [state, setState] = useState({characters:[], vars:[]} as ConfigState)
    const [char, setChar] = useState("")
    const [toggle, setToggle] = useState(false)

    const handleChangeChar = (e: any) => {
        setChar(e.target.value)
    }

    const createChar = () => {
        dispatch(addNew(char))
        console.log(charList)
        setChar("")
    }

    const editChar = (id: number, value: string) => {
        dispatch(update({id, name:value}))
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
                charList.map((char: any) =>
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
