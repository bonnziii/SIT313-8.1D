import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig'; // Import Firebase Auth
import NavigationBar from './components/NavigationBar';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import Footer from './components/Footer';
import HeaderImage from './components/HeaderImage';
import HomePage from './components/HomePage';
import SubscriptionBar from './components/SubscriptionBar';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindQuestionPage from './pages/FindQuestion';
import './App.css';

const App = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <Routes>
        {/* Show homepage content only if authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <HeaderImage />
                <HomePage />
                <FeaturedArticles />
                <FeaturedTutorials />
                <SubscriptionBar />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <>
                <HeaderImage />
                <HomePage />
                <FeaturedArticles />
                <FeaturedTutorials />
                <SubscriptionBar />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/post" element={<PostPage />} />
        <Route path="/find-question" element={<FindQuestionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
