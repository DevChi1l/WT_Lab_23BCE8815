const fs = require('fs');

const fileName = 'sample.txt';

function createFile() {
    console.log('\n--- Step 1: Creating a new file ---');
    fs.writeFile(fileName, 'Hello! This is the initial content of the file.\n', (err) => {
        if (err) {
            console.error('Error creating file:', err.message);
            return;
        }
        console.log(`File "${fileName}" created successfully.`);
        readFile();
    });
}

function readFile() {
    console.log('\n--- Step 2: Reading the file ---');
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return;
        }
        console.log('File contents:');
        console.log(data);
        appendToFile();
    });
}

function appendToFile() {
    console.log('\n--- Step 3: Appending data to the file ---');
    fs.appendFile(fileName, 'This line was appended to the file.\n', (err) => {
        if (err) {
            console.error('Error appending to file:', err.message);
            return;
        }
        console.log('Data appended successfully.');
        readAfterAppend();
    });
}

function readAfterAppend() {
    console.log('\n--- Step 4: Reading file after append ---');
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return;
        }
        console.log('Updated file contents:');
        console.log(data);
        deleteFile();
    });
}

function deleteFile() {
    console.log('\n--- Step 5: Deleting the file ---');
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error('Error deleting file:', err.message);
            return;
        }
        console.log(`File "${fileName}" deleted successfully.`);
        console.log('\n=== All file operations completed successfully! ===');
    });
}

console.log('=== Node.js File Operations Demo ===');
createFile();
