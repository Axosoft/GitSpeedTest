const nodegit = require('nodegit');

const checkoutRepoAndCreateLargeFile = require('./util/checkoutRepoAndCreateLargeFile');

module.exports =
  (repoConfig) => {
    checkoutRepoAndCreateLargeFile(repoConfig);

    return nodegit.Repository.open('temp')
      .then((repo) =>
        repo.index()
          .then((index) => {
            function stageTest() {
              return index.addByPath('randomfile.txt');
            }

            function commitTest() {
              return index.writeTree()
                .then((treeOid) => nodegit.Tree.lookup(repo, treeOid))
                .then((tree) =>
                  repo.head()
                    .then(head => nodegit.Commit.lookup(repo, head.target()))
                    .then(headCommit => nodegit.Commit.create(
                      repo,
                      "HEAD",
                      repo.defaultSignature(),
                      repo.defaultSignature(),
                      null,
                      'Add randomfile.txt',
                      tree,
                      1,
                      [ headCommit ]
                    ))
                );
            }

            return [stageTest, commitTest];
          })
      );
  };
