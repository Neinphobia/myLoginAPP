import React from 'react';
import './ProtectedPage.css';
import SnakeGame from './SnakeGame'; // Import the SnakeGame component

const ProtectedPage = () => {
  const token = localStorage.getItem('token');

  const kadi = localStorage.getItem('kadi');

  if (!token) {
    return window.location.replace('/');
  }

  return (
    <div className="protected-container">
      <h2>Korunan Sayfa</h2>
      <p>Hoşgeldiniz, <strong>{kadi}</strong>. Buraya sadece üyeliği olan kullanıcılar giriş yapabilir.</p>
     

      <p>Tokeniniz:</p>
      <textarea defaultValue={token} className="token-textarea" />

      {/* Render the SnakeGame component */}
      <SnakeGame />
    </div>
  );
};

export default ProtectedPage;
