import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface IProps {
    id: number
    name: string
    editChar: any
}

export default function CharacterLine({ id, name, editChar }: IProps) {
    useEffect(()=>{
        console.log(`Use effect firing with new name ${name}`)
    },[name])

    const [isEditing, setIsEditing] = useState(false)
    const [val, setVal] = useState("")
    const handleChange = (e: any) => {
        setVal(e.target.value)
    }
    const editCharAndClear = (e:any) => {
        e.preventDefault()
        setIsEditing(false)
        editChar(id, val)
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
                        label="Edit Name" 
                        variant="standard"
                        value={val}
                        onChange={handleChange}
                        />
                    <Button
                        onClick={editCharAndClear}
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
