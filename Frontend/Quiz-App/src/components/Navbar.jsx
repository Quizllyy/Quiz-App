<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
=======
import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
>>>>>>> 527e05898e5c10a3e768b2b332af72a9b770da24

  return (
<<<<<<< HEAD
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide">
          Quizly
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Contact", "Signin", "Login"].map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className="text-white hover:text-gray-200 transition duration-300 font-medium">
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-2xl"
            onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 p-4 space-y-3 shadow-lg">
          {["Home", "About", "Contact", "Signin", "Login"].map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className="block text-white hover:text-gray-200 transition duration-300 font-medium"
              onClick={() => setIsOpen(false)}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
=======
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

>>>>>>> 527e05898e5c10a3e768b2b332af72a9b770da24
