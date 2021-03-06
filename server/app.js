const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

// Imports
const { runCommit } = require('./shell');
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

/**
 * GET & POST Methods
 */
app.post('/commit', (req, res) => {
  console.log('Autocommit started');
  db.getUsersToCommit().then(users => {
    console.log('Received array of users to commit');

    users.forEach(user => {
      // Generates random num of commits to do
      const num = Math.floor(Math.random() * 2 + 0.6);

      if (num > 0) {
        runCommit(user.username, user.email, user.token, num)
        .then(() => {
          console.log(`@${user.username} commits done!`);
          db.setNewCommitsNum(user.username, user.commits + num);
        })
        .catch(msg => {
          // TODO - send user an email
          console.log(`@${user.username}`, msg);
          db.setNewErrorsNum(user.username, user.errors + 1);
        });
      }
      else {
        console.log(`@${user.username} Randomly was chosen not to commit now`);
      }
    });

    res.send({
      success: true
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});