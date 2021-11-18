import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const linkStyle = {
    marginRight:'10px', 
    color: 'white', 
    textDecoration: 'none'
}
export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Stack sx={{ width : '100%' }} direction="row" justifyContent="space-between" alignItems="center" className="nav-links">
                <div>
                    <Link to="/" style={linkStyle}>Configure</Link>
                    <Link to="/builder" style={linkStyle}>Builder</Link>
                </div>
                <Button variant="contained" color="secondary" >Save</Button>
            </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
