const fs = require('fs-extra');

module.exports.handler = function (event, _context, callback) {
  const {
    dirs,
    getVersion,
  } = JSON.parse(event);

  console.log('dirs:: ', dirs);
  console.log('getVersion:: ', getVersion);

  if (getVersion) {
    const version = fs.readFileSync('./VERSION');
    callback(null, version.toString());
  } else if (dirs) {
    for (const dir of dirs) {
      fs.mkdirpSync(dir);
    }
    callback(null, 'OK');
  }
  callback('Not found invoke function', '');
};
