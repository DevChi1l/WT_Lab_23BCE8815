import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([
    "Learn React",
    "Complete Lab Assignment",
    "Submit Report"
  ]);
  
  const [newItem, setNewItem] = useState("");

  // Add new item
  const addItem = () => {
    if (newItem.trim() === "") return;
    
    setItems([...items, newItem.trim()]);
    setNewItem(""); // Clear input
  };

  // Remove item
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Dynamic List</h1>
        <p style={styles.subheading}>Add & Remove Items using useState + .map()</p>

        {/* Add New Item Section */}
        <div style={styles.addSection}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new item..."
            style={styles.input}
          />
          <button onClick={addItem} style={styles.addButton}>
            Add Item
          </button>
        </div>

        {/* List Display */}
        <div style={styles.listContainer}>
          <h3 style={styles.listTitle}>Items List ({items.length})</h3>
          
          {items.length === 0 ? (
            <p style={styles.empty}>List is empty. Add some items!</p>
          ) : (
            <ul style={styles.list}>
              {items.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.itemText}>{item}</span>
                  <button 
                    onClick={() => removeItem(index)}
                    style={styles.deleteButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p style={styles.footer}>Demonstrating List Rendering, Keys, and State Management</p>
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
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '600px'
  },
  heading: {
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: '5px'
  },
  subheading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px'
  },
  addSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px'
  },
  input: {
    flex: 1,
    padding: '14px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  addButton: {
    padding: '14px 25px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  listContainer: {
    marginTop: '10px'
  },
  listTitle: {
    marginBottom: '15px',
    color: '#333'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  itemText: {
    fontSize: '16px'
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    padding: '30px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#777',
    fontSize: '14px'
  }
};

export default App;