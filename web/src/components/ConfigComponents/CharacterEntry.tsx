import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import charImg from '../../images/char-cards/7.png'

interface IProps {
    id: number
    name: string
    editChar: any
}

const cardStyles = { 
    backgroundColor: '#efefef', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    margin: '10px 0', 
    padding: '10px' 
}

export default function CharacterEntry({ id, name, editChar }: IProps) {
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
            <Card sx={cardStyles}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
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
                            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <EditIcon onClick={clickEdit} fontSize="small" sx={{marginRight:'10px', cursor: 'pointer'}}/>
                                    <Typography variant="h5" color="text.secondary" component="div">{name}</Typography>
                                </Stack>
                                {/* <Typography sx={{ marginTop: '10px' }} variant="body1" color="text.secondary" component="div">description</Typography> */}
                            </Box>
                        )
                    }
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 85, height: 85 }}
                    image={charImg}
                    alt="Character image"
                />
            </Card>
        </div>
    )
}
