const sqlite3 = require("sqlite3").verbose();

// Create database file
const db = new sqlite3.Database("./finance.db", (err) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Connected to SQLite database ✅");
  }
});

// Create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      status TEXT
    )
  `);

  // Records table
  db.run(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL,
      type TEXT,
      category TEXT,
      date TEXT,
      note TEXT,
      created_by INTEGER,
      is_deleted INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;