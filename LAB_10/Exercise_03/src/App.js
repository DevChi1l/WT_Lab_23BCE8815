import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array = run only once

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>API Data Fetching</h1>
        <p style={styles.subheading}>Using useEffect + fetch API</p>

        {/* Loading State */}
        {loading && (
          <div style={styles.loading}>
            <p>⏳ Loading users from API...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={styles.error}>
            ❌ Error: {error}
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && (
          <>
            <h3 style={styles.count}>Users List ({users.length})</h3>
            
            <div style={styles.grid}>
              {users.map(user => (
                <div key={user.id} style={styles.userCard}>
                  <h3 style={styles.name}>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Company:</strong> {user.company.name}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '30px 20px',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '1100px'
  },
  heading: {
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: '8px'
  },
  subheading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px'
  },
  count: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px'
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#1976d2',
    padding: '50px'
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: '18px',
    padding: '40px',
    backgroundColor: '#ffebee',
    borderRadius: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #eee',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
  },
  name: {
    color: '#1976d2',
    margin: '0 0 12px 0'
  }
};

export default App;