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
                        tmpNasZipPath = path_1.default.posix.join(path_1.default.dirname(resolveNasPath), '.fun-nas-generated.zip');
                        cmd = "cd " + path_1.default.dirname(resolveNasPath) + " && zip -r " + tmpNasZipPath + " " + path_1.default.basename(resolveNasPath);
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.commandsPath(nasHttpTriggerPath), { cmd: cmd })];
                    case 3:
                        _a.sent();
                        this.logger.log('\'✔\' zip done', 'green');
                        this.logger.log('downloading...');
                        localZipDirname = path_1.default.join(process.cwd(), '.s', 'nas');
                        return [4 /*yield*/, fs_extra_1.default.mkdirs(localZipDirname)];
                    case 4:
                        _a.sent();
                        localZipPath = path_1.default.join(localZipDirname, '.fun-nas-generated.zip');
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.downloadPath(nasHttpTriggerPath), { tmpNasZipPath: tmpNasZipPath }, {}, {}, { rawBuf: true })];
                    case 5:
                        rs = _a.sent();
                        this.logger.log('\'✔\' download done', 'green');
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
            var outputFileName, outputFilePath, tmpCheck, nasFile, fileHash, srcPathFiles;
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
                        _a.sent();
                        this.logger.debug("Checking NAS tmp dir " + actualDstPath);
                        return [4 /*yield*/, this.fcClient.get(nasHttpTriggerPath + "tmp/check", {
                                remoteNasTmpDir: actualDstPath,
                            })];
                    case 2:
                        tmpCheck = _a.sent();
                        this.logger.debug("Tmp check response is: " + JSON.stringify(tmpCheck));
                        this.logger.debug('Check done');
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
                        this.logger.debug(JSON.stringify(data));
                        if (data.error) {
                            vm.fail();
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
                            throw new Error('ReadChunkFile function bytesRead not equal read size');
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
                        permission = "0" + (stat.mode & parseInt('777', 8)).toString(8);
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
                    case 3: throw new Error("get file hash error, target is not a file, target path is: " + isFile);
                }
            });
        });
    };
    Cp.prototype.uploadFileByChunk = function (nasHttpTriggerPath, nasZipFile, zipFilePath, fileOffSet) {
        var _this = this;
        return new Promise(function (resolve) {
            var vm = core_1.spinner('uploading');
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
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            cmd = void 0;
                            if (noClobber) {
                                cmd = "unzip -q -n " + nasZipFile + " -d " + dstDir;
                            }
                            else {
                                cmd = "unzip -q -o " + nasZipFile + " -d " + dstDir;
                            }
                            for (_i = 0, unzipFiles_1 = unzipFiles; _i < unzipFiles_1.length; _i++) {
                                unzipFile = unzipFiles_1[_i];
                                cmd += " '" + unzipFile + "'";
                            }
                            // cmd = cmd + ` '${unzipFile}'`;
                            this.logger.debug("Send unzip request cmd is: " + cmd + ".");
                            return [4 /*yield*/, this.fcClient.post(nasHttpTriggerPath + "commands", { cmd: cmd })];
                        case 1:
                            res = _c.sent();
                            this.logger.debug(JSON.stringify(res));
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _c.sent();
                            // zip 中存在特殊文件名，例如 $data.js
                            if (error_2.message && ((_a = error_2.message) === null || _a === void 0 ? void 0 : _a.includes('filename not matched'))) {
                                this.logger.error(error_2);
                                return [2 /*return*/];
                            }
                            if (error_2.message && ((_b = error_2.message.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes('permission denied'))) {
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