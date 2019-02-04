const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

// Imports
const { runCommit, generateKey } = require('./shell');
const DB = require('./DB');

// Express settings
const publicPath = path.join(__dirname, '../client/public');
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Database initialize
const db = new DB();

// Generating ssh-keys if needed
db.numUnusedKeys().then(unusedKeys => {
  let numNewKeys = process.env['MAX_KEYS'] - unusedKeys;
  if (numNewKeys > 0) {
    console.log(`Generating ${numNewKeys} new keys`);

    // Generating keys
    while(numNewKeys > 0) {
      generateKey().then(data => {
        const [username, key] = data;
        
        // Adding key to database
        db.addUnusedKey(username, key);
      })

      numNewKeys -= 1;
    }
  }
});

db.getUsersToCommit().then(users => {
  console.log(users);
})


/**
 * GET & POST Methods
 */

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
// });

app.post('/commit', (req, res) => {
  console.log('Hey');
  db.getUsersToCommit();
  res.send({
    success: true
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});