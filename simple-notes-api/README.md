# Simple Notes API

A very simple backend project built with Node.js and Express.
It lets you create, view, and delete notes using a REST API.

Notes are stored in memory (a JavaScript array), so they will reset
every time the server restarts. This project doesn't use a database,
which keeps it easy to read and run.

## Tech Stack

- Node.js
- Express

## Getting Started

1. Clone the repo
   ```
   git clone <your-repo-url>
   cd simple-notes-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the server
   ```
   npm start
   ```

4. The server will run at `http://localhost:3000`

## API Endpoints

| Method | Endpoint      | Description            |
|--------|---------------|-------------------------|
| GET    | /notes        | Get all notes           |
| GET    | /notes/:id    | Get a single note by id |
| POST   | /notes        | Create a new note       |
| DELETE | /notes/:id    | Delete a note by id     |

### Example: Create a note

```
POST /notes
Content-Type: application/json

{
  "title": "Grocery List",
  "content": "Milk, eggs, bread"
}
```

### Example response

```json
{
  "id": 1,
  "title": "Grocery List",
  "content": "Milk, eggs, bread",
  "createdAt": "2026-07-09T10:00:00.000Z"
}
```

## Possible Improvements

- Add a database (like MongoDB or SQLite) so notes are saved permanently
- Add editing (PUT) for notes
- Add user accounts so each person has their own notes
