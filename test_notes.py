import pytest
import os
import sqlite3
from app import app


@pytest.fixture
def client():
    """Test client for the Flask app."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def test_db():
    """Create a test database."""
    # Use a test database file
    test_db_path = 'test_notes.db'
    if os.path.exists(test_db_path):
        os.remove(test_db_path)

    conn = sqlite3.connect(test_db_path)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS notes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  content TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

    yield test_db_path

    # Cleanup
    if os.path.exists(test_db_path):
        os.remove(test_db_path)


class TestNotesAPI:
    """Tests for notes API endpoints."""

    def test_notes_page_loads(self, client):
        """Test that the notes page loads successfully."""
        response = client.get('/notes')
        assert response.status_code == 200
        assert b'My Notes' in response.data

    def test_get_notes_empty(self, client):
        """Test getting notes when database is empty."""
        response = client.get('/api/notes')
        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, list)

    def test_add_note(self, client):
        """Test adding a note."""
        response = client.post('/api/notes',
                               json={'content': 'Test note'},
                               content_type='application/json')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True

    def test_add_note_with_content(self, client):
        """Test that note is actually saved."""
        # Add a note
        client.post('/api/notes',
                    json={'content': 'My first note'},
                    content_type='application/json')

        # Get notes
        response = client.get('/api/notes')
        data = response.get_json()

        assert len(data) >= 1
        assert any(note['content'] == 'My first note' for note in data)

    def test_add_empty_note_fails(self, client):
        """Test that adding empty note fails."""
        response = client.post('/api/notes',
                               json={'content': ''},
                               content_type='application/json')
        assert response.status_code == 400

    def test_delete_note(self, client):
        """Test deleting a note."""
        # Add a note first
        client.post('/api/notes',
                    json={'content': 'Note to delete'},
                    content_type='application/json')

        # Get notes to find the id
        response = client.get('/api/notes')
        notes = response.get_json()
        note_id = notes[0]['id']

        # Delete the note
        response = client.delete(f'/api/notes/{note_id}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True

    def test_notes_persist_after_refresh(self, client):
        """Test that notes persist - add, then get again."""
        # Add multiple notes
        client.post('/api/notes', json={'content': 'Note 1'}, content_type='application/json')
        client.post('/api/notes', json={'content': 'Note 2'}, content_type='application/json')

        # Get notes
        response = client.get('/api/notes')
        notes = response.get_json()

        assert len(notes) >= 2

    def test_home_page_has_notes_button(self, client):
        """Test that home page has Notes button."""
        response = client.get('/')
        assert response.status_code == 200
        assert b'Notes' in response.data
        assert b'href="/notes"' in response.data


class TestNotesDatabase:
    """Tests for notes database functionality."""

    def test_notes_table_exists(self):
        """Test that notes table is created."""
        conn = sqlite3.connect('notes.db')
        c = conn.cursor()
        c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='notes'")
        result = c.fetchone()
        conn.close()
        assert result is not None

    def test_notes_have_required_columns(self):
        """Test that notes table has required columns."""
        conn = sqlite3.connect('notes.db')
        c = conn.cursor()
        c.execute("PRAGMA table_info(notes)")
        columns = [row[1] for row in c.fetchall()]
        conn.close()
        assert 'id' in columns
        assert 'content' in columns
        assert 'created_at' in columns