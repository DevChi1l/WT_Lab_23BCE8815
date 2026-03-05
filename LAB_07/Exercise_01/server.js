require('dotenv').config();

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'student_notes_db';
const PORT = process.env.PORT || 3000;

console.log(' Configuration:');
console.log('- MongoDB URL:', url);
console.log('- Database:', dbName);
console.log('- Port:', PORT);

let db;

async function connectToMongo() {
    try {
        const client = await MongoClient.connect(url);
        db = client.db(dbName);
        console.log('✅ Connected to MongoDB successfully!');
        
        const collections = await db.listCollections({ name: 'notes' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('notes');
            console.log('✅ Notes collection created');
        } else {
            console.log('✅ Notes collection already exists');
        }
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('💡 Make sure MongoDB is running!');
        process.exit(1);
    }
}

connectToMongo();

app.get('/notes', async (req, res) => {
    try {
        const notes = await db.collection('notes')
            .find({})
            .sort({ created_date: -1 })
            .toArray();
        
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

app.post('/notes', async (req, res) => {
    try {
        const { title, subject, description } = req.body;
        
        if (!title || !subject || !description) {
            return res.status(400).json({ 
                error: 'Title, subject, and description are required' 
            });
        }
        
        const newNote = {
            title,
            subject,
            description,
            created_date: new Date().toISOString().split('T')[0]
        };
        
        const result = await db.collection('notes').insertOne(newNote);
        
        res.status(201).json({
            _id: result.insertedId,
            ...newNote
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

app.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ 
                error: 'Title and description are required' 
            });
        }
        
        const result = await db.collection('notes').updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description } }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        res.json({ message: 'Note updated successfully' });
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await db.collection('notes').deleteOne({
            _id: new ObjectId(id)
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        res.json({ message: 'Note deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
    console.log(` Open this URL in your browser: http://localhost:${PORT}`);
});