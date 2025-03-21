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
    <title>3D Cube Spinner</title>
    <link rel="stylesheet" href="static/css/style.css">
</head>
<body>
    <div id="info">Use arrow keys to rotate the cube</div>
    <div id="cube-container"></div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="static/js/cube.js"></script>
</body>
</html>''')

print(f"Static files generated in '{docs_dir}' directory. Ready for GitHub Pages deployment.") 