const childProcess = require('child_process');

const checkoutRepoAndCreateLargeFile = require('./util/checkoutRepoAndCreateLargeFile');

module.exports =
  (repoConfig, argv) => {
    checkoutRepoAndCreateLargeFile(repoConfig, argv);

    function stageTest() {
      return childProcess.execSync('git --git-dir=temp/.git --work-tree=temp add randomfile*.txt -f');
    }

    function commitTest() {
      return childProcess.execSync('git --git-dir=temp/.git commit -m "Add randomfiles"');
    }
    return [stageTest, commitTest];
  }
