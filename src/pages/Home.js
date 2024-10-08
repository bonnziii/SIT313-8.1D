import React from 'react';
import { useUserContext } from '../context/UserContext';
import '../styles/Home.css';

const Home = () => {
  const { currentUser } = useUserContext();

  return (
    <div className="home-container">
      <h2>Welcome to Dev@Deakin</h2>
      {currentUser ? (
        <p>Hello, {currentUser.displayName}!</p>
      ) : (
        <p>Please sign in to explore more features.</p>
      )}
    </div>
  );
};

export default Home;
