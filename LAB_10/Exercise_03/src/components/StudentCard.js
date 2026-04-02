import React from 'react';

function StudentCard({ name, department, marks, rollNo }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.roll}>Roll No: {rollNo}</p>

      <div style={styles.details}>
        <p><strong>Department:</strong> {department}</p>
        <p>
          <strong>Marks:</strong> 
          <span style={{ 
            color: marks >= 90 ? 'green' : marks >= 80 ? 'orange' : 'red',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            {marks}%
          </span>
        </p>
      </div>

      <p style={styles.note}>Props-based Reusable Component</p>
    </div>
  );
}

const styles = {
  card: {
    width: '300px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  name: {
    color: '#1976d2',
    margin: '0 0 8px 0',
    fontSize: '22px'
  },
  roll: {
    color: '#666',
    marginBottom: '20px',
    fontSize: '14px'
  },
  details: {
    textAlign: 'left',
    lineHeight: '2.1',
    fontSize: '16px'
  },
  note: {
    marginTop: '20px',
    color: '#888',
    fontSize: '13px',
    fontStyle: 'italic'
  }
};

export default StudentCard;