import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewShowModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [val, setVal] = useState("")
    
    const handleChange = (e: any) => {
        setVal(e.target.value)
        }

    const createShow = () => {

    }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Create New</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <TextField
                name="title_input"
                label="Edit Title" 
                variant="standard"
                value={val}
                onChange={handleChange}
                />
            <Button
                onClick={createShow}
                >
                Done
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
