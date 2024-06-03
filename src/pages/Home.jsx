import React, { useState } from 'react';
import FrontCover from '../components/FrontCover';
import axios from 'axios';

const Home = () => {
  const [frontCoverData, setFrontCoverData] = useState({});

  const handleFrontCoverChange = (data) => {
    setFrontCoverData(data);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/pdf', { frontCoverData }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>Create Your Book</h1>
      <FrontCover onCoverDataChange={handleFrontCoverChange} />
      <button onClick={handleSubmit}>Generate PDF</button>
    </div>
  );
};

export default Home;
