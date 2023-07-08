import React from 'react';
import './ProtectedPage.css';
import SnakeGame from './SnakeGame'; // Import the SnakeGame component

const ProtectedPage = () => {
  const token = localStorage.getItem('token');

  const kadi = localStorage.getItem('kadi');

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.replace('/');
  };

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
      <hr />
      <button onClick={handleLogout}  className="logout-button">Logout</button>
    </div>
  );
};

export default ProtectedPage;
