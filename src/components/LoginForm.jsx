import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file for styling


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vercelUrl = 'https://login-back-three.vercel.app/api/login';
    try {
      const response = await axios.post(vercelUrl, { username, password });
      const { token } = response.data;
      console.log(response.data)
      const kadi = response.data.username;
      localStorage.setItem('kadi',kadi);
     
      localStorage.setItem('token', token);
      navigate('/protected');
    } catch (error) {
      setError('Kardeş parola veya kulanıcı adı yanlış.');
    }
  };

  return (
    <div className='login-container'> 
      <h2>Login</h2>
      {error && <p className='error-message'> <img src="/kozubasasvg.svg" alt="🤠" /> {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input-field'/>
        </div>
        <div className='form-group'>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input-field'/>
        </div>
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
