const Database = require("better-sqlite3");

// Create / connect database
const db = new Database("finance.db", {
  verbose: console.log, // optional (shows queries)
});

console.log("Connected to SQLite database ✅");

// Create tables
try {
  // Users table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      status TEXT
    )
  `).run();

  // Records table
  db.prepare(`
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
  `).run();

  console.log("Tables initialized ✅");

} catch (error) {
  console.error("DB Error:", error.message);
}

module.exports = db;