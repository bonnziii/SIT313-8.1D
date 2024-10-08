import React, { useState } from 'react';
import '../styles/SubscriptionBar.css';

function SubscriptionBar() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const subscribeUser = async () => {
    try {
      const response = await fetch('http://localhost:5001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is ok
      if (response.ok) {
        const data = await response.json();
        setMessage('Subscription successful! A welcome email has been sent.');
        console.log('Subscription successful:', data);
      } else {
        throw new Error('Subscription failed.');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      setMessage('Subscription failed. Please try again.');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      subscribeUser();
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  return (
    <div className="subscription-bar">
      <span className="subscription-text">SIGN UP FOR OUR DAILY INSIDER</span>
      <input
        type="email"
        placeholder="Enter your email"
        className="subscription-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe} className="subscription-button">
        Subscribe
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubscriptionBar;
