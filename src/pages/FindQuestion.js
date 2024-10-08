import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import '../styles/FindQuestion.css';

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
    });

    return () => unsubscribe();
  }, []);

  const handleFilter = () => {
    let q;
    if (filterType === 'date') {
      const date = new Date(filterValue);
      q = query(collection(db, 'questions'), where('createdAt', '>=', date), where('createdAt', '<', new Date(date.getTime() + 86400000)));
    } else if (filterType === 'tag') {
      q = query(collection(db, 'questions'), where('tags', 'array-contains', filterValue));
    } else if (filterType === 'title') {
      q = query(collection(db, 'questions'), where('title', '>=', filterValue), where('title', '<=', filterValue + '\uf8ff'));
    }

    if (q) {
      onSnapshot(q, (snapshot) => {
        const filteredQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(filteredQuestions);
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      alert('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Error deleting question. Please try again.');
    }
  };

  const toggleExpand = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  return (
    <div className="find-question-container">
      <h2>Find Questions</h2>
      <div className="filter-section">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Select filter type</option>
          <option value="date">Date</option>
          <option value="tag">Tag</option>
          <option value="title">Title</option>
        </select>
        <input
          type={filterType === 'date' ? 'date' : 'text'}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter value"
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div className="questions-list">
        {questions.map(question => (
          <div key={question.id} className="question-card" onClick={() => toggleExpand(question.id)}>
            <h3>{question.title}</h3>
            <p>Tags: {question.tags.join(', ')}</p>
            <p>Date: {question.createdAt.toDate().toLocaleDateString()}</p>
            {expandedQuestionId === question.id && (
              <div className="expanded-content">
                <h4>Abstract:</h4>
                <p>{question.abstract}</p>
                <h4>Details:</h4>
                <p>{question.content}</p>
                {question.imageUrl && <img src={question.imageUrl} alt="Question" className="question-image" />}
              </div>
            )}
            <button onClick={(e) => {
              e.stopPropagation();
              handleDelete(question.id);
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindQuestionPage;