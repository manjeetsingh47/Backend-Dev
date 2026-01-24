const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (command === 'read') {
    fs.readFile(arg1, 'utf8', (err, data) => {
        if (err) return console.log('Error reading file');
        console.log(data);
    });
} else if (command === 'write') {
    fs.writeFile(arg1, arg2, (err) => {
        if (err) return console.log('Error writing file');
        console.log('File written successfully');
    });
} else if (command === 'copy') {
    fs.copyFile(arg1, arg2, (err) => {
        if (err) return console.log('Error copying file');
        console.log('File copied successfully');
    });
} else if (command === 'delete') {
    fs.unlink(arg1, (err) => {
        if (err) return console.log('Error deleting file');
        console.log('File deleted successfully');
    });
} else if (command === 'list') {
    fs.readdir(arg1, (err, files) => {
        if (err) return console.log('Error reading directory');
        console.log('Directory contents:');
        files.forEach(file => console.log(file));
    });
} else {
    console.log(`
Available Commands:
 read <filename>
 write <filename> <content>
 copy <source> <destination>
 delete <filename>
 list <directory>
`);
}