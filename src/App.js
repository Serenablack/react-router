import { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </div>
);

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content} </Link>
            </td>
            <td>{note.user}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
const Note = ({ note }) => {
  console.log(note);
  // const id = useParams().id;
  // const note = notes.find((n) => n.id === Number(id));
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

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("Sandhya");
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

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

  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <div className="container">
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
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}

        <Routes>
          <Route path="/notes/:id" element={<Note note={note} />} />

          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={login} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
