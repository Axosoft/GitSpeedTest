const childProcess = require('child_process');

const checkoutRepoAndCreateLargeFile = require('./util/checkoutRepoAndCreateLargeFile');

module.exports =
  (repoConfig) => {
    checkoutRepoAndCreateLargeFile(repoConfig);

    function stageTest() {
      return childProcess.execSync('git --git-dir=temp/.git add temp/randomfile.txt -f');
    }

    function commitTest() {
      return childProcess.execSync('git --git-dir=temp/.git commit -m "Add randomfile.txt"');
    }
    return [stageTest, commitTest];
  }
