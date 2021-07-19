"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var core_1 = require("@serverless-devs/core");
var fc_1 = __importDefault(require("./utils/fcResources/fc"));
var lodash_1 = __importDefault(require("lodash"));
var constant = __importStar(require("./constant"));
var stdout_formatter_1 = __importDefault(require("./stdout-formatter"));
var nas_1 = __importDefault(require("./utils/nas"));
var common_1 = __importDefault(require("./utils/common"));
var version_1 = __importDefault(require("./utils/version"));
var fcResources_1 = __importDefault(require("./utils/fcResources"));
var utils_1 = require("./utils/utils");
var utils_2 = require("./utils/common/utils");
var base_1 = __importDefault(require("./common/base"));
var NasCompoent = /** @class */ (function (_super) {
    __extends(NasCompoent, _super);
    function NasCompoent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, _c, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc, service;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug("input.props: " + JSON.stringify(inputs.props) + ", inputs.args: " + inputs.args);
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.DEPLOY_HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _d.sent();
                        _c = inputs.credentials;
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 2:
                        _c = (_d.sent());
                        _d.label = 3;
                    case 3:
                        credentials = _c;
                        if (!isNasServerStale) {
                            this.reportComponent('deploy', credentials.AccountID);
                        }
                        properties = lodash_1.default.cloneDeep(inputs.props);
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        fileSystemId = '';
                        if (!properties.mountPointDomain) return [3 /*break*/, 4];
                        mountPointDomain = properties.mountPointDomain;
                        this.logger.debug('Specify parameters, reuse configuration.');
                        return [3 /*break*/, 6];
                    case 4:
                        nas = new nas_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, nas.init(properties)];
                    case 5:
                        nasInitResponse = _d.sent();
                        this.logger.debug("Nas init response is: " + JSON.stringify(nasInitResponse));
                        mountPointDomain = nasInitResponse.mountTargetDomain;
                        fileSystemId = nasInitResponse.fileSystemId;
                        _super.prototype.__report.call(this, {
                            name: 'nas',
                            content: {
                                region: properties.regionId,
                                mountPointDomain: mountPointDomain,
                                fileSystemId: fileSystemId,
                            },
                        });
                        _d.label = 6;
                    case 6:
                        this.logger.debug("Create nas success, mountPointDomain: " + mountPointDomain);
                        mountDir = utils_1.getMountDir(mountPointDomain, inputs.props.nasDir);
                        inputs.props.nasDir = utils_1.nasUriHandler(inputs.props.nasDir);
                        this.logger.debug("Whether to open the service configuration: " + !isNasServerStale);
                        inputs.props.mountDir = mountDir;
                        fc = new fcResources_1.default(properties.regionId, credentials);
                        if (!!isNasServerStale) return [3 /*break*/, 8];
                        return [4 /*yield*/, fc.init(inputs, mountPointDomain)];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, fc.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), mountPointDomain, false)];
                    case 9:
                        service = (_d.sent()).service;
                        return [4 /*yield*/, fc_1.default.makeService(fc.fcClient, service)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [2 /*return*/, { mountPointDomain: mountPointDomain, fileSystemId: fileSystemId, mountDir: mountDir }];
                }
            });
        });
    };
    NasCompoent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, regionId, credentials, _b, fc, nas, fileSystemId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.debug("input.props: " + JSON.stringify(inputs.props) + ", inputs.args: " + inputs.args);
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.REOMVE_HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _c.sent();
                        regionId = inputs.props.regionId;
                        _b = inputs.credentials;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        credentials = _b;
                        this.reportComponent('remove', credentials.AccountID);
                        fc = new fcResources_1.default(regionId, credentials);
                        return [4 /*yield*/, fc.remove(inputs)];
                    case 4:
                        _c.sent();
                        nas = new nas_1.default(regionId, credentials);
                        return [4 /*yield*/, nas.remove(inputs.props)];
                    case 5:
                        fileSystemId = _c.sent();
                        if (fileSystemId) {
                            _super.prototype.__report.call(this, {
                                name: 'nas',
                                content: {
                                    region: regionId,
                                    mountPointDomain: '',
                                    fileSystemId: '',
                                },
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.ls = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, _a, commandData, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, mountDir, credentials, common, argv_paras, nasDirCommonInput, isAllOpt, isLongOpt;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if (commandData.help) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs, 'ls')];
                    case 2:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 3:
                        credentials = _d.sent();
                        common = new common_1.default.Ls(regionId, credentials);
                        argv_paras = commandData._ || [];
                        nasDirCommonInput = argv_paras[0];
                        if (!common.checkLsNasDir(nasDirCommonInput)) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        isAllOpt = commandData.all;
                        isLongOpt = commandData.long;
                        return [4 /*yield*/, common.ls({
                                targetPath: utils_2.parseNasUri(nasDirCommonInput, mountDir, nasDirYmlInput),
                                isAllOpt: isAllOpt,
                                isLongOpt: isLongOpt,
                                serviceName: serviceName,
                                functionName: functionName,
                            })];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.rm = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, _a, commandData, argv_paras, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, mountDir, credentials, common, targetPath, isRootDir;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['recursive', 'force', 'help'],
                            alias: { recursive: 'r', force: 'f', help: 'h' },
                        };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || !argv_paras[0]) {
                            core_1.help(constant.RMHELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs, 'rm')];
                    case 2:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 3:
                        credentials = _d.sent();
                        common = new common_1.default.Rm(regionId, credentials);
                        targetPath = utils_2.parseNasUri(argv_paras[0], mountDir, nasDirYmlInput);
                        isRootDir = mountDir + "/." === targetPath || mountDir + "/" === targetPath;
                        if (isRootDir) {
                            this.logger.debug("Rm root dir, mountDir is " + mountDir + ", targetPath is " + targetPath);
                        }
                        return [4 /*yield*/, common.rm({
                                serviceName: serviceName,
                                functionName: functionName,
                                isRootDir: isRootDir,
                                targetPath: isRootDir ? mountDir : targetPath,
                                recursive: commandData.recursive,
                                force: commandData.force,
                            })];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.cp = function (inputs, command) {
        if (command === void 0) { command = 'cp'; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, _a, commandData, argv_paras, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, excludes, mountDir, credentials, common;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['recursive', 'help', 'no-clobber'],
                            alias: { recursive: 'r', 'no-clobber': 'n', help: 'h' },
                        };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || argv_paras.length !== 2) {
                            core_1.help(constant[command.toLocaleUpperCase() + "HELP"]);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs, command)];
                    case 2:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, excludes = _b.excludes, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 3:
                        credentials = _d.sent();
                        common = new common_1.default.Cp(regionId, credentials);
                        return [4 /*yield*/, common.cp({
                                srcPath: argv_paras[0],
                                targetPath: argv_paras[1],
                                recursive: commandData.r,
                                noClobber: commandData.n,
                                serviceName: serviceName,
                                functionName: functionName,
                                noTargetDirectory: true,
                                mountDir: mountDir,
                                nasDirYmlInput: nasDirYmlInput,
                                excludes: excludes,
                                command: command,
                            })];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.upload = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cp(inputs, 'upload')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NasCompoent.prototype.download = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cp(inputs, 'download')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NasCompoent.prototype.command = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var commandData, args, _b, regionId, nasDir, mountDir, serviceName, _c, functionName, credentials, common;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        commandData = core_1.commandParse({ args: inputs.args }, { boolean: ['help'], alias: { help: 'h' } });
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.COMMANDHELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initFormatter()];
                    case 1:
                        _d.sent();
                        args = inputs.args.replace('--debug', '').trim();
                        return [4 /*yield*/, this.handlerInputs(inputs, 'command')];
                    case 2:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, nasDir = _b.nasDir, mountDir = _b.mountDir, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 3:
                        credentials = _d.sent();
                        common = new common_1.default.Command(regionId, credentials);
                        return [4 /*yield*/, common.command({
                                serviceName: serviceName,
                                functionName: functionName,
                                args: args,
                                mountDir: mountDir,
                                nasDir: nasDir,
                            })];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.reportComponent = function (command, uid) {
        core_1.reportComponent(constant.CONTEXT_NAME, { uid: uid, command: command });
    };
    NasCompoent.prototype.handlerInputs = function (inputs, command) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _b, _c, regionId, serviceName, _d, functionName, isNasServerStale, mountDir;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.logger.debug("input.props: " + JSON.stringify(inputs.props) + ", inputs.args: " + inputs.args);
                        _b = inputs.credentials;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, core_1.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b = (_e.sent());
                        _e.label = 2;
                    case 2:
                        credentials = _b;
                        if (command) {
                            this.reportComponent(command, credentials.AccountID);
                        }
                        _c = inputs.props, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d;
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 3:
                        isNasServerStale = _e.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 4:
                        mountDir = (_e.sent()).mountDir;
                        inputs.props.mountDir = mountDir;
                        return [2 /*return*/, inputs];
                }
            });
        });
    };
    NasCompoent.prototype.initFormatter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], NasCompoent.prototype, "logger", void 0);
    return NasCompoent;
}(base_1.default));
exports.default = NasCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQU8rQjtBQUMvQiw4REFBd0M7QUFDeEMsa0RBQXVCO0FBQ3ZCLG1EQUF1QztBQUV2Qyx3RUFBaUQ7QUFDakQsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHVDQUEyRDtBQUMzRCw4Q0FBbUQ7QUFDbkQsdURBQWlDO0FBRWpDO0lBQXlDLCtCQUFJO0lBQTdDOztJQTZTQSxDQUFDO0lBMVNPLDRCQUFNLEdBQVosVUFBYSxNQUFlLEVBQUUsZ0JBQXlCOzs7Ozs7O3dCQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUFrQixNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7d0JBQ3pGLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxXQUFXLEdBQVEsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBRyxDQUFDLENBQUM7d0JBQ3JFLFVBQUksV0FBVyxDQUFDLElBQUksMENBQUUsSUFBSSxFQUFFOzRCQUMxQixXQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMzQixzQkFBTzt5QkFD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