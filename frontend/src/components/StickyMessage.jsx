import  { useState } from 'react';

const StickyMessage = () => {
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  if (!isVisible) return null; // Don't render the message if it's closed

  return (
    <div style={styles.stickyMessage}>
      <p style={styles.messageText}>
      Please note: FoodMedin is intended for educational purposes only and should not be used as a source of medical or nutritional advice.
        <button style={styles.closeButton} onClick={() => setIsVisible(false)}>×</button>
      </p>
    </div>
  );
};

const styles = {
  stickyMessage: {
    position: 'fixed',
    bottom: 0, // Change to 'top' if you want the message at the top
    width: '100%',
    backgroundColor: '#f44336', // Red background to grab attention
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    fontSize: '14px',
    zIndex: 1000, // Ensures it's above other content
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
  },
  messageText: {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: '15px',
    cursor: 'pointer',
  },
};

export default StickyMessage;
