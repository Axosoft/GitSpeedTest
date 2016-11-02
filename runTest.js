const nodegit = require('nodegit');
const fse = require('fs-extra');

const repoConfig = require('./config')[process.argv[3]];

const path = `./test/${process.argv[2]}`;
const test = require(path);

fse.removeSync('temp');

const preTest = new Date();

test(repoConfig)
  .catch(function(error) {
    console.log(error);
  })
  .then(() => {
    const afterTest = new Date() - preTest;
    console.log(`${afterTest / 1000} s`);
  });
