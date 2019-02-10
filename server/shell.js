const { exec } = require('child_process');

function runCommit(username, email, token, num) {
  console.log(`@${username} running ${num} commit(s)`);

  return new Promise((resolve, reject) => {
    const script = exec(`bash commit.bash ${username} ${email} ${token} ${num}`);

    script.stdout.on('data', (data) => {
      console.log(`sh ${username}:`, data);
    });
  
    script.on('close', (code, signal) => {
      if (code === 0)
        resolve();
      else {
        let msg;
        switch(code) {
          case 1:
            msg = `Unable push to repo. Happens wjen repo is but not limited to 'archived'`;
            break;
          case 2:
            msg = `Error clonning repo second time. Access token is invalid. Relogin in autocommit'`;
            break;
          default:
            msg = `Undefined error happened. Something in commit.bash, code ${code}`;
            break;
        }
        reject(msg);
      }
    });
  });
}

module.exports = {
  runCommit
}