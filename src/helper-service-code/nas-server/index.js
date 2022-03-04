const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const getRawBody = require('raw-body');
const execute = require('./lib/execute');
const rimraf = require('rimraf');
const path = require('path');
const OSS = require('ali-oss');
const { exec } = require('child_process');
const uuid = require('uuid');

const { makeTmpDir } = require('./lib/path');
const { Server } = require('@webserverless/fc-express');

const { getFileHash, writeBufToFile, exists, isDir } = require('./lib/file');

const app = express();
app.use(bodyParser.raw({ limit: '6mb' }));
app.use(bodyParser.json());

app.get('/version', (req, res) => {
  console.log('received version request');

  const versionFilePath = path.posix.join('/', 'code', 'VERSION');
  fs.readFile(versionFilePath, (err, data) => {
    if (err) {
      res.send({ curVersionId: err });
    }
    const curVersionId = data.toString();
    res.send({
      curVersionId,
    });
  });
});

app.get('/tmp/check', async (req, res) => {
  console.log(`received tmp/check request, query is: ${ JSON.stringify(req.query)}`);
  const { remoteNasTmpDir } = req.query;
  await makeTmpDir(remoteNasTmpDir);
  res.send({
    desc: 'check tmpDir done!',
  });
});

app.post('/download', async (req, res) => {
    const { tmpNasZipPath, start, size } = req.body;

    // 读取文件内容
    console.log(`/download: ${ JSON.stringify(req.body)}`);
    const fd = await fs.open(tmpNasZipPath, 'r');
    const body = Buffer.alloc(size);
    const { bytesRead } = await fs.read(fd, body, 0, size, start);
    if (bytesRead !== size) {
        throw new Error('ReadChunkFile function bytesRead not equal read size');
    }
    await fs.close(fd);

    res.set('Content-Type', 'application/octet-stream');
    res.send(body);
});

app.get('/path/exsit', (req, res) => {
  console.log(`received /path/exsit request, query is: ${ JSON.stringify(req.query)}`);
  const { targetPath } = req.query;
  res.send(fs.pathExistsSync(targetPath));
});

// check if local file and NAS file are the same via MD5
app.get('/file/check', async (req, res) => {
  console.log(`received file/check request, query is: ${ JSON.stringify(req.query)}`);

  const { nasFile, fileHash } = req.query;

  const nasFileHash = await getFileHash(nasFile);

  if (nasFileHash === fileHash) {
    res.send({
      stat: 1,
      desc: 'File saved',
    });
  } else {
    rimraf.sync(nasFile);
    throw new Error('file hash changes, you need to re-upload');
  }
});

// exec commands
app.post('/commands', async (req, res) => {
  console.log(`received commands request, query is: ${ JSON.stringify(req.body)}`);

  const { cmd } = req.body;
  if (!cmd) {
    throw new Error('missing cmd parameter');
  }

  const execRs = await execute(cmd);

  res.send(execRs);
});

app.get('/clean', (req, res) => {
  console.log(`received clean request, query is: ${ JSON.stringify(req.query)}`);

  const { nasZipFile } = req.query;

  rimraf.sync(nasZipFile);
  res.send({
    desc: 'clean done',
  });
});

app.post('/file/chunk/upload', async (req, res) => {
  console.log(`received file/chunkUpload reqeust, query is: ${ JSON.stringify(req.query)}`);

  const { nasFile } = req.query;
  const fileStart = parseInt(req.query.fileStart, 10);

  const chunkFileBuf = req.body;

  await writeBufToFile(nasFile, chunkFileBuf, fileStart);

  res.send({
    desc: 'chunk file write done',
  });
});

