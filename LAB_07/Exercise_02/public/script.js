let currentPage = 1;
let totalPages = 1;
let currentFilters = {};

window.onload = function() {
    loadBooks();
    loadCategories();
};

async function loadBooks(page = 1) {
    currentPage = page;
    const container = document.getElementById('booksContainer');
    container.innerHTML = '<div class="loading">Loading books...</div>';
    
    try {
        const res = await fetch(`http://localhost:3000/books?page=${page}`);
        const data = await res.json();
        
        displayBooks(data.books);
        totalPages = data.totalPages;
        updatePagination();
    } catch (err) {
        container.innerHTML = '<div class="no-books">Error loading books</div>';
    }
}

async function searchBooks() {
    const title = document.getElementById('searchInput').value;
    
    if(!title) {
        loadBooks();
        return;
    }
    
    const container = document.getElementById('booksContainer');
    container.innerHTML = '<div class="loading">Searching...</div>';
    
    try {
        const res = await fetch(`http://localhost:3000/books/search?title=${title}`);
        const books = await res.json();
        displayBooks(books);
        document.getElementById('pagination').innerHTML = '';
    } catch (err) {
        container.innerHTML = '<div class="no-books">Search failed</div>';
    }
}

async function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    
    if(!category) {
        loadBooks();
        return;
    }
    
    const container = document.getElementById('booksContainer');
    container.innerHTML = '<div class="loading">Filtering...</div>';
    
    try {
        const res = await fetch(`http://localhost:3000/books/category/${category}`);
        const books = await res.json();
        displayBooks(books);
        document.getElementById('pagination').innerHTML = '';
    } catch (err) {
        container.innerHTML = '<div class="no-books">Filter failed</div>';
    }
}

async function sortBooks() {
    const sortBy = document.getElementById('sortFilter').value;
    
    if(!sortBy) {
        loadBooks();
        return;
    }
    
    const container = document.getElementById('booksContainer');
    container.innerHTML = '<div class="loading">Sorting...</div>';
    
    try {
        const res = await fetch(`http://localhost:3000/books/sort/${sortBy}`);
        const books = await res.json();
        displayBooks(books);
        document.getElementById('pagination').innerHTML = '';
    } catch (err) {
        container.innerHTML = '<div class="no-books">Sort failed</div>';
    }
}

async function loadTopRated() {
    const container = document.getElementById('booksContainer');
    container.innerHTML = '<div class="loading">Loading top rated...</div>';
    
    try {
        const res = await fetch('http://localhost:3000/books/top');
        const books = await res.json();
        displayBooks(books);
        document.getElementById('pagination').innerHTML = '';
    } catch (err) {
        container.innerHTML = '<div class="no-books">Failed to load top books</div>';
    }
}

async function loadCategories() {
    try {
        const res = await fetch('http://localhost:3000/categories');
        const categories = await res.json();
        
        const select = document.getElementById('categoryFilter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    } catch (err) {
        console.log('Failed to load categories');
    }
}

function displayBooks(books) {
    const container = document.getElementById('booksContainer');
    
    if(books.length === 0) {
        container.innerHTML = '<div class="no-books">No books found</div>';
        return;
    }
    
    let html = '<div class="books-grid">';
    
    books.forEach(book => {
        html += `
            <div class="book-card">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-category">${book.category}</div>
                <div class="book-details">
                    <span class="book-price">₹${book.price}</span>
                    <span class="book-rating">★ ${book.rating}</span>
                </div>
                <div class="book-year">Published: ${book.year}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    let html = '';
    
    for(let i = 1; i <= totalPages; i++) {
        html += `<button onclick="loadBooks(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
    }
    
    pagination.innerHTML = html;
}

document.getElementById('categoryFilter').addEventListener('change', filterByCategory);
document.getElementById('sortFilter').addEventListener('change', sortBooks);