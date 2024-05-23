const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("node-development.db");

// db.run("DROP TABLE users");
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGERN OT NULL
)`);

module.exports = {
  async addUser(user) {
    try {
      const lastId = await new Promise((resolve, reject) => {
        db.run("INSERT INTO users (name, age) VALUES (?, ?)", [user.name, user.age], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
      return {id: lastId, ...user};
    } catch (err) {
      return null;
    };
  },
  
  async getUsers() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          };
        });
      });
      return users;
    } catch (err) {
      return [];
    };
  },

  async getUserById(id) {
    try {
      const user = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          };
        });
      });
      return user;
    } catch (err) {
      return null;
    }
  },
  
  async deleteUserById(id) {
    try {
      const changes = await new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          };
        });
      });
      return changes > 0;
    } catch (err) {
      return null;
    }
  },

  async updateUserById(id, userData) {
    try {
      const changes = await new Promise((resolve, reject) => {
        db.run("UPDATE users SET name = ?, age = ? WHERE id = ?", [userData.name, userData.age, id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          };
        });
      });
      return changes > 0;
    } catch (err) {
      return null;
    };
  },
};