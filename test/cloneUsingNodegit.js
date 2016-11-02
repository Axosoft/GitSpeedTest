const nodegit = require('nodegit');

const preClone = new Date();

module.exports = (repoConfig) =>
  nodegit.Clone(repoConfig.url, `temp`)
