import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';

import NewShowModal from './NewShowModal';

const cardStyles = { 
    backgroundColor: '#efefef', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    margin: '10px 0', 
    padding: '10px' 
}

export default function ShowSelect() {

    const [isEditing, setIsEditing] = useState(false)
    const [val, setVal] = useState("")
    const [title, setTitle] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: any) => {
        setVal(e.target.value)
    }
    const editTitleAndClear = (e:any) => {
        e.preventDefault()
        setIsEditing(false)
        setTitle(val)
    }
    const clickEdit = () => {
        setVal(title)
        setIsEditing(true)
    }
    return (
        <Paper sx={{width:700, height: '400px', margin:'20px auto', padding: '20px'}}>
            <Typography variant="h4">
                My Textplays
            </Typography>
            <Card sx={cardStyles}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    {
                        isEditing ? (
                            <>
                            <TextField
                                name="title_input"
                                label="Edit Title" 
                                variant="standard"
                                value={val}
                                onChange={handleChange}
                                />
                            <Button
                                onClick={editTitleAndClear}
                                >
                                Done
                            </Button>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <EditIcon onClick={clickEdit} fontSize="small" sx={{marginRight:'10px', cursor: 'pointer'}}/>
                                    <Typography variant="h5" color="text.secondary" component="div">{title}</Typography>
                                </Stack>
                            </Box>
                        )
                    }
                    </CardContent>
                </Box>
            </Card>
            <Divider variant="middle" sx={{margin:'10px 0'}} />
            <Box sx={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <NewShowModal />
            </Box>
        </Paper>
    )
}
