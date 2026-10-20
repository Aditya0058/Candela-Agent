#!/bin/bash

echo "Starting Candela-Agent-MVP Initialization"

# check required tools
echo "Checking prerequisites"
if ! command -v git &> /dev/null; then echo "////// Bruhhh!, Git is not installed."; exit 1; fi
if ! command -v python3 &> /dev/null; then echo "////// Bruhhh!, Python3 is not installed."; exit 1; fi
if ! command -v git &> /dev/null; then echo "////// Bruhhhh!, Node.js/NPM is not installed."; exit 1; fi

echo ":) :) Huurayyyy! Prerequisites met!"

if [ ! -d "Candela-Agent" ]; then
    echo "Wait bro Downloading Candela..."
    git clone https://github.com/Aditya0058/Candela-Agent-MVP.git
    cd Candela-Agent
else
    echo "you r smart Candela directory already exists! Updating..."
    cd Candela-Agent
    git pull
fi

# backend
echo "Cloning completed"
echo " "
echo "Setting up Backend._._._._._"
cd Backend
echo "for ur security i am using virtual environments"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# database initialization if not exists
if [ ! -f "candela.db" ]; then
    echo "hehhehehehe - Initializing database..."
    python init_db.py
fi
cd ..

echo "Backend done"
echo " "

# frontend
echo "now setting up frontend"
cd Frontend
npm install
cd ..

echo "Installation completed"
echo " "
echo "Let me start it for you, Launching Candela (remember MVP)"
# start.py running
python3 start.py

