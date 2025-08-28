class OneQRApp {
    constructor() {
        this.storageKey = 'oneqr_image';
        this.imageContainer = document.getElementById('imageContainer');
        this.displayImage = document.getElementById('displayImage');
        this.placeholder = document.getElementById('placeholder');
        this.fileInput = document.getElementById('fileInput');
        this.binIcon = document.getElementById('binIcon');
        this.tapIcon = document.getElementById('tapIcon');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadStoredImage();
        this.checkPWAInstall();
    }
    
    bindEvents() {
        // File selection - click anywhere on the container (only when no image)
        this.imageContainer.addEventListener('click', () => {
            if (this.displayImage.style.display === 'none') {
                this.fileInput.click();
            }
        });
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Bin icon click
        this.binIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering image container click
            this.clearImage();
        });
        
        // Tap icon click
        this.tapIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering image container click
            this.fileInput.click();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearImage();
            }
        });
        
        // PWA install events
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
    }
    
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        
        this.loadImage(file);
    }
    
    loadImage(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imageData = e.target.result;
            this.saveToStorage(imageData);
            this.displayImageData(imageData);
        };
        
        reader.readAsDataURL(file);
    }
    
    saveToStorage(imageData) {
        try {
            localStorage.setItem(this.storageKey, imageData);
        } catch (error) {
            console.error('Failed to save image to localStorage:', error);
            // If localStorage is full, try to compress the image
            this.compressAndSaveImage(imageData);
        }
    }
    
    compressAndSaveImage(imageData) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions (max 800px)
            const maxSize = 800;
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            const compressedData = canvas.toDataURL('image/jpeg', 0.8);
            localStorage.setItem(this.storageKey, compressedData);
        };
        img.src = imageData;
    }
    
    loadStoredImage() {
        const storedImage = localStorage.getItem(this.storageKey);
        if (storedImage) {
            this.displayImageData(storedImage);
        }
    }
    
    displayImageData(imageData) {
        this.displayImage.src = imageData;
        this.displayImage.style.display = 'block';
        this.placeholder.style.display = 'none';
        this.binIcon.style.display = 'flex';
        this.tapIcon.style.display = 'flex';
        
        // Preload image for faster display
        this.displayImage.onload = () => {
            this.imageContainer.classList.remove('loading');
        };
        
        this.imageContainer.classList.add('loading');
    }
    
    clearImage() {
        localStorage.removeItem(this.storageKey);
        this.displayImage.style.display = 'none';
        this.placeholder.style.display = 'block';
        this.binIcon.style.display = 'none';
        this.tapIcon.style.display = 'none';
        this.fileInput.value = '';
        this.imageContainer.classList.remove('loading');
    }
    
    checkPWAInstall() {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App is running in standalone mode');
        }
    }
    
    showInstallPrompt() {
        // Remove existing prompt
        const existingPrompt = document.querySelector('.install-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }
        
        const prompt = document.createElement('div');
        prompt.className = 'install-prompt';
        prompt.innerHTML = `
            <span>Install One QR for faster access</span>
            <button onclick="app.installPWA()">Install</button>
            <button onclick="app.dismissInstallPrompt()" style="background: #6b7280;">Dismiss</button>
        `;
        
        document.body.appendChild(prompt);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (prompt.parentNode) {
                prompt.remove();
            }
        }, 10000);
    }
    
    async installPWA() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('PWA installed successfully');
        }
        
        this.deferredPrompt = null;
        this.dismissInstallPrompt();
    }
    
    dismissInstallPrompt() {
        const prompt = document.querySelector('.install-prompt');
        if (prompt) {
            prompt.remove();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new OneQRApp();
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('App is online');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});

