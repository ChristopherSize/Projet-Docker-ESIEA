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
