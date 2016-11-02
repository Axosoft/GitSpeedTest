const childProcess = require('child_process');

module.exports = (repoConfig) =>
  Promise.resolve(
    childProcess.execSync(`git clone ${repoConfig.url} temp`)
  );
