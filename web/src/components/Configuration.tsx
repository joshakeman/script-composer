import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import CharacterEntry from './ConfigComponents/CharacterEntry'
import VariableEntry from './ConfigComponents/VariableEntry';

import { updateChar, selectCharList, addNew } from '../redux/reducers/characters'
import { updateVar, selectVarList, addNewVar } from '../redux/reducers/variables'

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
    margin:'10px', 
    width: '360px'
}

export default function Configuration() {
    const charList = useSelector(selectCharList);
    const varList = useSelector(selectVarList);
    const dispatch = useDispatch();

    const [char, setChar] = useState("");
    const [vari, setVari] = useState("");

    const handleChangeChar = (e: any) => {
        setChar(e.target.value)
    }

    const handleChangeVar = (e: any) => {
        setVari(e.target.value)
    }

    const createChar = () => {
        dispatch(addNew(char))
        setChar("")
    }

    const createVar = () => {
        dispatch(addNewVar(vari))
        setVari("")
    }

    const editChar = (id: number, value: string) => {
        dispatch(updateChar({id, name:value}))
    }

    const editVar = (id: number, value: string) => {
        dispatch(updateVar({id, name:value}))
    }

    return (
        <div style={{display:'flex'}}>
        <Paper sx={paperStyle} elevation={3}>
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
                    <CharacterEntry key={char !== undefined ? char.id : 0} id={char !== undefined ? char.id : 0} name={char !== undefined ? char.name : ""} editChar={editChar} />
                )
            }
        </Paper>
        <Paper sx={paperStyle} elevation={3}>
            <h2>Variables</h2>
            <div style={{display:'flex', alignItems:'center'}}>
                <TextField
                    name="char_input"
                    label="Add Variable" 
                    variant="standard"
                    value={vari}
                    onChange={handleChangeVar}
                    />
                <Button
                    onClick={createVar}
                >
                    Add
                </Button>
            </div>
            {
                varList.map((v: any) => 
                    <VariableEntry key={v !== undefined ? v.id : 0} id={v !== undefined ? v.id : 0} name={v !== undefined ? v.name : ""} editVar={editVar} />
                )
            }
        </Paper>
        </div>
    )
}
