const fs = require('fs-extra');

module.exports.handler = function (event, _context, callback) {
  const dirs = JSON.parse(event);
  if (!Array.isArray(dirs)) {
    callback('Parameter is not an array', '');
  }

  dirs.forEach((dir, index) => {
    console.log('Subscript: ', index);
    console.log('value: ', dir);

    if (typeof dir !== 'string') {
      callback(`The subscript ${index} of the parameter is not the same string`, '');
    }
    fs.mkdirpSync(dir);
  });
  callback(null, 'OK');
};
