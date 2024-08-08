import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  // Inline styles converted from the original CSS
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #fff1f2, #ccfbf1)',
      display: 'flex',
      height: '100vh',
      width: '100vw',
      padding: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      textAlign: 'center',
    },
    error404: {
      width: '90vmin',
      height: '15vmin',
      padding: 0,
      margin: '0 auto',
      backgroundColor: '#fff',
      color: 'linear-gradient(to right, #fff1f2, #ccfbf1)',
      fontSize: '40vmin',
      lineHeight: '20vmin',
      overflow: 'hidden',
    },
    heading: {
      padding: 0,
      margin: 0,
      position: 'relative',
      top: '-2vmin',
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'firebrick',
      padding: 0,
      margin: '0 auto',
      marginTop: '2vmin',
      fontSize: '5vmin',
      fontWeight: 'bold',
    },
    text: {
      color: '#777',
    },
    button: {
      backgroundColor: '#4caf4fa8',
      borderRadius: '25px',
      color: '#fff',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      transition: '0.5s',
    },
    buttonHover: {
      backgroundColor: '#4CAF50',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.wrapper}>
        <div style={styles.error404}>
          <h1 style={styles.heading}>404</h1>
        </div>
        <p style={styles.subtitle}>Page Not Found</p>
        <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ ...styles.button, ...styles.buttonHover }}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
