import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
            <nav>
                <Link to="/" style={linkStyle}>Configure</Link>
                <Link to="/builder" style={linkStyle}>Builder</Link>
            </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
