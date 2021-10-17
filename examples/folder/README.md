本组件支持 create 和 delete 两个指令
````
s create

s delete
````

配置字段描述
  Component: 目前没有发布， 需要指向本地路径


// if (dstPathEndWithSlash) { // 如果需要上传文件夹
//   const newDstPath = `${dstPath}/${path.basename(srcPath)}`;
  // const statsRes = await super.callStats(serviceName, newDstPath);
  // const stats = statsRes.data;
  // const newDstStats = {
  //   resolvedDst: resolvedDst.substr(0, resolvedDst.length - 1),
  //   dstPath: newDstPath,
  //   dstPathEndWithSlash: false,
  //   dstPathExists: stats.exists,
  //   parentDirOfDstPathExists: stats.parentDirExists,
  //   dstPathIsDir: stats.isDir,
  //   dstPathIsFile: stats.isFile,
  // };

  // return await this.checkUploadDstPath(
  //   serviceName,
  //   srcPath,
  //   newDstStats,
  //   recursive,
  //   noClobber,
  //   true,
  // );