var admin = require('firebase-admin');
require('dotenv').config();

class DB {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.CREDENTIALS)),
      databaseURL: process.env.DB_URL
    });
    this.db = admin.database();
  }

  // Returns array of user objects with enabled autocommit
  getUsersToCommit() {
    const ref = this.db.ref("users");

    return new Promise((resolve, reject) => {
      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        const users = [];
        Object.keys(data).map(username => {
          if (data[username].autocommits) 
            users.push({
              username,
              email: data[username].email,
              token: data[username].accessToken
            });
        });
        resolve(users);
      })
    });
  }
}

module.exports = DB;
