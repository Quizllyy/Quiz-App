import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="navComponent">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logo">
          Quiz App
        </Typography>
        <Stack direction="row" spacing={2} className="navItems">
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About Us</Button>
          <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
          <Button color="inherit" component={Link} to="/signin">Sign In</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
