import { useEffect, useState } from "react";
import React from "react";

const NoteApp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (!title.trim() || !content.trim()) return;

    setNotes(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        content,
        isEditing: false,
      }
    ]);

    setTitle("");
    setContent("");
  }

  function editNote(id) {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, isEditing: true }
        : note
    ));
  }

  function saveEdit(id, newTitle, newContent) {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, title: newTitle, content: newContent, isEditing: false }
        : note
    ));
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Notes App</h1>
      <hr />

      <input
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <textarea
        style={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write here"
      />
      <button style={styles.button} onClick={addNote}>Add Note</button>
      <hr />

      {notes.map(note => (
        <div key={note.id} style={styles.noteCard}>
          {note.isEditing ? (
            <>
              <input
                style={styles.input}
                value={note.title}
                onChange={(e) =>
                  setNotes(notes.map(n =>
                    n.id === note.id ? { ...n, title: e.target.value } : n
                  ))
                }
              />
              <textarea
                style={styles.textarea}
                value={note.content}
                onChange={(e) =>
                  setNotes(notes.map(n =>
                    n.id === note.id ? { ...n, content: e.target.value } : n
                  ))
                }
              />
              <button style={styles.button} onClick={() => saveEdit(note.id, note.title, note.content)}>
                Save
              </button>
            </>
          ) : (
            <>
              <h3 style={styles.noteTitle}>{note.title}</h3>
              <p style={styles.noteContent}>{note.content}</p>
              <button style={styles.button} onClick={() => editNote(note.id)}>Edit</button>
              <button style={{ ...styles.button, backgroundColor: "#dc3545" }} onClick={() => deleteNote(note.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
      minHeight: "80px",
    },
    button: {
      padding: "8px 14px",
      marginRight: "8px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "14px",
    },
    noteCard: {
      backgroundColor: "#fff",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "6px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    noteTitle: {
      margin: "0 0 5px 0",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#222",
    },
    noteContent: {
      margin: "0 0 10px 0",
      fontSize: "14px",
      color: "#555",
    },
  };

export default NoteApp;
