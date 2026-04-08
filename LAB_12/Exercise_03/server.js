const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lab12_students_db';

app.use(express.json());

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    grade: { type: String, default: 'N/A' },
    createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }

    
}

app.post('/api/students', async (req, res) => {
    try {
        const { name, age, department, grade } = req.body;

        if (!name || !age || !department) {
            return res.status(400).json({ error: 'name, age, and department are required' });
        }

        const student = await Student.create({ name, age, department, grade });
        console.log('Student created:', student.name);
        res.status(201).json({ message: 'Student created', student });
    } catch (err) {
        console.error('Create error:', err.message);
        res.status(500).json({ error: 'Failed to create student' });
    }
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        console.log(`Fetched ${students.length} students`);
        res.json({ count: students.length, students });
    } catch (err) {
        console.error('Fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        console.error('Fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Student updated:', student.name);
        res.json({ message: 'Student updated', student });
    } catch (err) {
        console.error('Update error:', err.message);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Student deleted:', student.name);
        res.json({ message: 'Student deleted', student });
    } catch (err) {
        console.error('Delete error:', err.message);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('=================================');
        console.log('  MongoDB CRUD API Server');
        console.log('=================================');
        console.log(`Server running at http://localhost:${PORT}`);
        console.log('Endpoints:');
        console.log('  GET    /api/students');
        console.log('  GET    /api/students/:id');
        console.log('  POST   /api/students');
        console.log('  PUT    /api/students/:id');
        console.log('  DELETE /api/students/:id');
    });
});
