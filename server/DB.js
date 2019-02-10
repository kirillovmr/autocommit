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
              token: data[username].accessToken,
              commits: data[username].commits,
              errors: data[username].errors || 0
            });
        });
        resolve(users);
      })
    });
  }

  // Sets new value for username commits num
  setNewCommitsNum(username, num) {
    const ref = this.db.ref(`users/${username}`);

    return new Promise((resolve, reject) => {
      ref.update({
        commits: num,
        errors: 0
      })
      .then(() => {
        console.log(`Commits num for ${username} was set to ${num}`);
        resolve();
      })
      .catch(e => {
        console.error(`Error setting ${username} commits num to ${num}`);
        reject(e);
      });
    });
  } 

  setNewErrorsNum(username, num) {
    const ref = this.db.ref(`users/${username}`);

    return new Promise((resolve, reject) => {
      ref.update({
        errors: num
      })
      .then(() => {
        console.log(`Errors num for ${username} was set to ${num}`);
        resolve();
      })
      .catch(e => {
        console.error(`Error setting ${username} errors num to ${num}`);
        reject(e);
      });
    });
  } 
}

module.exports = DB;
