# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Candela-Agent** is a Flask-based personal AI assistant (like Jarvis from Iron Man) that serves as a unified command center for:
- AI-powered chat (Google Gemini integration)
- Notes management
- Task/todo tracking
- Trading journal
- Excalidraw file organization (planned)

## Running the App

```bash
cd /home/adityarajput/Documents/Projects/Ai-Agent
python app.py
```

The app runs in debug mode on localhost:5000 by default.

## Architecture

- **Backend**: Flask with Flask-CORS
- **AI Integration**: Google Gemini API (`gemini-2.5-flash` model)
- **Frontend**: Vanilla HTML/CSS/JS templates
- **Database**: SQLite (`notes.db`, `tasks.db`)

### Routes
- `POST /chat` - AI chat endpoint (expects `{"message": "..."}`)

### Template Structure
- `templates/index.html` - Main homepage
- `templates/notes.html` - Notes page
- `templates/todos.html` - Todo list page

### Static Assets
- `static/css/style.css` - Main stylesheet
- `static/css/backgroung.jpg` - Background image
- `static/js/clock.js` - Clock widget
- `static/js/task.js` - Task functionality

## Important Notes

- The Google Gemini API key is loaded from `.env` via `GEMINI_API_KEY` environment variable
- This is a personal project being built incrementally — the "vibe" and UI experience are priorities
- Project vision is stored in memory: [[candela-agent-vision]]