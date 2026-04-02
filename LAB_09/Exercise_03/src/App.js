import React, { useState } from 'react';

function App() {
  // Step 1: Using useState Hook
  const [count, setCount] = useState(0);   // Initial value = 0

  // Step 2: Increment Function
  const increment = () => {
    setCount(count + 1);
  };

  // Step 3: Decrement Function
  const decrement = () => {
    setCount(count - 1);
  };

  // Step 4: Reset Function (Bonus)
  const reset = () => {
    setCount(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Counter App</h1>
        <p style={styles.subheading}>Using useState Hook</p>

        {/* Display Counter Value */}
        <div style={styles.counterBox}>
          <h1 style={styles.count}>{count}</h1>
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>
          <button style={styles.decrementBtn} onClick={decrement}>
            - Decrement
          </button>

          <button style={styles.resetBtn} onClick={reset}>
            Reset
          </button>

          <button style={styles.incrementBtn} onClick={increment}>
            Increment +
          </button>
        </div>

        <p style={styles.footer}>
          State updates automatically on button click
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '420px'
  },
  heading: {
    color: '#1976d2',
    marginBottom: '5px'
  },
  subheading: {
    color: '#666',
    marginBottom: '30px'
  },
  counterBox: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '15px',
    margin: '20px 0',
    border: '2px solid #1976d2'
  },
  count: {
    fontSize: '72px',
    margin: '0',
    color: '#1976d2',
    fontWeight: 'bold'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  incrementBtn: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  decrementBtn: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  resetBtn: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  footer: {
    marginTop: '30px',
    color: '#777',
    fontSize: '14px'
  }
};

export default App;