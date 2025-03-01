import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const styles = {
    container: {
      width: '100%', 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '25px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center', 
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    form: {
      display: 'flex', 
      flexDirection: 'column'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px'
    },
    input: {
      padding: '10px', 
      fontSize: '14px', 
      borderRadius: '5px', 
      border: '1px solid #ccc', 
      width: '100%',
      boxSizing: 'border-box'
    },
    button: {
      padding: '12px', 
      fontSize: '16px', 
      color: 'white', 
      backgroundColor: '#007bff', 
      border: 'none', 
      borderRadius: '5px', 
      cursor: 'pointer', 
      width: '100%',
      marginTop: '10px'
    },
    loginLink: {
      textAlign: 'center', 
      marginTop: '15px',
      fontSize: '14px',
      color: '#666'
    },
    link: {
      color: '#007bff', 
      textDecoration: 'none'
    },
    error: {
      color: 'red', 
      textAlign: 'center', 
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#ffebee',
      borderRadius: '5px',
      fontSize: '14px'
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

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    
    // Password length validation
    if (formData.password.length < 5) {
      setErrorMessage('Password should be at least 5 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup</h2>
      
      {errorMessage && (
        <div style={styles.error}>
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            style={styles.input}
          />
        </div>
        
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
        
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            style={styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0069d9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Signup
        </button>
      </form>
      
      <div style={styles.loginLink}>
        <p>Already have an account? <a href="/login" style={styles.link}>Login</a></p>
      </div>
    </div>
  );
};

export default Signup;