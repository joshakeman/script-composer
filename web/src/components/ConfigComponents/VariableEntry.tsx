import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface IProps {
    id: number
    name: string
    editVar: any
}

export default function VariableEntry({ id, name, editVar }: IProps) {
    useEffect(()=>{
    },[name])

    const [isEditing, setIsEditing] = useState(false)
    const [val, setVal] = useState("")
    const handleChange = (e: any) => {
        setVal(e.target.value)
    }
    const editVarAndClear = (e:any) => {
        e.preventDefault()
        setIsEditing(false)
        editVar(id, val)
    }
    const clickEdit = () => {
        setVal(name)
        setIsEditing(true)
    }
    return (
        <div style={{display:'flex', alignItems:'center'}}> 
            <EditIcon onClick={clickEdit} fontSize="small" sx={{marginRight:'10px', cursor: 'pointer'}}/>

            {
                isEditing ? (
                    <>
                    <TextField
                        name="char_input"
                        label="Edit Variable" 
                        variant="standard"
                        value={val}
                        onChange={handleChange}
                        />
                    <Button
                        onClick={editVarAndClear}
                        >
                        Done
                    </Button>
                    </>
                ) : (
                    <p>{name}</p>
                )
            }
        </div>
    )
}
