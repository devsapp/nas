"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var async_1 = __importDefault(require("async"));
var rimraf_1 = __importDefault(require("rimraf"));
var md5_file_1 = __importDefault(require("md5-file"));
var core_1 = require("@serverless-devs/core");
var client_1 = require("../client");
var generatePath_1 = require("./generatePath");
var constant = __importStar(require("../../constant"));
var utils = __importStar(require("./utils"));
var Cp = /** @class */ (function () {
    function Cp(regionId, credentials) {
        this.fcClient = client_1.fcClient(regionId, credentials);
    }
    Cp.prototype.cp = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var srcPath, targetPath, mountDir, nasDirYmlInput, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcPath = options.srcPath, targetPath = options.targetPath, mountDir = options.mountDir, nasDirYmlInput = options.nasDirYmlInput, command = options.command;
                        if (!srcPath || !targetPath) {
                            this.logger.error('Input path empty error, please input again!');
                            return [2 /*return*/];
                        }
                        if (!this.isCpFromLocalToNas(srcPath, targetPath, command)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cpFromLocalToNas(options)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!this.isCpFromNasToLocal(srcPath, targetPath, command)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cpFromNasToLocal(srcPath, targetPath, options.serviceName, options.functionName, mountDir, nasDirYmlInput)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('Format of path not support');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Cp.prototype.cpFromNasToLocal = function (nasPath, localDir, serviceName, functionName, mountDir, nasDirYmlInput) {
        return __awaiter(this, void 0, void 0, function () {
            var nasHttpTriggerPath, resolveNasPath, res, tmpNasZipPath, cmd, localZipDirname, localZipPath, rs, buf;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nasHttpTriggerPath = generatePath_1.getHttpTriggerPath(serviceName, functionName);
                        resolveNasPath = utils.parseNasUri(nasPath, mountDir, nasDirYmlInput);
                        return [4 /*yield*/, fs_extra_1.default.mkdirs(localDir)];
                    case 1:
                        _a.sent();
                        this.logger.debug("Check nas path " + resolveNasPath + " is exsit.");
                        return [4 /*yield*/, this.fcClient.get(generatePath_1.pathExsit(nasHttpTriggerPath), {
                                targetPath: resolveNasPath,
                            })];
                    case 2:
                        res = _a.sent();
                        if (!res.data) {
                            throw new Error(resolveNasPath + " is not exsit.");
                        }
                        this.logger.debug('Path is exsit.');
                        this.logger.log("zipping " + resolveNasPath);
                        tmpNasZipPath = path_1.default.posix.join(path_1.default.dirname(resolveNasPath), ".fun-nas-generated.zip");
                        cmd = "cd " + path_1.default.dirname(resolveNasPath) + " && zip -r " + tmpNasZipPath + " " + path_1.default.basename(resolveNasPath);
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.commandsPath(nasHttpTriggerPath), { cmd: cmd })];
                    case 3:
                        _a.sent();
                        this.logger.log("'\u2714' zip done", 'green');
                        this.logger.log('downloading...');
                        localZipDirname = path_1.default.join(process.cwd(), '.s', 'nas');
                        return [4 /*yield*/, fs_extra_1.default.mkdirs(localZipDirname)];
                    case 4:
                        _a.sent();
                        localZipPath = path_1.default.join(localZipDirname, '.fun-nas-generated.zip');
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.downloadPath(nasHttpTriggerPath), { tmpNasZipPath: tmpNasZipPath }, {}, {}, { rawBuf: true })];
                    case 5:
                        rs = _a.sent();
                        this.logger.log("'\u2714' download done", 'green');
                        buf = rs.data;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var ws = fs_extra_1.default.createWriteStream(localZipPath);
                                ws.write(buf);
                                ws.end();
                                ws.on('finish', function () {
                                    resolve('');
                                });
                                ws.on('error', function (error) {
                                    _this.logger.error(localZipPath + " write error : " + error);
                                    reject(error);
                                });
                            })];
                    case 6:
                        _a.sent();
                        this.logger.log('unzipping file');
                        return [4 /*yield*/, core_1.unzip(localZipPath, path_1.default.resolve(localDir)).then(function () {
                                core_1.Logger.log("'✔' unzip done!", 'green');
                            })];
                    case 7:
                        _a.sent();
                        this.logger.debug("fs remove " + localZipPath);
                        // clean
                        return [4 /*yield*/, fs_extra_1.default.remove(localZipPath)];
                    case 8:
                        // clean
                        _a.sent();
                        // await fs.remove(localZipDirname);
                        this.logger.debug("send clean request " + nasHttpTriggerPath + " " + tmpNasZipPath);
                        return [4 /*yield*/, this.sendCleanRequest(nasHttpTriggerPath, tmpNasZipPath)];
                    case 9:
                        _a.sent();
                        this.logger.log("'✔' download completed!", 'green');
                        return [2 /*return*/];
                }
            });
        });
    };
    Cp.prototype.cpFromLocalToNas = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var srcPath, targetPath, recursive, noClobber, serviceName, functionName, noTargetDirectory, mountDir, nasDirYmlInput, excludes, nasPath, resolvedSrc, _a, srcPathIsDir, srcPathIsFile, nasId, nasHttpTriggerPath, stats, dstStats, actualDstPath, permTip;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        srcPath = options.srcPath, targetPath = options.targetPath, recursive = options.recursive, noClobber = options.noClobber, serviceName = options.serviceName, functionName = options.functionName, noTargetDirectory = options.noTargetDirectory, mountDir = options.mountDir, nasDirYmlInput = options.nasDirYmlInput, excludes = options.excludes;
                        nasPath = utils.parseNasUri(targetPath, mountDir, nasDirYmlInput);
                        this.logger.debug("Paerse nas url is: " + nasPath);
                        resolvedSrc = utils.resolveLocalPath(path_1.default.resolve(srcPath));
                        return [4 /*yield*/, fs_extra_1.default.pathExists(resolvedSrc)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error(resolvedSrc + " not exist");
                        }
                        return [4 /*yield*/, utils.isDirOrFile(resolvedSrc)];
                    case 2:
                        _a = _b.sent(), srcPathIsDir = _a.isDir, srcPathIsFile = _a.isFile;
                        if (srcPathIsDir && !recursive) {
                            throw new Error('Can not copy folder without option -r/--recursive');
                        }
                        return [4 /*yield*/, this.getNasConfig(serviceName)];
                    case 3:
                        nasId = _b.sent();
                        nasHttpTriggerPath = generatePath_1.getHttpTriggerPath(serviceName, functionName);
                        this.logger.debug("checking dst path " + targetPath + "...");
                        return [4 /*yield*/, this.statsRequest(nasPath, nasHttpTriggerPath)];
                    case 4:
                        stats = (_b.sent()).data;
                        dstStats = {
                            dstPath: targetPath,
                            resolvedDst: nasPath,
                            dstPathEndWithSlash: this.endWithSlash(nasPath),
                            dstPathExists: stats.exists,
                            parentDirOfDstPathExists: stats.parentDirExists,
                            dstPathIsDir: stats.isDir,
                            dstPathIsFile: stats.isFile,
                        };
                        this.logger.debug("dstStats value is: " + JSON.stringify(dstStats));
                        return [4 /*yield*/, this.checkCpDstPath(nasHttpTriggerPath, resolvedSrc, dstStats, recursive, noClobber, noTargetDirectory)];
                    case 5:
                        actualDstPath = _b.sent();
                        permTip = utils.checkWritePerm(stats, nasId, nasPath);
                        if (permTip) {
                            this.logger.error("Warning: " + permTip);
                        }
                        if (!srcPathIsDir) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.uploadFolder(resolvedSrc, actualDstPath, nasHttpTriggerPath, srcPath, noClobber, excludes)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        if (!srcPathIsFile) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.uploadFile(resolvedSrc, actualDstPath, nasHttpTriggerPath)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9: throw new Error(srcPath + " has the same file stat and folder stat");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Cp.prototype.uploadFolder = function (resolvedSrc, actualDstPath, nasHttpTriggerPath, srcPath, noClobber, excludes) {
        if (excludes === void 0) { excludes = []; }
        return __awaiter(this, void 0, void 0, function () {
            var outputFileName, outputFilePath, compressedSize, tmpCheck, nasFile, fileHash, srcPathFiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputFileName = path_1.default.basename(path_1.default.resolve(srcPath)) + ".zip";
                        outputFilePath = path_1.default.join(process.cwd(), '.s', 'zip');
                        excludes.push(path_1.default.relative(process.cwd(), outputFilePath));
                        excludes.push(path_1.default.relative(process.cwd(), path_1.default.join(process.cwd(), '.s', 'logs')));
                        return [4 /*yield*/, core_1.zip({
                                codeUri: resolvedSrc,
                                outputFileName: outputFileName,
                                outputFilePath: outputFilePath,
                                exclude: excludes,
                            })];
                    case 1:
                        compressedSize = (_a.sent()).compressedSize;
                        this.logger.debug("Checking NAS tmp dir " + actualDstPath);
                        return [4 /*yield*/, this.fcClient.get(nasHttpTriggerPath + 'tmp/check', {
                                remoteNasTmpDir: actualDstPath,
                            })];
                    case 2:
                        tmpCheck = _a.sent();
                        this.logger.debug("Tmp check response is: " + JSON.stringify(tmpCheck));
                        this.logger.debug("Check done");
                        nasFile = path_1.default.posix.join(actualDstPath, outputFileName);
                        fileHash = path_1.default.posix.join(outputFilePath, outputFileName);
                        return [4 /*yield*/, this.uploadFile(fileHash, nasFile, nasHttpTriggerPath)];
                    case 3:
                        _a.sent();
                        this.logger.info('unzipping file');
                        return [4 /*yield*/, utils.readDirRecursive(srcPath, excludes)];
                    case 4:
                        srcPathFiles = _a.sent();
                        return [4 /*yield*/, this.unzipNasFileParallel(nasHttpTriggerPath, actualDstPath, nasFile, utils.chunk(srcPathFiles, 248), noClobber)];
                    case 5:
                        _a.sent();
                        this.logger.debug('cleaning');
                        return [4 /*yield*/, this.sendCleanRequest(nasHttpTriggerPath, nasFile)];
                    case 6:
                        _a.sent();
                        this.logger.debug("'✔' clean done");
                        rimraf_1.default.sync(fileHash);
                        this.logger.debug("'✔'  upload completed!");
                        return [2 /*return*/];
                }
            });
        });
    };
    Cp.prototype.uploadFile = function (resolvedSrc, actualDstPath, nasHttpTriggerPath, fileHash) {
        return __awaiter(this, void 0, void 0, function () {
            var stat, urlPath, cmd, fileOffSetCutByChunkSize, filePermission, vm, data, checkRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.lstat(resolvedSrc)];
                    case 1:
                        stat = _a.sent();
                        urlPath = generatePath_1.commandsPath(nasHttpTriggerPath);
                        cmd = "dd if=/dev/zero of=" + actualDstPath + " count=0 bs=1 seek=" + stat.size;
                        this.logger.debug("Upload url is " + urlPath + ", cmd is '" + cmd + "'");
                        fileOffSetCutByChunkSize = utils.splitRangeBySize(0, stat.size, (parseInt(process.env.NAS_CHUNK_SIZE) || 5) * 1024 * 1024);
                        if (!!fileHash) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getFileHash(resolvedSrc)];
                    case 2:
                        fileHash = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.getFilePermission(resolvedSrc)];
                    case 4:
                        filePermission = _a.sent();
                        vm = core_1.spinner("Start uploading file: " + actualDstPath);
                        return [4 /*yield*/, this.fcClient.post(urlPath, { cmd: cmd })];
                    case 5:
                        data = (_a.sent()).data;
                        console.log();
                        this.logger.debug(data);
                        if (data.error) {
                            throw new Error(data.error);
                        }
                        vm.succeed("File uploaded successfully: " + actualDstPath);
                        return [4 /*yield*/, this.uploadFileByChunk(nasHttpTriggerPath, actualDstPath, resolvedSrc, fileOffSetCutByChunkSize)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.changeNasFilePermission(nasHttpTriggerPath, actualDstPath, filePermission)];
                    case 7:
                        _a.sent();
                        this.logger.debug("checking uploaded file " + actualDstPath + " hash");
                        return [4 /*yield*/, this.checkFileHash(nasHttpTriggerPath, actualDstPath, fileHash)];
                    case 8:
                        checkRes = _a.sent();
                        this.logger.debug(checkRes.data);
                        this.logger.debug("'✔' hash unchanged");
                        return [2 /*return*/];
                }
            });
        });
    };
    Cp.prototype.sendCleanRequest = function (nasHttpTriggerPath, nasZipFile) {
        return __awaiter(this, void 0, void 0, function () {
            var urlPath, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlPath = generatePath_1.cleanPath(nasHttpTriggerPath);
                        query = { nasZipFile: nasZipFile };
                        return [4 /*yield*/, this.fcClient.get(urlPath, query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cp.prototype.checkFileHash = function (nasHttpTriggerPath, nasFile, fileHash) {
        return __awaiter(this, void 0, void 0, function () {
            var urlPath, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlPath = generatePath_1.fileCheck(nasHttpTriggerPath);
                        query = { nasFile: nasFile, fileHash: fileHash };
                        return [4 /*yield*/, this.fcClient.get(urlPath, query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cp.prototype.changeNasFilePermission = function (nasHttpTriggerPath, filePath, filePermission) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = "chmod " + filePermission + " " + filePath;
                        p = generatePath_1.commandsPath(nasHttpTriggerPath);
                        return [4 /*yield*/, this.fcClient.post(p, { cmd: cmd })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cp.prototype.readFileChunk = function (filePath, start, size) {
        return __awaiter(this, void 0, void 0, function () {
            var fd, chunkBuf, bytesRead;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.open(filePath, 'r')];
                    case 1:
                        fd = _a.sent();
                        chunkBuf = Buffer.alloc(size);
                        return [4 /*yield*/, fs_extra_1.default.read(fd, chunkBuf, 0, size, start)];
                    case 2:
                        bytesRead = (_a.sent()).bytesRead;
                        if (bytesRead !== size) {
                            throw new Error("ReadChunkFile function bytesRead not equal read size");
                        }
                        return [4 /*yield*/, fs_extra_1.default.close(fd)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, chunkBuf];
                }
            });
        });
    };
    Cp.prototype.getFilePermission = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var stat, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.lstat(filePath)];
                    case 1:
                        stat = _a.sent();
                        permission = '0' + (stat.mode & parseInt('777', 8)).toString(8);
                        return [2 /*return*/, permission];
                }
            });
        });
    };
    Cp.prototype.checkCpDstPath = function (nasHttpTriggerPath, srcPath, dstStats, recursive, noClobber, noTargetDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedDst, dstPath, dstPathExists, parentDirOfDstPathExists, dstPathIsDir, dstPathIsFile, dstPathEndWithSlash, errorInf, newDstPath, statsRes, stats, newDstStats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resolvedDst = dstStats.resolvedDst, dstPath = dstStats.dstPath, dstPathExists = dstStats.dstPathExists, parentDirOfDstPathExists = dstStats.parentDirOfDstPathExists, dstPathIsDir = dstStats.dstPathIsDir, dstPathIsFile = dstStats.dstPathIsFile, dstPathEndWithSlash = dstStats.dstPathEndWithSlash;
                        if (!(!recursive && dstPathExists)) return [3 /*break*/, 4];
                        if (dstPathIsFile && !dstPathEndWithSlash) {
                            if (!noClobber) {
                                return [2 /*return*/, resolvedDst];
                            }
                            errorInf = dstPath + " already exists.";
                        }
                        if (dstPathIsFile && dstPathEndWithSlash) {
                            errorInf = dstPath + " : Not a directory";
                        }
                        if (!(dstPathIsDir && utils.isNasProtocol(dstPath))) return [3 /*break*/, 3];
                        newDstPath = path_1.default.posix.join(resolvedDst, path_1.default.basename(srcPath));
                        return [4 /*yield*/, this.statsRequest(newDstPath, nasHttpTriggerPath)];
                    case 1:
                        statsRes = _a.sent();
                        stats = statsRes.data;
                        newDstStats = {
                            dstPath: dstPath + "/" + path_1.default.basename(srcPath),
                            resolvedDst: newDstPath,
                            dstPathEndWithSlash: false,
                            dstPathExists: stats.exists,
                            parentDirOfDstPathExists: stats.parentDirExists,
                            dstPathIsDir: stats.isDir,
                            dstPathIsFile: stats.isFile,
                        };
                        return [4 /*yield*/, this.checkCpDstPath(nasHttpTriggerPath, srcPath, newDstStats, recursive, noClobber, noTargetDirectory)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (dstPathIsDir && !utils.isNasProtocol(dstPath)) {
                            this.logger.debug("dstPathIsDir && !isNasProtocol(dstPath) is: " + (dstPathIsDir && !utils.isNasProtocol(dstPath)));
                            return [2 /*return*/, path_1.default.join(resolvedDst, path_1.default.basename(srcPath))];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (!recursive && !dstPathExists) {
                            if (dstPathEndWithSlash) {
                                errorInf = "nas cp: cannot create regular file " + dstPath + ": Not a directory";
                            }
                            else if (parentDirOfDstPathExists) {
                                return [2 /*return*/, resolvedDst];
                            }
                            else {
                                errorInf = "nas cp: cannot create regular file " + dstPath + ": No such file or directory";
                            }
                        }
                        else if (recursive && dstPathExists) {
                            if (dstPathIsDir && utils.isNasProtocol(dstPath)) {
                                if (noTargetDirectory) {
                                    return [2 /*return*/, resolvedDst];
                                }
                                this.logger.debug("dstPathIsDir && utils.isNasProtocol(dstPath) is: " + (dstPathIsDir && utils.isNasProtocol(dstPath)));
                                return [2 /*return*/, path_1.default.posix.join(resolvedDst, path_1.default.basename(srcPath))];
                            }
                            if (dstPathIsDir && !utils.isNasProtocol(dstPath)) {
                                this.logger.debug("dstPathIsDir && !utils.isNasProtocol(dstPath) is: " + (dstPathIsDir && !utils.isNasProtocol(dstPath)));
                                return [2 /*return*/, path_1.default.join(resolvedDst, path_1.default.basename(srcPath))];
                            }
                            if (dstPathIsFile && dstPathEndWithSlash) {
                                errorInf = "nas cp: failed to access " + dstPath + ": Not a directory";
                            }
                            if (dstPathIsFile && !dstPathEndWithSlash) {
                                errorInf = "nas cp: cannot overwrite non-directory " + dstPath + " with directory " + srcPath;
                            }
                        }
                        else if (recursive && !dstPathExists) {
                            if (parentDirOfDstPathExists) {
                                return [2 /*return*/, resolvedDst];
                            }
                            errorInf = "nas cp: cannot create directory " + dstPath + ": No such file or directory";
                        }
                        _a.label = 5;
                    case 5: throw new Error(errorInf);
                }
            });
        });
    };
    Cp.prototype.statsRequest = function (dstPath, httpTriggerPath) {
        return __awaiter(this, void 0, void 0, function () {
            var urlPath, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlPath = generatePath_1.statsPath(httpTriggerPath);
                        query = { dstPath: dstPath };
                        return [4 /*yield*/, this.fcClient.get(urlPath, query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cp.prototype.getNasConfig = function (serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, userId, groupId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getService(serviceName)];
                    case 1:
                        res = _b.sent();
                        this.logger.debug("getService response is: " + JSON.stringify(res));
                        _a = res.data.nasConfig, userId = _a.userId, groupId = _a.groupId;
                        return [2 /*return*/, {
                                UserId: userId,
                                GroupId: groupId,
                            }];
                }
            });
        });
    };
    Cp.prototype.getFileHash = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var isFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils.isDirOrFile(filePath)];
                    case 1:
                        isFile = (_a.sent()).isFile;
                        if (!isFile) return [3 /*break*/, 3];
                        return [4 /*yield*/, md5_file_1.default(filePath)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new Error('get file hash error, target is not a file, target path is: ' + isFile);
                }
            });
        });
    };
    Cp.prototype.uploadFileByChunk = function (nasHttpTriggerPath, nasZipFile, zipFilePath, fileOffSet) {
        var _this = this;
        return new Promise(function (resolve) {
            var vm = core_1.spinner("uploading");
            var uploadQueue = async_1.default.queue(function (offSet, callback) { return __awaiter(_this, void 0, void 0, function () {
                var urlPath, fileStart, fileSize, body, query, res, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            urlPath = generatePath_1.fileChunkUpload(nasHttpTriggerPath);
                            fileStart = offSet.start;
                            fileSize = offSet.size;
                            return [4 /*yield*/, this.readFileChunk(zipFilePath, fileStart, fileSize)];
                        case 1:
                            body = _a.sent();
                            query = {
                                nasFile: nasZipFile,
                                fileStart: fileStart.toString(),
                            };
                            return [4 /*yield*/, this.fcClient.post(urlPath, body, {}, query)];
                        case 2:
                            res = _a.sent();
                            this.logger.debug("Call " + urlPath + " query is: " + JSON.stringify(query) + ", response is: " + JSON.stringify(res));
                            if (res.data.error) {
                                throw new Error(res.data.error);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("upload error : " + error_1.message);
                            this.logger.debug(error_1.stack);
                            vm.fail();
                            return [2 /*return*/];
                        case 4:
                            callback();
                            return [2 /*return*/];
                    }
                });
            }); }, 5);
            uploadQueue.drain(function () {
                vm.succeed('upload done');
                resolve('');
            });
            uploadQueue.push(fileOffSet);
        });
    };
    Cp.prototype.unzipNasFileParallel = function (nasHttpTriggerPath, dstDir, nasZipFile, filesArrQueue, noClobber) {
        var _this = this;
        return new Promise(function (resolve) {
            var unzipQueue = async_1.default.queue(function (unzipFiles, next) { return __awaiter(_this, void 0, void 0, function () {
                var cmd, _i, unzipFiles_1, unzipFile, res, error_2, retryUnzipFiles;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            cmd = void 0;
                            if (noClobber) {
                                cmd = "unzip -q -n " + nasZipFile + " -d " + dstDir;
                            }
                            else {
                                cmd = "unzip -q -o " + nasZipFile + " -d " + dstDir;
                            }
                            for (_i = 0, unzipFiles_1 = unzipFiles; _i < unzipFiles_1.length; _i++) {
                                unzipFile = unzipFiles_1[_i];
                                cmd = cmd + (" '" + unzipFile + "'");
                            }
                            // cmd = cmd + ` '${unzipFile}'`;
                            this.logger.debug("Send unzip request cmd is: " + cmd + ".");
                            return [4 /*yield*/, this.fcClient.post(nasHttpTriggerPath + 'commands', { cmd: cmd })];
                        case 1:
                            res = _a.sent();
                            this.logger.debug(res);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            // zip 中存在特殊文件名，例如 $data.js
                            if (error_2.message && error_2.message.includes('filename not matched')) {
                                this.logger.error(error_2);
                                return [2 /*return*/];
                            }
                            if (error_2.message && error_2.message.toLowerCase().includes('permission denied')) {
                                // TODO : 权限问题更加详细的提示
                                this.logger.error(error_2);
                                return [2 /*return*/];
                            }
                            this.logger.debug((error_2.code || '') + " " + error_2.message.toLowerCase());
                            // 当解压文件数大于 1 ，默认为解压文件数过多导致 unzip 指令超出指令长度限制导致的解压失败
                            // 会将解压文件列表折半拆分后进行重试
                            if (unzipFiles.length > 1) {
                                this.logger.log('Retry unziping...');
                                retryUnzipFiles = [];
                                retryUnzipFiles.push(unzipFiles.slice(0, unzipFiles.length / 2));
                                retryUnzipFiles.push(unzipFiles.slice(unzipFiles.length / 2, unzipFiles.length));
                                unzipQueue.unshift(retryUnzipFiles);
                            }
                            else {
                                // 解压文件数小于 1 个时，认为不是解压文件数过多造成的问题
                                // 因此提示用户重新 sync
                                this.logger.error(error_2);
                                this.logger.error('Unzip error! Please re-sync.');
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 3];
                        case 3:
                            next();
                            return [2 /*return*/];
                    }
                });
            }); }, 5);
            unzipQueue.drain(function () {
                core_1.Logger.info(constant.CONTEXT, 'unzip done');
                resolve('');
            });
            unzipQueue.push(filesArrQueue);
        });
    };
    Cp.prototype.endWithSlash = function (inputPath) {
        if (!inputPath) {
            throw new Error('Local path could not be Empty');
        }
        return inputPath.charAt(inputPath.length - 1) === '/';
    };
    Cp.prototype.isCpFromLocalToNas = function (srcPath, targetPath, command) {
        return command === 'upload' || (!utils.isNasProtocol(srcPath) && utils.isNasProtocol(targetPath));
    };
    Cp.prototype.isCpFromNasToLocal = function (srcPath, targetPath, command) {
        return command === 'download' || (utils.isNasProtocol(srcPath) && !utils.isNasProtocol(targetPath));
    };
    __decorate([
        core_1.HLogger(constant.CONTEXT),
        __metadata("design:type", Object)
    ], Cp.prototype, "logger", void 0);
    return Cp;
}());
exports.default = Cp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL2NwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLGtEQUE0QjtBQUM1QixzREFBK0I7QUFDL0IsOENBQXNGO0FBQ3RGLG9DQUFxQztBQUVyQywrQ0FTd0I7QUFDeEIsdURBQTJDO0FBQzNDLDZDQUFpQztBQStCakM7SUFJRSxZQUFZLFFBQWdCLEVBQUUsV0FBeUI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUssZUFBRSxHQUFSLFVBQVMsT0FBWTs7Ozs7O3dCQUNYLE9BQU8sR0FBb0QsT0FBTyxRQUEzRCxFQUFFLFVBQVUsR0FBd0MsT0FBTyxXQUEvQyxFQUFFLFFBQVEsR0FBOEIsT0FBTyxTQUFyQyxFQUFFLGNBQWMsR0FBYyxPQUFPLGVBQXJCLEVBQUUsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFhO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFOzRCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDOzRCQUNqRSxzQkFBTzt5QkFDUjs2QkFFRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBckQsd0JBQXFEO3dCQUN2RCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7NkJBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FB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