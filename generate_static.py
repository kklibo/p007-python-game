#!/usr/bin/env python3
import os
import shutil

# Define the static output directory for GitHub Pages
docs_dir = 'docs'

# Create docs directory if it doesn't exist
if os.path.exists(docs_dir):
    shutil.rmtree(docs_dir)
os.makedirs(docs_dir)

# Copy static assets (CSS and JS)
os.makedirs(f'{docs_dir}/static/css', exist_ok=True)
os.makedirs(f'{docs_dir}/static/js', exist_ok=True)

# Copy CSS
shutil.copy2('static/css/style.css', f'{docs_dir}/static/css/style.css')

# Copy JS
shutil.copy2('static/js/cube.js', f'{docs_dir}/static/js/cube.js')

# Create index.html with absolute paths (no Flask URL helpers)
with open(f'{docs_dir}/index.html', 'w') as f:
    f.write('''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="3D Spaceship Game - Control a spaceship in a circular arena using arrow keys">
    <meta name="author" content="kklibo">
    <title>3D Spaceship Game</title>
    <link rel="stylesheet" href="static/css/style.css">
</head>
<body>
    <div id="info">Use arrow keys to control the spaceship<br>↑ Forward | ↓ Brake | ← Left | → Right</div>
    <div id="cube-container"></div>
    <div id="footer">
        <a href="https://github.com/kklibo/p007-python-game" target="_blank">View on GitHub</a>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="static/js/cube.js"></script>
</body>
</html>''')

# Create README.md for docs directory
with open(f'{docs_dir}/README.md', 'w') as f:
    f.write('''# 3D Spaceship Game

This directory contains the static files for the 3D Spaceship Game.

The application features a 3D spaceship that can be controlled with arrow keys within a circular arena.

## How to Use

- ↑ Arrow Up: Move forward
- ↓ Arrow Down: Brake/reverse
- ← Arrow Left: Rotate left
- → Arrow Right: Rotate right

## Technologies Used

- HTML/CSS
- JavaScript
- Three.js''')

# Create 404.html for GitHub Pages
with open(f'{docs_dir}/404.html', 'w') as f:
    f.write('''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - 3D Spaceship Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #000000;
            color: #ffffff;
        }
        .container {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 20px rgba(51, 170, 255, 0.5);
            max-width: 500px;
            border: 1px solid #33aaff;
        }
        h1 {
            color: #33aaff;
            text-shadow: 0 0 5px #33aaff;
        }
        a {
            color: #ffffff;
            text-decoration: none;
            border-bottom: 1px dotted #33aaff;
        }
        a:hover {
            text-shadow: 0 0 5px #33aaff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p>Please return to the <a href="index.html">3D Spaceship Game</a>.</p>
    </div>
</body>
</html>''')

# Create .nojekyll file to disable Jekyll processing
with open(f'{docs_dir}/.nojekyll', 'w') as f:
    f.write('')

print(f"Static files generated in '{docs_dir}' directory. Ready for GitHub Pages deployment.") 