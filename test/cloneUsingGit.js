const childProcess = require('child_process');

module.exports = (repoConfig) =>
  () => childProcess.execSync(`git clone ${repoConfig.url} temp`);
