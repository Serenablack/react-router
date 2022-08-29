import { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
const Home = () => (
  <div>
    <h2>TKTL notes app</h2>{" "}
  </div>
);

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);
const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>Notes</h2>
      <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div>
          <strong>{note.important ? "important" : ""}</strong>
        </div>
      </div>
    </div>
  );
};

const Users = () => (
  <div>
    <h2>Users</h2>{" "}
  </div>
);

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const padding = {
    padding: 5,
  };
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <Routes>
          <Route path="/notes/:id" element={<Note notes={notes} />} />

          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
