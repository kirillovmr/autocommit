var admin = require('firebase-admin');
var serviceAccount = require('./servicekey.json');
require('dotenv').config();

class DB {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env['DB_URL']
    });
    this.db = admin.database();
  }

  /**
   * Methods to work with keys
   */
  // Returns number of unused keys
  async numUnusedKeys() {
    const data = await this.db.ref("keys").once("value");
    if(!data.val()) return 0;
    return Object.keys(data.val()).map(() => 1).length;
  }

  // Returns a promise and key-value
  getUnusedKey() {
    var ref = this.db.ref("keys");
    return new Promise((resolve, reject) => {
      ref.limitToLast(1).once("value", function(data) {
        resolve(data.val());
      });
    });
  }

  // Adds new username - sshkey, returns key reference
  addUnusedKey(username, key) {
    if (!username || !key) return false;
    var ref = this.db.ref("keys");

    return new Promise((resolve, reject) => {
      const newRef = ref.update({
        [username]: key
      });
      resolve(newRef.key);
    });
  }

  // Removes username by key reference
  removeUnusedKey(keyRef) {
    var ref = this.db.ref("keys");
    return new Promise((resolve, reject) => {
      ref.child(keyRef).remove(() => {
        resolve('Removed');
      })
    })
  }

  /**
   * Functions to work with users
   */
  // Adds user to database
  addUser(username, email, sshkey) {
    if (!username || !email || !sshkey) return false;
    var ref = this.db.ref("users");

    return new Promise((resolve, reject) => {
      // ref.
      ref.update({
        [username]: {
          email: email,
          key: sshkey
        }
      });
      resolve(true);
    });
  }
}

module.exports = DB;

// const db = new DB();
// db.numUnusedKeys().then(keys => {
//   console.log(keys);
// })