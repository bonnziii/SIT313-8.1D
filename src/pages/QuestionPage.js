import React from 'react';
import '../styles/QuestionPage.css';

const QuestionPage = () => {
  return (
    <div className="question-page-container">
      <h3>Ask a Question</h3>
      <form>
        <input type="text" placeholder="Title" />
        <textarea placeholder="Describe your problem in detail"></textarea>
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
};

export default QuestionPage;
