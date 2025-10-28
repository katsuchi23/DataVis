#!/usr/bin/env python3
"""
Simple HTTP server to serve the data visualization website
Run this script to view the website locally
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent  # Serve from root directory for GitHub Pages compatibility

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    """Start the web server"""
    os.chdir(Path(__file__).parent)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"🌍 World Happiness Data Visualization Server")
        print("=" * 60)
        print(f"📊 Server running at: {url}")
        print(f"📁 Serving files from: {DIRECTORY}")
        print("\n✨ Opening browser automatically...")
        print("\n💡 Press Ctrl+C to stop the server")
        print("=" * 60)
        
        # Open the browser
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thanks for exploring the data!")

if __name__ == "__main__":
    main()
