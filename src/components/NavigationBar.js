import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header">Dev@Deakin</div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/post">Post</Link>
        <Link to="/find-question">Find Questions</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
