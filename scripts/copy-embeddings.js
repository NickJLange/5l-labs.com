const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../embeddings');
const destDir = path.join(__dirname, '../static/embeddings');

if (!fs.existsSync(srcDir)) {
    console.warn(`Source directory ${srcDir} does not exist. Skipping copy.`);
    process.exit(0);
}

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        if (entry.name === '.git') continue;

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath);
            }
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    copyDir(srcDir, destDir);
    console.log('Embeddings copied successfully.');
} catch (error) {
    console.error('Error copying embeddings:', error);
    process.exit(1);
}
