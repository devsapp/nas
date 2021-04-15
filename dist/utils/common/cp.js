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
            var srcPath, targetPath, mountDir, nasDirYmlInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcPath = options.srcPath, targetPath = options.targetPath, mountDir = options.mountDir, nasDirYmlInput = options.nasDirYmlInput;
                        if (!srcPath || !targetPath) {
                            this.logger.error('Input path empty error, please input again!');
                            return [2 /*return*/];
                        }
                        if (!this.isCpFromLocalToNas(srcPath, targetPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cpFromLocalToNas(options)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!this.isCpFromNasToLocal(srcPath, targetPath)) return [3 /*break*/, 4];
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
    Cp.prototype.isCpFromLocalToNas = function (srcPath, targetPath) {
        return !utils.isNasProtocol(srcPath) && utils.isNasProtocol(targetPath);
    };
    Cp.prototype.isCpFromNasToLocal = function (srcPath, targetPath) {
        return utils.isNasProtocol(srcPath) && !utils.isNasProtocol(targetPath);
    };
    __decorate([
        core_1.HLogger(constant.CONTEXT),
        __metadata("design:type", Object)
    ], Cp.prototype, "logger", void 0);
    return Cp;
}());
exports.default = Cp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL2NwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLGtEQUE0QjtBQUM1QixzREFBK0I7QUFDL0IsOENBQXNGO0FBQ3RGLG9DQUFxQztBQUVyQywrQ0FTd0I7QUFDeEIsdURBQTJDO0FBQzNDLDZDQUFpQztBQThCakM7SUFJRSxZQUFZLFFBQWdCLEVBQUUsV0FBeUI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUssZUFBRSxHQUFSLFVBQVMsT0FBWTs7Ozs7O3dCQUNYLE9BQU8sR0FBMkMsT0FBTyxRQUFsRCxFQUFFLFVBQVUsR0FBK0IsT0FBTyxXQUF0QyxFQUFFLFFBQVEsR0FBcUIsT0FBTyxTQUE1QixFQUFFLGNBQWMsR0FBSyxPQUFPLGVBQVosQ0FBYTt3QkFDbEUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTs0QkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQzs0QkFDakUsc0JBQU87eUJBQ1I7NkJBRUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBNUMsd0JBQTRDO3dCQUM5QyxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7NkJBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQTVDLHdCQUE0Qzt3QkFDckQscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixD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