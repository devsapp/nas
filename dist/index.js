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
var core_1 = require("@serverless-devs/core");
var fc_1 = __importDefault(require("./utils/fcResources/fc"));
var lodash_1 = __importDefault(require("lodash"));
var constant = __importStar(require("./constant"));
var nas_1 = __importDefault(require("./utils/nas"));
var common_1 = __importDefault(require("./utils/common"));
var version_1 = __importDefault(require("./utils/version"));
var fcResources_1 = __importDefault(require("./utils/fcResources"));
var utils_1 = require("./utils/utils");
var utils_2 = require("./utils/common/utils");
var NasCompoent = /** @class */ (function () {
    function NasCompoent() {
    }
    NasCompoent.prototype.deleteCredentials = function (inputs) {
        // @ts-ignore
        delete inputs.Credentials;
        // @ts-ignore
        delete inputs.credentials;
        this.logger.debug("inputs params: " + JSON.stringify(inputs));
    };
    NasCompoent.prototype.reportComponent = function (command, uid) {
        if (uid) {
            core_1.reportComponent(constant.CONTEXT_NAME, { uid: uid, command: command });
        }
    };
    NasCompoent.prototype.handlerInputs = function (inputs, command) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, regionId, serviceName, _b, functionName, isNasServerStale, mountDir;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _c.sent();
                        if (command) {
                            this.reportComponent(command, credentials.AccountID);
                        }
                        _a = inputs.props, regionId = _a.regionId, serviceName = _a.serviceName, _b = _a.functionName, functionName = _b === void 0 ? constant.FUNNAME : _b;
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _c.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_c.sent()).mountDir;
                        inputs.props.mountDir = mountDir;
                        this.deleteCredentials(inputs);
                        return [2 /*return*/, inputs];
                }
            });
        });
    };
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc, service;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deleteCredentials(inputs);
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.DEPLOY_HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        if (!isNasServerStale) {
                            this.reportComponent('deploy', credentials.AccountID);
                        }
                        properties = lodash_1.default.cloneDeep(inputs.props);
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        fileSystemId = '';
                        if (!properties.mountPointDomain) return [3 /*break*/, 2];
                        mountPointDomain = properties.mountPointDomain;
                        this.logger.info('Specify parameters, reuse configuration.');
                        return [3 /*break*/, 4];
                    case 2:
                        nas = new nas_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, nas.init(properties)];
                    case 3:
                        nasInitResponse = _b.sent();
                        this.logger.debug("Nas init response is: " + JSON.stringify(nasInitResponse));
                        mountPointDomain = nasInitResponse.mountTargetDomain;
                        fileSystemId = nasInitResponse.fileSystemId;
                        _b.label = 4;
                    case 4:
                        this.logger.debug("Create nas success, mountPointDomain: " + mountPointDomain);
                        mountDir = utils_1.getMountDir(mountPointDomain, inputs.props.nasDir);
                        inputs.props.nasDir = utils_1.nasUriHandler(inputs.props.nasDir);
                        this.logger.debug("Whether to open the service configuration: " + !isNasServerStale);
                        inputs.props.mountDir = mountDir;
                        fc = new fcResources_1.default(properties.regionId, credentials);
                        if (!!isNasServerStale) return [3 /*break*/, 6];
                        return [4 /*yield*/, fc.init(inputs, mountPointDomain)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, fc.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), mountPointDomain, false)];
                    case 7:
                        service = (_b.sent()).service;
                        return [4 /*yield*/, fc_1.default.makeService(fc.fcClient, service)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, { mountPointDomain: mountPointDomain, fileSystemId: fileSystemId, mountDir: mountDir }];
                }
            });
        });
    };
    NasCompoent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, regionId, credentials, fc, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deleteCredentials(inputs);
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.REOMVE_HELP);
                            return [2 /*return*/];
                        }
                        regionId = inputs.props.regionId;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        this.reportComponent('remove', credentials.AccountID);
                        fc = new fcResources_1.default(regionId, credentials);
                        return [4 /*yield*/, fc.remove(inputs)];
                    case 2:
                        _b.sent();
                        nas = new nas_1.default(regionId, credentials);
                        return [4 /*yield*/, nas.remove(inputs.props)];
                    case 3:
                        _b.sent();
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
                        return [4 /*yield*/, this.handlerInputs(inputs, 'ls')];
                    case 1:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
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
                    case 3:
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
                        return [4 /*yield*/, this.handlerInputs(inputs, 'rm')];
                    case 1:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
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
                    case 3:
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
                        return [4 /*yield*/, this.handlerInputs(inputs, command)];
                    case 1:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, excludes = _b.excludes, mountDir = _b.mountDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
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
                    case 3:
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
                        args = inputs.args.replace('--debug', '').trim();
                        return [4 /*yield*/, this.handlerInputs(inputs, 'command')];
                    case 1:
                        inputs = _d.sent();
                        _b = inputs.props, regionId = _b.regionId, nasDir = _b.nasDir, mountDir = _b.mountDir, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _d.sent();
                        common = new common_1.default.Command(regionId, credentials);
                        return [4 /*yield*/, common.command({
                                serviceName: serviceName,
                                functionName: functionName,
                                args: args,
                                mountDir: mountDir,
                                nasDir: nasDir,
                            })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant.CONTEXT),
        __metadata("design:type", Object)
    ], NasCompoent.prototype, "logger", void 0);
    return NasCompoent;
}());
exports.default = NasCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLDhEQUF3QztBQUN4QyxrREFBdUI7QUFDdkIsbURBQXVDO0FBRXZDLG9EQUE4QjtBQUM5QiwwREFBb0M7QUFDcEMsNERBQXNDO0FBQ3RDLG9FQUE4QztBQUM5Qyx1Q0FBMkQ7QUFDM0QsOENBQW1EO0FBRW5EO0lBQUE7SUE2UkEsQ0FBQztJQTFSQyx1Q0FBaUIsR0FBakIsVUFBa0IsTUFBTTtRQUN0QixhQUFhO1FBQ2IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFCLGFBQWE7UUFDYixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQscUNBQWUsR0FBZixVQUFnQixPQUFlLEVBQUUsR0FBVztRQUMxQyxJQUFJLEdBQUcsRUFBRTtZQUNQLHNCQUFlLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsS0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFSyxtQ0FBYSxHQUFuQixVQUFvQixNQUFNLEVBQUUsT0FBZ0I7Ozs7OzRCQUN0QixxQkFBTSxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUF4RCxXQUFXLEdBQUcsU0FBMEM7d0JBQzlELElBQUksT0FBTyxFQUFFOzRCQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDdEQ7d0JB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