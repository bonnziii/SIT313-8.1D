import React from 'react';
import '../styles/FeaturedTutorials.css';
import { Card, Image, Button } from 'semantic-ui-react';

const tutorials = [
  {
    title: 'Getting Started with React',
    description: 'Learn the basics of React and how to build components.',
    rating: 5,
    author: 'David Brown',
    image: 'https://picsum.photos/300/200?random=4',
  },
  {
    title: 'Introduction to Node.js',
    description: 'Understanding server-side JavaScript with Node.js.',
    rating: 4.7,
    author: 'Emily White',
    image: 'https://picsum.photos/300/200?random=5',
  },
  {
    title: 'Express.js for Beginners',
    description: 'Building RESTful APIs with Express.js.',
    rating: 4.9,
    author: 'Michael Green',
    image: 'https://picsum.photos/300/200?random=6',
  },
];

const FeaturedTutorials = () => (
  <div className="featured-tutorials">
    <h2>Featured Tutorials</h2>
    <div className="tutorials-container">
      {tutorials.map((tutorial, index) => (
        <Card key={index} className="tutorial-card">
          <Image src={tutorial.image} wrapped ui={false} className="tutorial-image" />
          <Card.Content className="tutorial-content">
            <Card.Header>{tutorial.title}</Card.Header>
            <Card.Meta>{tutorial.description}</Card.Meta>
            <Card.Description>{`Author: ${tutorial.author}`}</Card.Description>
          </Card.Content>
          <Card.Content extra className="tutorial-rating-author">
            <span role="img" aria-label="star">⭐</span> {tutorial.rating}
          </Card.Content>
        </Card>
      ))}
    </div>
    <Button primary style={{ marginTop: '20px' }}>See all tutorials</Button>
  </div>
);

export default FeaturedTutorials;

