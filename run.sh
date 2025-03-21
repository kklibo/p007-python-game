#!/bin/bash

# Check if virtual environment exists, if not create one
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip3 install -r requirements.txt

# Run the Flask application
echo "Starting the Flask application..."
python3 app.py 