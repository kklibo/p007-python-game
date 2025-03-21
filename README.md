# 3D Spaceship Game

A web application written in Python (Flask) that displays a 3D spaceship in a circular arena that can be controlled using arrow keys.

## Live Demo

Visit the [GitHub Pages Demo](https://kklibo.github.io/p007-python-game/).

## Features

- Interactive 3D spaceship rendered with Three.js
- Third-person chase camera perspective
- Circular arena with boundaries
- Realistic physics with velocity and friction
- Arrow key controls for spaceship movement:
  - ↑ Arrow Up: Move forward
  - ↓ Arrow Down: Brake/reverse
  - ← Arrow Left: Rotate left
  - → Arrow Right: Rotate right

## Local Development

### Prerequisites

- Python 3.6 or higher
- pip3 (Python package installer)

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/kklibo/p007-python-game.git
   cd p007-python-game
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip3 install -r requirements.txt
   ```

4. Run the application:
   ```
   python3 app.py
   ```

5. Open your browser and navigate to `http://127.0.0.1:5000`

## GitHub Pages Deployment

This project is set up to be hosted on GitHub Pages. The static content is served directly from the `/docs` directory.

### Deployment Steps

1. Generate the static files (this is already done, the files are in the `/docs` directory):
   ```
   ./generate_static.py
   ```

2. Push the code to GitHub:
   ```
   # If you haven't set up git yet
   ./init_git.sh
   
   # Then add your remote and push
   git remote add origin https://github.com/kklibo/p007-python-game.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages in your repository settings:
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select the "main" branch and the "/docs" folder
   - Click "Save"
   - Wait a few minutes for GitHub to deploy your site

4. Your site will be available at `https://kklibo.github.io/p007-python-game/`

### Troubleshooting GitHub Pages

If your deployment is not working:

1. Check that your repository contains the `/docs` directory with all the static files
2. Ensure the `.nojekyll` file exists in the `/docs` directory
3. Verify that GitHub Pages is enabled in your repository settings
4. Check the GitHub Pages build logs for any errors

## License

MIT 