require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'bookstore_db';
const PORT = process.env.PORT || 3000;

let db;

async function connectToMongo() {
    try {
        const client = await MongoClient.connect(url);
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        
        const collections = await db.listCollections({ name: 'books' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('books');
            console.log('Books collection created');
            
            await insertSampleBooks();
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

async function insertSampleBooks() {
    const sampleBooks = [
        { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.5, year: 2023 },
        { title: "Python for Beginners", author: "Sarah Johnson", category: "Programming", price: 380, rating: 4.2, year: 2022 },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", price: 250, rating: 4.8, year: 1925 },
        { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", price: 280, rating: 4.9, year: 1960 },
        { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 550, rating: 4.7, year: 1988 },
        { title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", price: 480, rating: 4.6, year: 1976 },
        { title: "Clean Code", author: "Robert Martin", category: "Programming", price: 650, rating: 4.8, year: 2008 },
        { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", price: 320, rating: 4.9, year: 1937 },
        { title: "Sapiens", author: "Yuval Harari", category: "History", price: 520, rating: 4.7, year: 2011 },
        { title: "1984", author: "George Orwell", category: "Fiction", price: 290, rating: 4.8, year: 1949 },
        { title: "Introduction to Algorithms", author: "Thomas Cormen", category: "Programming", price: 890, rating: 4.6, year: 2009 },
        { title: "The Pragmatic Programmer", author: "David Thomas", category: "Programming", price: 580, rating: 4.7, year: 2019 },
        { title: "Cosmos", author: "Carl Sagan", category: "Science", price: 420, rating: 4.9, year: 1980 },
        { title: "The Art of War", author: "Sun Tzu", category: "History", price: 180, rating: 4.5, year: 500 },
        { title: "Thinking Fast and Slow", author: "Daniel Kahneman", category: "Psychology", price: 490, rating: 4.6, year: 2011 }
    ];
    
    await db.collection('books').insertMany(sampleBooks);
    console.log('Sample books inserted');
}

connectToMongo();

app.get('/books/search', async (req, res) => {
    try {
        const title = req.query.title;
        const books = await db.collection('books')
            .find({ title: { $regex: title, $options: 'i' } })
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

app.get('/books/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const books = await db.collection('books')
            .find({ category: { $regex: new RegExp('^' + category + '$', 'i') } })
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Filter failed' });
    }
});

app.get('/books/sort/:by', async (req, res) => {
    try {
        const sortBy = req.params.by;
        let sortOption = {};
        
        if (sortBy === 'price') {
            sortOption = { price: 1 };
        } else if (sortBy === 'rating') {
            sortOption = { rating: -1 };
        } else {
            return res.status(400).json({ error: 'Invalid sort parameter' });
        }
        
        const books = await db.collection('books')
            .find({})
            .sort(sortOption)
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Sort failed' });
    }
});

app.get('/books/top', async (req, res) => {
    try {
        const books = await db.collection('books')
            .find({ rating: { $gte: 4 } })
            .sort({ rating: -1 })
            .limit(5)
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get top books' });
    }
});

app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        
        const books = await db.collection('books')
            .find({})
            .skip(skip)
            .limit(limit)
            .toArray();
        
        const total = await db.collection('books').countDocuments();
        
        res.json({
            books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total
        });
    } catch (error) {
        res.status(500).json({ error: 'Pagination failed' });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await db.collection('books').distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get categories' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});