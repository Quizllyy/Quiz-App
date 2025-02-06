import React from 'react'
import "./Navbar.css"
import {AppBar, Toolbar, Typography, Stack, Button} from "@mui/material"

function Navbar() {
  return (
    <AppBar position='sticky' className='navbar'>
        <Toolbar className='navComponent'>
            <Typography variant='h6' component="div" sx={{flexGrow : 1}} className='logo'>
                Quiz App
            </Typography>
            <Stack direction="row" spacing={2} className='navItems'>
                <Button color='inherit'>Home</Button>
                <Button color='inherit'>About us</Button>
                <Button color='inherit'>Contact us</Button>
                <Button color='inherit'>Sign in</Button>
                <Button color='inherit'>Login in</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar