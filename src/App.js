import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { useField } from "./hooks";
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

  const username = useField("text");
  const pswd = useField("password");
  const resetBtn = useField("button");

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin(username.value);
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:{" "}
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChangeHandler}
          />
        </div>
        <div>
          password:{" "}
          <input
            type={pswd.type}
            value={pswd.value}
            onChange={pswd.onChangeHandler}
          />
        </div>
        <button type="submit">login</button>
        <button type={resetBtn.type} onClick={() => resetBtn.clear}>
          reset
        </button>
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
