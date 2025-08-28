const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // QR code icon
    ctx.fillStyle = 'white';
    const iconSize = size * 0.6;
    const iconX = (size - iconSize) / 2;
    const iconY = (size - iconSize) / 2;
    
    // Draw a simple QR-like pattern
    const blockSize = iconSize / 8;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0 || (i < 3 && j < 3) || (i < 3 && j >= 5) || (i >= 5 && j < 3)) {
                ctx.fillRect(iconX + i * blockSize, iconY + j * blockSize, blockSize, blockSize);
            }
        }
    }
    
    return canvas.toBuffer('image/png');
}

// Create icons
[192, 512].forEach(size => {
    const buffer = createIcon(size);
    fs.writeFileSync(`icon-${size}.png`, buffer);
    console.log(`Created icon-${size}.png`);
});

console.log('All icons created successfully!');

