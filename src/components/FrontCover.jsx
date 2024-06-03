import React, { useState } from 'react';

const FrontCover = ({ onCoverDataChange }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundImage(reader.result);
      onCoverDataChange({ backgroundImage: reader.result, title, author });
    };
    reader.readAsDataURL(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onCoverDataChange({ backgroundImage, title: e.target.value, author });
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    onCoverDataChange({ backgroundImage, title, author: e.target.value });
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <br />
      <br />
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Book Title" />
      <br />
      <br />
      <input type="text" value={author} onChange={handleAuthorChange} placeholder="Author Name" />
      <br />
      <br />
      <div style={{ backgroundImage: `url(${backgroundImage})`, height: '300px', width: '200px' }}>
        <h1>{title}</h1>
        <h2>{author}</h2>
      </div>
    </div>
  );
};
//hello
export default FrontCover;
