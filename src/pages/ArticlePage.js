import React from 'react';
import '../styles/ArticlePage.css';

const ArticlePage = () => {
  return (
    <div className="article-page-container">
      <h3>Create an Article</h3>
      <form>
        <input type="text" placeholder="Title" />
        <textarea placeholder="Write your article here"></textarea>
        <button type="submit">Post Article</button>
      </form>
    </div>
  );
};

export default ArticlePage;
