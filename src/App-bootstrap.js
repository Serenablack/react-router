import { useState } from "react";
import { Button, Form, Table, Alert, Nav, Navbar } from "react-bootstrap";
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
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
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

  const username = useField("text");
  const pswd = useField("password");
  const resetBtn = () => {
    username.clear();
    pswd.clear();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin(username.value);
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      {/* <form onSubmit={onSubmit}>
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
      </form> */}
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type={username.type}
            value={username.value}
            onChange={username.onChangeHandler}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type={pswd.type}
            value={pswd.value}
            onChange={pswd.onChangeHandler}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
      <button onClick={() => resetBtn()}>reset</button>
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
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
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
      <div className="container">
        {message && <Alert variant="success">{message}</Alert>}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/notes">
                  notes
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? (
                  <em style={padding}>{user} logged in</em>
                ) : (
                  <Link style={padding} to="/login">
                    login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
