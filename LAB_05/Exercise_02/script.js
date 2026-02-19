document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('bookForm');
    const bookId = document.getElementById('bookId');
    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookStatus = document.getElementById('bookStatus');
    const messageDiv = document.getElementById('message');
    const booksTableBody = document.getElementById('booksTableBody');
    
    let xmlDoc = null;
    
    function showMessage(text, isError) {
        messageDiv.textContent = text;
        messageDiv.style.color = isError ? 'red' : 'green';
        setTimeout(() => messageDiv.textContent = '', 3000);
    }
    
    function loadBooks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'books.xml', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;
                displayBooks();
            } else {
                booksTableBody.innerHTML = '<tr><td colspan="5">Failed to load</td></tr>';
            }
        };
        
        xhr.send();
    }
    
    function displayBooks() {
        const books = xmlDoc.getElementsByTagName('book');
        
        if (books.length === 0) {
            booksTableBody.innerHTML = '<tr><td colspan="5">No books</td></tr>';
            return;
        }
        
        let html = '';
        for (let i = 0; i < books.length; i++) {
            const id = books[i].getElementsByTagName('id')[0].textContent;
            const title = books[i].getElementsByTagName('title')[0].textContent;
            const author = books[i].getElementsByTagName('author')[0].textContent;
            const status = books[i].getElementsByTagName('status')[0].textContent;
            
            html += `
                <tr>
                    <td>${id}</td>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>${status}</td>
                    <td>
                        <button onclick="toggleStatus(${i})">Toggle</button>
                        <button onclick="deleteBook(${i})">Delete</button>
                    </td>
                </tr>
            `;
        }
        booksTableBody.innerHTML = html;
    }
    
    window.toggleStatus = function(index) {
        const books = xmlDoc.getElementsByTagName('book');
        const statusNode = books[index].getElementsByTagName('status')[0];
        
        statusNode.textContent = statusNode.textContent === 'Available' ? 'Checked Out' : 'Available';
        displayBooks();
        showMessage('Status updated', false);
    };
    
    window.deleteBook = function(index) {
        if (!confirm('Delete this book?')) return;
        
        const books = xmlDoc.getElementsByTagName('book');
        books[index].parentNode.removeChild(books[index]);
        displayBooks();
        showMessage('Book deleted', false);
    };
    
    function bookIdExists(id) {
        const books = xmlDoc.getElementsByTagName('book');
        for (let i = 0; i < books.length; i++) {
            if (books[i].getElementsByTagName('id')[0].textContent === id) {
                return true;
            }
        }
        return false;
    }
    
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!bookId.value || !bookTitle.value || !bookAuthor.value || !bookStatus.value) {
            showMessage('All fields required', true);
            return;
        }
        
        if (bookIdExists(bookId.value)) {
            showMessage('ID already exists', true);
            return;
        }
        
        const booksNode = xmlDoc.getElementsByTagName('books')[0];
        const newBook = xmlDoc.createElement('book');
        
        const idNode = xmlDoc.createElement('id');
        idNode.textContent = bookId.value;
        newBook.appendChild(idNode);
        
        const titleNode = xmlDoc.createElement('title');
        titleNode.textContent = bookTitle.value;
        newBook.appendChild(titleNode);
        
        const authorNode = xmlDoc.createElement('author');
        authorNode.textContent = bookAuthor.value;
        newBook.appendChild(authorNode);
        
        const statusNode = xmlDoc.createElement('status');
        statusNode.textContent = bookStatus.value;
        newBook.appendChild(statusNode);
        
        booksNode.appendChild(newBook);
        displayBooks();
        showMessage('Book added', false);
        bookForm.reset();
    });
    
    loadBooks();
});