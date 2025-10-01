import React from 'react';

const ErrorMessage = ({ 
  message, 
  onRetry, 
  retryText = 'Try Again',
  variant = 'error',
  showIcon = true 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          color: '#856404',
          icon: '⚠️'
        };
      case 'info':
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          color: '#0c5460',
          icon: 'ℹ️'
        };
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          color: '#155724',
          icon: '✅'
        };
      default: // error
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          color: '#721c24',
          icon: '❌'
        };
    }
  };

  const styles = getVariantStyles();

  const containerStyle = {
    padding: '1rem',
    margin: '1rem 0',
    border: `1px solid ${styles.borderColor}`,
    borderRadius: '4px',
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem'
  };

  const messageStyle = {
    flex: 1,
    margin: 0,
    fontSize: '0.875rem',
    lineHeight: '1.4'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: `1px solid ${styles.color}`,
    borderRadius: '4px',
    color: styles.color,
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      {showIcon && (
        <span style={{ fontSize: '1rem', flexShrink: 0 }}>
          {styles.icon}
        </span>
      )}
      <div style={{ flex: 1 }}>
        <p style={messageStyle}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.color;
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = styles.color;
            }}
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
