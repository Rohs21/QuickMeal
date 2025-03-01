import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const styles = {
    loginContainer: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      padding: '10px 12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '14px',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    loginBtn: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#666'
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      color: '#d32f2f',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '15px'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setErrorMessage('Email is required.');
      return;
    }
    if (!formData.password) {
      setErrorMessage('Password is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Server Response:', response.data);
      
      if (response.data.success === true) {
        localStorage.setItem('token', response.data.jwtToken);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);
        
        navigate('/');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log('Error details:', error.response || error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage('Invalid email or password format.');
            break;
          case 401:
            setErrorMessage('Invalid credentials. Please check your email and password.');
            break;
          case 404:
            setErrorMessage('Account not found. Please check your email.');
            break;
          default:
            setErrorMessage(error.response.data?.message || 'Login failed. Please try again.');
        }
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.loginForm}>
        {errorMessage && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>
        <button 
          type="submit" 
          style={styles.loginBtn}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Login
        </button>
      </form>
      <div style={styles.signupLink}>
        <p>Don't have an account? <a href="/signup" style={styles.link}>Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;