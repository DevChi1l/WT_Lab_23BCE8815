import React from 'react';
import StudentCard from './components/StudentCard';

function App() {
  const students = [
    { id: 1, name: "Elliot Kumar", department: "CSE", marks: 92, rollNo: "23CSE101" },
    { id: 2, name: "Priya Sharma", department: "CSE", marks: 88, rollNo: "23CSE102" },
    { id: 3, name: "Rahul Verma", department: "IT", marks: 95, rollNo: "23CSE103" },
    { id: 4, name: "Sneha Patel", department: "CSE", marks: 85, rollNo: "23CSE104" },
  ];

  return (
    <div style={styles.main}>
      <h1 style={styles.heading}>Student Cards</h1>
      <p style={styles.sub}>Component Reusability using Props</p>

      <div style={styles.cards}>
        {students.map(student => (
          <StudentCard 
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
            rollNo={student.rollNo}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    backgroundColor: '#f4f7fc',
    padding: '30px 20px'
  },
  heading: {
    textAlign: 'center',
    color: '#1976d2',
    fontSize: '32px',
    marginBottom: '8px'
  },
  sub: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '40px',
    fontSize: '18px'
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '25px'
  }
};

export default App;