let currentEditId = null;

window.onload = function() {
    loadNotes();
    updateJsonPreview();
};

function updateJsonPreview() {
    const title = document.getElementById('title').value || 'MongoDB Basics';
    const subject = document.getElementById('subject').value || 'Database';
    const desc = document.getElementById('desc').value || 'Learning MongoDB...';
    
    document.getElementById('jsonPreview').innerText = JSON.stringify({
        title: title,
        subject: subject,
        description: desc
    }, null, 2);
}

async function addNote() {
    const title = document.getElementById('title').value;
    const subject = document.getElementById('subject').value;
    const desc = document.getElementById('desc').value;
    
    if(!title || !subject || !desc) {
        alert('Hey! Fill all fields please ');
        return;
    }
    
    const noteData = { title, subject, description: desc };
    
    try {
        const res = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });
        
        if(res.ok) {
            alert('✅ Note saved to MongoDB!');
            document.getElementById('title').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('desc').value = '';
            loadNotes();
            updateJsonPreview();
        }
    } catch (err) {
        alert('❌ Error saving. Make sure server is running!');
    }
}

async function loadNotes() {
    const container = document.getElementById('notesList');
    container.innerHTML = '<div class="loading">Loading notes</div>';
    
    try {
        const res = await fetch('http://localhost:3000/notes');
        const notes = await res.json();
        displayNotes(notes);
    } catch (err) {
        container.innerHTML = '<div class="empty-state">❌ Can\'t connect to server</div>';
    }
}

function displayNotes(notes) {
    const container = document.getElementById('notesList');
    
    if(notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p> No notes yet</p>
                <small>Add your first note above!</small>
            </div>
        `;
        return;
    }
    
    let html = '<div class="notes-grid">';
    
    notes.forEach(note => {
        html += `
            <div class="note-item">
                <div class="note-title">${note.title}</div>
                <div class="note-subject">${note.subject}</div>
                <div class="note-desc">${note.description}</div>
                <div class="note-meta">
                    <span> ${note.created_date}</span>
                    <span class="note-id"> ${note._id.slice(-6)}</span>
                </div>
                <div class="note-actions">
                    <button class="btn btn-warning" onclick="openEditModal('${note._id}', '${note.title}', '${note.description}')">✏️ Edit</button>
                    <button class="btn btn-danger" onclick="deleteNote('${note._id}')">🗑️ Delete</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Edit note
function openEditModal(id, title, desc) {
    currentEditId = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editDesc').value = desc;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditId = null;
}

async function updateNote() {
    const title = document.getElementById('editTitle').value;
    const desc = document.getElementById('editDesc').value;
    
    if(!title || !desc) {
        alert('Title and description needed!');
        return;
    }
    
    try {
        const res = await fetch(`http://localhost:3000/notes/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description: desc })
        });
        
        if(res.ok) {
            alert('✅ Note updated!');
            closeModal();
            loadNotes();
        }
    } catch (err) {
        alert('❌ Update failed');
    }
}

async function deleteNote(id) {
    if(confirm('Delete this note? 🤔')) {
        try {
            const res = await fetch(`http://localhost:3000/notes/${id}`, {
                method: 'DELETE'
            });
            
            if(res.ok) {
                alert('✅ Note deleted!');
                loadNotes();
            }
        } catch (err) {
            alert('❌ Delete failed');
        }
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if(event.target == modal) {
        closeModal();
    }
};