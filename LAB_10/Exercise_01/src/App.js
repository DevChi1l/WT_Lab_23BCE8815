import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes (Controlled Components)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();   // Prevent page refresh

    if (validateForm()) {
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: '', email: '', password: '' });
        setErrors({});
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.heading}>User Registration Form</h1>
        <p style={styles.subheading}>Form Validation using Controlled Components</p>

        {submitted && (
          <div style={styles.success}>
            ✅ Registration Successful!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your name"
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="example@gmail.com"
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter password (min 6 characters)"
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          <button type="submit" style={styles.submitBtn}>
            Register
          </button>
        </form>
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
  formCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '450px'
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
  field: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px'
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold'
  }
};

export default App;