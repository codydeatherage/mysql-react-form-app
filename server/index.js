const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const tableName = "users";
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const q = `SELECT * FROM ${tableName}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/createUser", (req, res) => {
  const q = `INSERT INTO ${tableName} (username, email, password) VALUES (?)`;
  const values = [req.body.username, req.body.email, req.body.password];
  db.query(q, [values], (err, data) => {
    console.log(`ADDED ${req.body.username} to ${tableName}`);
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connect to backend.");
});
