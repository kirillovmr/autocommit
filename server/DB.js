var admin = require('firebase-admin');
var serviceAccount = require('./servicekey.json');
require('dotenv').config();

module.exports = class DB {
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
      const newRef = ref.push({
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

// const db = new DB();
// db.addUser('kirillovmr2', 'mail@mail.com', 'ssh-key').then(key => console.log(key));