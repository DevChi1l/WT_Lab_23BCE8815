import React from 'react';

function StudentProfile() {
  const name = "Elliot Kumar";
  const department = "Computer Science and Engineering";
  const year = "2nd Year";
  const section = "A";
  const rollNo = "23CSE101";
  const college = "Your College Name";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Profile</h1>
        
        <div style={styles.info}>
          <p><strong>Name:</strong> <span style={styles.value}>{name}</span></p>
          <p><strong>Department:</strong> <span style={styles.value}>{department}</span></p>
          <p><strong>Year:</strong> <span style={styles.value}>{year}</span></p>
          <p><strong>Section:</strong> <span style={styles.value}>{section}</span></p>
          <p><strong>Roll No:</strong> <span style={styles.value}>{rollNo}</span></p>
          <p><strong>College:</strong> <span style={styles.value}>{college}</span></p>
        </div>

        <p style={styles.footer}>Built using React Functional Component + JSX</p>
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
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center'
  },
  title: {
    color: '#1976d2',
    fontSize: '28px',
    marginBottom: '25px'
  },
  info: {
    textAlign: 'left',
    lineHeight: '2.4',
    fontSize: '18px'
  },
  value: {
    color: '#333',
    fontWeight: '500'
  },
  footer: {
    marginTop: '35px',
    color: '#777',
    fontStyle: 'italic',
    fontSize: '15px'
  }
};

export default StudentProfile;