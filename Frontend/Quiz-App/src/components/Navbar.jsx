import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    // <AppBar position="sticky" className="navbar">
    //   <Toolbar className="navComponent">
    //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logo">
    //       Quiz App
    //     </Typography>
    //     <Stack direction="row" spacing={2} className="navItems">
    //       <Button color="inherit" component={Link} to="/">Home</Button>
    //       <Button color="inherit" component={Link} to="/about">About Us</Button>
    //       <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
    //       <Button color="inherit" component={Link} to="/signin">Sign In</Button>
    //       <Button color="inherit" component={Link} to="/login">Login</Button>
    //     </Stack>
    //   </Toolbar>
    // </AppBar>
    <nav className="bg-[#0C6291]-900 text-white shadow-lg p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide hover:text-gray-400">
          QuizMaster
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
        </div>

        {/* Login/Sign Up */}
        <div className="flex items-center gap-4">
          <Link to="/signin" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition duration-300">
            Sign In
          </Link>
          <Link to="/login" className="flex items-center gap-2 hover:text-gray-300 transition duration-300">
            <FaUser /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

