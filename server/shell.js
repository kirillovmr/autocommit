const { exec } = require('child_process');
const uuidv1 = require('uuid/v1');

function runCommit(username, email) {
  console.log(`Running commit for ${username}`);
  const script = exec(`bash commit.bash ${username} ${email}`);

  script.stdout.on('data', (data) => {
    console.log('sh:', data)
  });
}

function generateKey() {
  return new Promise((resolve, reject) => {
    const username = uuidv1();
    const email = 'autocommit@gmail.com';
    console.log(`Generating ssh key for user ${username}`);

    const script = exec(`bash addkey.bash ${username} ${email} 1`);

    script.stdout.on('data', (data) => {
      // console.log('sh:', data)
      if (data.includes('ssh-rsa')) {
        const key = data.trim();
        resolve([username, key]);
      }
    });

    script.stderr.on('data', (data) => {
      console.log('addkey.bash error:', data);
    });
  })
}

module.exports = {
  runCommit,
  generateKey
}