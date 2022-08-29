const express = require("express");
const path = require("path");

const App = express();
App.use(express.static("build"));

const notes = [
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
];

App.get("/api/notes", async (request, response) => {
  response.json(notes);
});
// sends index.html
App.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

App.listen(3001, () => {
  console.log(`Server running on port 3001`);
});