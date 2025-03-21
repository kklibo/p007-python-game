#!/bin/bash

# Initialize Git repository
git init

# Add all files to Git
git add .

# Make initial commit
git commit -m "Initial commit: 3D Cube Spinner with arrow key controls"

echo ""
echo "Git repository initialized. To deploy to GitHub Pages:"
echo ""
echo "1. Create a repository on GitHub (e.g., 3d-cube-spinner)"
echo ""
echo "2. Add your remote and push:"
echo "   git remote add origin https://github.com/your-username/3d-cube-spinner.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages in your repository settings:"
echo "   - Go to Settings > Pages"
echo "   - Under 'Source', select 'Deploy from a branch'"
echo "   - Select the 'main' branch and the '/docs' folder"
echo "   - Click 'Save'"
echo ""
echo "4. Alternatively, GitHub Actions will deploy automatically using the"
echo "   workflow defined in .github/workflows/pages.yml"
echo ""
echo "5. Your site will be available at:"
echo "   https://your-username.github.io/3d-cube-spinner/" 