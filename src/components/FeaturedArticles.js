import React from 'react';
import '../styles/FeaturedArticles.css';
import { Card, Image, Button } from 'semantic-ui-react';

const articles = [
  {
    title: 'Exploring React Ecosystem',
    description: 'A deep dive into React components and hooks.',
    rating: 5,
    author: 'John Doe',
    image: 'https://picsum.photos/300/200?random=1',
  },
  {
    title: 'Mastering JavaScript ES6',
    description: 'Understanding new features and syntax in ES6.',
    rating: 4.8,
    author: 'Jane Smith',
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    title: 'CSS Grid vs Flexbox',
    description: 'Comparing CSS Grid and Flexbox for modern layouts.',
    rating: 4.9,
    author: 'Alex Johnson',
    image: 'https://picsum.photos/300/200?random=3',
  },
];

const FeaturedArticles = () => (
  <div className="featured-articles">
    <h2>Featured Articles</h2>
    <div className="articles-container">
      {articles.map((article, index) => (
        <Card key={index} className="article-card">
          <Image src={article.image} wrapped ui={false} className="article-image" />
          <Card.Content className="article-content">
            <Card.Header>{article.title}</Card.Header>
            <Card.Meta>{article.description}</Card.Meta>
            <Card.Description>{`Author: ${article.author}`}</Card.Description>
          </Card.Content>
          <Card.Content extra className="article-rating-author">
            <span role="img" aria-label="star">⭐</span> {article.rating}
          </Card.Content>
        </Card>
      ))}
    </div>
    <Button primary style={{ marginTop: '20px' }}>See all articles</Button>
  </div>
);

export default FeaturedArticles;

