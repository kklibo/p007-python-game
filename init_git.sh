#!/bin/bash

# Initialize Git repository
git init

# Add all files to Git
git add .

# Make initial commit
git commit -m "Initial commit: 3D Cube Spinner with arrow key controls"

echo ""
echo "Git repository initialized. To push to GitHub, run:"
echo "git remote add origin https://github.com/your-username/3d-cube-spinner.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "After pushing, enable GitHub Pages in your repository settings:"
echo "1. Go to Settings > Pages"
echo "2. Select 'main' branch and '/docs' folder"
echo "3. Click Save" 