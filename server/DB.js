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
}

module.exports = DB;
