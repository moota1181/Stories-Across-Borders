import React, { useState } from 'react';
import './addSturyModal.css';

const AddStoryModel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError('Please fill out all required fields');
      return;
    }

    const newStory = {
      title,
      content,
      author,
      tags,
      createdAt: new Date().toISOString(), // This would typically be set by the backend
    };

    // Simulate API call
    console.log('Story Added:', newStory);

    // Reset the form fields
    setTitle('');
    setContent('');
    setAuthor('');
    setTags('');
    setError('');
  };

  return (
    <div className="add-story-container">
      <h2>Add a New Story</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Story Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Story Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter story content"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (optional)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma separated)"
          />
        </div>

        <button type="submit" className="submit-btn">Add Story</button>
      </form>
    </div>
  );
};

export default AddStoryModel;
