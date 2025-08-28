# One QR - Fast Image Display PWA

A simple, fast Progressive Web App (PWA) for displaying one image from localStorage. Perfect for quickly showing QR codes or other images with instant access.

## Features

- ⚡ **Ultra-fast loading** - Optimized for speed
- 📱 **PWA ready** - Install on home screen
- 🔄 **Offline support** - Works without internet
- 💾 **localStorage** - Images persist between sessions
- 🎯 **One-click access** - Perfect for QR codes
- 📐 **Responsive design** - Works on all devices

## How to Use

1. **Open the app** in your browser
2. **Select an image** by clicking the "Select Image" button or tapping the image area
3. **The image is saved** to localStorage and displayed immediately
4. **Install as PWA** when prompted for faster access
5. **Access instantly** - Your image loads immediately on app launch

## Setup

### For Development

1. Clone or download the files
2. Serve the files using a local server (required for PWA functionality):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

### For Production

1. Upload all files to your web server
2. Ensure HTTPS is enabled (required for PWA installation)
3. Replace the placeholder icons (`icon-192.png`, `icon-512.png`) with your own

## File Structure

```
one_qr_web/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js             # JavaScript application logic
├── manifest.json      # PWA manifest
├── sw.js             # Service worker for offline support
├── icon-192.png      # PWA icon (192x192)
├── icon-512.png      # PWA icon (512x512)
└── README.md         # This file
```

## PWA Features

- **Installable** - Add to home screen
- **Offline support** - Works without internet
- **Fast loading** - Cached resources
- **Standalone mode** - Runs like a native app

## Browser Support

- Chrome/Edge (full PWA support)
- Firefox (full PWA support)
- Safari (limited PWA support)
- Mobile browsers (full PWA support)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### App Name
Update the title and manifest in:
- `index.html` - `<title>` tag
- `manifest.json` - `name` and `short_name`

### Icons
Replace the icon files with your own:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

## Technical Details

- **Storage**: Uses localStorage for image persistence
- **Compression**: Automatically compresses large images
- **Caching**: Service worker caches all app resources
- **Performance**: Optimized for instant image display

## License

This project is open source and available under the MIT License.

