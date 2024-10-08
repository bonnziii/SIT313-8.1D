import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../FirebaseConfig';
import '../styles/PostPage.css';

const PostPage = () => {
  const [postType, setPostType] = useState('article');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const fileInputRef = useRef(null);

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error("Error uploading image:", error);
        alert('Error uploading image. Please try again.');
      }
    } else {
      alert('Please select an image first.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const docData = {
        title,
        abstract,
        content,
        imageUrl,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date(),
        type: postType
      };

      const collectionRef = collection(db, postType === 'question' ? 'questions' : 'articles');
      await addDoc(collectionRef, docData);

      alert('Post created successfully!');
      // Clear form fields after successful submission
      setTitle('');
      setAbstract('');
      setContent('');
      setImage(null);
      setTags('');
    } catch (error) {
      console.error("Error adding document:", error);
      alert(`Error creating post. Please try again. Error: ${error.message}`);
    }
  };

  return (
    <div className="post-page">
      <h2>New Post</h2>
      <div className="post-type-selection">
        <label>
          <input
            type="radio"
            value="question"
            checked={postType === 'question'}
            onChange={handlePostTypeChange}
          />
          Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === 'article'}
            onChange={handlePostTypeChange}
          />
          Article
        </label>
      </div>
      <h3>What do you want to ask or share</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        {postType === 'article' && (
          <div className="form-group">
            <label>Add an image:</label>
            <div className="image-upload">
              <input
                type="text"
                value={image ? image.name : ''}
                readOnly
                placeholder="No file chosen"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button type="button" onClick={handleBrowse}>Browse</button>
              <button type="button" onClick={handleUpload}>Upload</button>
            </div>
          </div>
        )}
        <div className="form-group">
          <label>Abstract</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Enter a 1-paragraph abstract"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Article Text</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your article text"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
            required
          />
        </div>
        <button type="submit" className="post-button">Post</button>
      </form>
    </div>
  );
};

export default PostPage;
