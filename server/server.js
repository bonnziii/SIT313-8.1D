const express = require('express');
const cors = require('cors');
const mailgun = require('mailgun-js');

// Replace with your actual Mailgun domain and API key
const DOMAIN = 'sandbox2cd5dab197bd45608ddccc8d58af8ae5.mailgun.org';
const API_KEY = 'eb2f99d852e73de4594a81e248c03611-3724298e-12aa12f4'; // Your private API key

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
const app = express();
app.use(cors());
app.use(express.json());

// Route to send email
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Mailgun data - Simple welcome email
  const data = {
    from: 'Dev@Deakin <welcome@sandbox2cd5dab197bd45608ddccc8d58af8ae5.mailgun.org>', // Replace with your verified Mailgun email
    to: email,
    subject: 'Welcome to Dev@Deakin!',
    text: `Hi there!\n\nThank you for subscribing to Dev@Deakin.\nStay tuned for updates and announcements!\n\nBest regards,\nThe Dev@Deakin Team`,
  };

  // Send email through Mailgun
  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email', error });
    }
    console.log('Email sent:', body);
    res.status(200).json({ message: 'Welcome email sent successfully!', body });
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