app.get('/stats', async (req, res) => {
  console.log(`received stats reqeust, query is: ${ JSON.stringify(req.query)}`);

  const { dstPath } = req.query;

  if (!dstPath) {
    throw new Error('missing dstPath parameter');
  }

  const parentDirExists = await isDir(path.dirname(dstPath));

  if (await exists(dstPath)) {
    const stats = await fs.lstat(dstPath);

    res.send({
      path: dstPath,
      exists: true,
      parentDirExists,
      isDir: stats.isDirectory(),
      isFile: stats.isFile(),
      UserId: stats.uid,
      GroupId: stats.gid,
      mode: stats.mode,
      size: stats.size,
    });
  } else {
    res.send({
      path: dstPath,
      exists: false,
      parentDirExists,
      isDir: false,
      isFile: false,
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err);

  res.send({ error: err.message });
});

const server = new Server(app);

module.exports.handler = async (req, res, context) => {
  // getRawBody 需要放在所有 await 函数的前面，获取 req 的 body
  // 由 app.use 中间件获取 req.body
  const body = await getRawBody(req);

  req.body = body;
  // 设置 server 端的超时时间为 1800 秒, 此处单位为毫秒
  server.rawServer.setTimeout(1800 * 1000);
  server.httpProxy(req, res, context);
};

const getOssClient = async (bucket, context) => {
  console.log('stsToken: context.credentials.securityToken', context.credentials.securityToken);

  return new OSS({
    accessKeyId: context.credentials.accessKeyId,
    accessKeySecret: context.credentials.accessKeySecret,
    stsToken: context.credentials.securityToken,
    internal: true,
    bucket,
    region: `oss-${ context.region}`,
  });
};

function downloadFromOSSAndExtractToNas(bucket, objectName, dst, context) {
  const nasZipPath = `/mnt/nas_dependencies/nas-${uuid.v4()}.zip`;

  return getOssClient(bucket, context)
    .then((client) => {
      return client.getStream(objectName);
    })
    .then((result) => {
      if (!fs.existsSync(dst)) {
        fs.mkdirSync(dst, { recursive: true });
      }
      return new Promise((resolve, reject) => {
        result.stream
          .pipe(fs.createWriteStream(nasZipPath))
          .on('error', (err) => {
            reject(err);
          })
          .on('finish', resolve);
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        exec(
          `unzip -q -n ${nasZipPath} -d ${dst} && rm ${nasZipPath} && ls -al ${dst}`,
          {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 1024 * 1024 * 1024,
            killSignal: 'SIGTERM',
          },
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
            }
            resolve({
              stdout,
              stderr,
            });
          },
        );
      });
    });
}

// 辅助函数，这个辅助函数用于实现从 oss 上下载 nas.zip 以及解压到 nas 的功能。
module.exports.cpFromOssToNasHandler = (event, context, callback) => {
  event = new Buffer(event).toString();
  event = event.replace(/\\&/g, '\\\\&');
  const eventJson = JSON.parse(event);

  const { objectNames } = eventJson;
  const { dst } = eventJson;
  const { bucket } = eventJson;
  const { rosCurl } = eventJson;

  const promises = [];

  for (const objectName of objectNames) {
    const result = downloadFromOSSAndExtractToNas(bucket, objectName, dst, context);
    promises.push(result);
  }

  Promise.all(promises)
    .then((values) => {
      console.log('upload results', values);

      return new Promise((resolve, reject) => {
        const body = {
          status: 'success',
          data: 'nas cp success',
        };

        const requestCurl = `${rosCurl } --data-binary ${JSON.stringify(JSON.stringify(body))}`;

        exec(requestCurl, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          resolve({
            stdout,
            stderr,
          });
        });
      });
    })
    .then((rs) => callback(null, JSON.stringify(rs)))
    .catch((err) => {
      console.error('upload error', err);

      const body = {
        status: 'failure',
        data: err.message,
      };

      const requestCurl = `${rosCurl } --data-binary ${JSON.stringify(JSON.stringify(body))}`;

      exec(requestCurl, (error, stdout, stderr) => {
        callback(err);
      });
    });
};

module.exports.app = app;
