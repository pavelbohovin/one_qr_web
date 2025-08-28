#!/usr/bin/env python3
"""
Simple HTTP server for One QR PWA development
"""

import http.server
import socketserver
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for PWA development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 One QR PWA Development Server")
        print(f"📱 Server running at: http://localhost:{PORT}")
        print(f"📋 PWA will be available at: http://localhost:{PORT}")
        print(f"🔄 Press Ctrl+C to stop the server")
        print(f"📁 Serving files from: {os.getcwd()}")
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
            sys.exit(0)

if __name__ == "__main__":
    main()

