HEAD
var app = require('./app');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const express = require("express");
const server = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_NAME || "mydatabase",
});

server.use(express.json());
server.use(cors());

// Route pour ajouter un manga
server.post("/register", (req, res) => {
  const { name, type, note } = req.body;

  let sql = "INSERT INTO mangas (name, type, note) VALUES (?, ?, ?)";
  db.query(sql, [name, type, note], (err, result) => {
    if (err) {
      console.error("Insert Error: ", err);
      return res.status(500).send(err.message);
    }
    res.send(result);
  });
});

// Route pour obtenir tous les mangas
server.get("/mangas", (req, res) => {
  let sql = "SELECT * FROM mangas";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Select Error: ", err);
      return res.status(500).send(err.message);
    }
    res.send(result);
  });
});

// Route pour modifier un manga
server.put("/edit", (req, res) => {
  const { id, name, type, note } = req.body;

  let sql = "UPDATE mangas SET name = ?, type = ?, note = ? WHERE id = ?";
  db.query(sql, [name, type, note, id], (err, result) => {
    if (err) {
      console.error("Update Error: ", err);
      return res.status(500).send(err.message);
    }
    res.send(result);
  });
});

// Route pour supprimer un manga
server.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM mangas WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete Error: ", err);
      return res.status(500).send(err.message);
    }
    res.send(result);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
f3d498e1d35b7c795b9ce4bbfedef9014992e3bf
