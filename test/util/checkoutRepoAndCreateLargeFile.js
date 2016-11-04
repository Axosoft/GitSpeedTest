const childProcess = require('child_process');
const fse = require('fs-extra');
const randomstring = require("randomstring");

module.exports = (repoConfig) => {
  console.log('Checking out');
  childProcess.execSync(`git clone ${repoConfig.url} temp`);
  console.log('Creating file');
  const contents = randomstring.generate({ length: 10*1024*1024 });
  fse.outputFileSync('temp/randomfile.txt', contents);
};
