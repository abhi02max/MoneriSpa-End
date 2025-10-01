import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = '#1976d2', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  const spinnerStyle = {
    display: 'inline-block',
    width: spinnerSize,
    height: spinnerSize,
    border: `3px solid ${color}20`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 9999
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        {text && (
          <p style={{ 
            marginTop: '1rem', 
            color: color,
            fontSize: size === 'small' ? '0.875rem' : '1rem',
            fontWeight: '500'
          }}>
            {text}
          </p>
        )}
      </div>
    </>
  );
};

export default LoadingSpinner;
