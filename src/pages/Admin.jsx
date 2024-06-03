import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/pdf', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPdfs(response.data);
    };

    fetchPdfs();
  }, []);

  const downloadPdf = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/api/pdf/download/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `book-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf) => (
            <tr key={pdf._id}>
              <td>{pdf.author}</td>
              <td>
                <button onClick={() => downloadPdf(pdf._id)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
