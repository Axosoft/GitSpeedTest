const nodegit = require('nodegit');
const fse = require('fs-extra');
const fp = require('lodash/fp');

const argv = require('yargs')
  .usage('Usage: $0 <test> <repo> -count [number] -size [number]')
  .demand(1)
  .default('count', 1)
  .default('size', 10*1024*1024)
  .argv;

const repoConfig = require('./config')[argv._[1]];

fse.removeSync('temp');

const path = `./test/${argv._[0]}`;
Promise.resolve(require(path)(repoConfig, argv))
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
