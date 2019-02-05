const { exec } = require('child_process');

function runCommit(username, email, token) {
  console.log(`Running commit for ${username}`);
  const script = exec(`bash commit.bash ${username} ${email} ${token}`);

  script.stdout.on('data', (data) => {
    console.log(`sh ${username}:`, data);
  });
}

module.exports = {
  runCommit
}