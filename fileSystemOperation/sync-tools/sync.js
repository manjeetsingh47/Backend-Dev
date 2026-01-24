const fs = require('fs');
const path = require('path');

const sourceDir = './source';
const targetDir = './target';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Error reading source directory');
        return;
    }

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        fs.stat(sourcePath, (err, sourceStat) => {
            if (err) return console.error('Error accessing source file');
            fs.stat(targetPath, (err, targetStat) => {
                if (err) {
                    fs.copyFile(sourcePath, targetPath, err => {
                        if (err) return console.error('Error copying file');
                        console.log(`Copied: ${file}`);
                    });
                } else if (sourceStat.mtime > targetStat.mtime) {
                    fs.copyFile(sourcePath, targetPath, err => {
                        if (err) return console.error('Error updating file');
                        console.log(`Updated: ${file}`);
                    });
                }
            });
        });
    });
});