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

  // Returns number of unused keys
  async numUnusedKeys() {
    const data = await this.db.ref("keys").once("value");
    if(!data.val()) return 0;
    return Object.keys(data.val()).map(() => 1).length;
  }

  // Adds new username - sshkey, returns key reference
  addUnusedKey(username, key) {
    if (!username || !key) return false;
    const ref = this.db.ref("keys");

    return new Promise((resolve, reject) => {
      const newRef = ref.update({
        [username]: key
      });
      resolve(newRef.key);
    });
  }

  // Returns array of user objects with enabled autocommit
  getUsersToCommit() {
    const ref = this.db.ref("users");

    return new Promise((resolve, reject) => {
      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        const users = [];
        Object.keys(data).map(username => {
          if (data[username].autocommits && data[username].keyName) 
            users.push({
              username,
              email: data[username].email,
              keyName: data[username].keyName,
              token: data[username].accessToken
            });
        });
        resolve(users);
      })
    });
  }
}

module.exports = DB;
