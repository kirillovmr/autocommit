const { exec } = require('child_process');

function runCommit(username, email, token, num) {
  console.log(`Running ${num} commit(s) for ${username}`);
  const script = exec(`bash commit.bash ${username} ${email} ${token} ${num}`);

  script.stdout.on('data', (data) => {
    console.log(`sh ${username}:`, data);
  });
}

module.exports = {
  runCommit
}