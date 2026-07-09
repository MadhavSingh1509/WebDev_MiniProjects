const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Notes are stored in memory. They will reset every time the server restarts.
let notes = [];
let nextId = 1;

// Home route - just to check the server is running
app.get("/", (req, res) => {
  res.send("Notes API is running. Try /notes to see all notes.");
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Get a single note by id
app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(note);
});

// Create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete a note by id
app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
