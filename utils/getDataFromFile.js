const fs = require('fs').promises;

const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.log(err);
      return new Promise();
    });
};

module.exports = getDataFromFile;
