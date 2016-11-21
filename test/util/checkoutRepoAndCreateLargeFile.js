const childProcess = require('child_process');
const fse = require('fs-extra');
const randomstring = require("randomstring");

module.exports = (repoConfig, argv) => {
  console.log('Checking out');
  childProcess.execSync(`git clone ${repoConfig.url} temp`);
  console.log(`Creating ${argv.count} files of size ${argv.size}`);

  for(let i = 1; i <= argv.count; i++) {
    const contents = randomstring.generate({ length: argv.size });
    fse.outputFileSync(`temp/randomfile${i}.txt`, contents);
  }
};
