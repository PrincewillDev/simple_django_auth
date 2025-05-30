#!/usr/bin/env python3
"""
Simple HTTP Server for the frontend
"""
import http.server
import socketserver

PORT = 3000
DIRECTORY = '.'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving frontend at http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server() 