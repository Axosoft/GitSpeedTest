const nodegit = require('nodegit');
const fse = require('fs-extra');
const fp = require('lodash/fp');

const repoConfig = require('./config')[process.argv[3]];

fse.removeSync('temp');

const path = `./test/${process.argv[2]}`;
Promise.resolve(require(path)(repoConfig))
  .then((testOrTests) => {
    const tests = fp.isArray(testOrTests) ? testOrTests : [ testOrTests ];

    return fp.reduce(
      (promise, test) => promise.then(() =>
        {
          console.log(`starting test ${test.name}`);
          const preTest = new Date();

          return Promise.resolve(test())
            .catch(function(error) {
              console.log(error);
            })
            .then(() => {
              const afterTest = new Date() - preTest;
              console.log(`${afterTest / 1000} s`);
            });
        }
      ),
      Promise.resolve(),
      tests
    );
  })
  .catch(error => console.log(error));
