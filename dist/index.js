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
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.debug('Create nas start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.credentials) === null || _b === void 0 ? void 0 : _b.Alias)];
                    case 1:
                        credentials = _c.sent();
                        properties = lodash_1.default.cloneDeep(inputs.props);
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        fileSystemId = '';
                        if (!properties.mountPointDomain) return [3 /*break*/, 2];
                        mountPointDomain = properties.mountPointDomain;
                        this.logger.info("Specify parameters, reuse configuration.");
                        return [3 /*break*/, 4];
                    case 2:
                        nas = new nas_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, nas.init(properties)];
                    case 3:
                        nasInitResponse = _c.sent();
                        this.logger.debug("Nas init response is: " + JSON.stringify(nasInitResponse));
                        mountPointDomain = nasInitResponse.mountTargetDomain;
                        fileSystemId = nasInitResponse.fileSystemId;
                        _c.label = 4;
                    case 4:
                        this.logger.debug("Create nas success, mountPointDomain: " + mountPointDomain);
                        mountDir = utils_1.getMountDir(mountPointDomain, inputs.props.nasDir);
                        inputs.props.nasDir = utils_1.nasUriHandler(inputs.props.nasDir);
                        this.logger.debug("Whether to open the service configuration: " + !isNasServerStale);
                        if (!!isNasServerStale) return [3 /*break*/, 6];
                        inputs.props.mountDir = mountDir;
                        fc = new fcResources_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, fc.init(inputs, mountPointDomain)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/, { mountPointDomain: mountPointDomain, fileSystemId: fileSystemId, mountDir: mountDir }];
                }
            });
        });
    };
    NasCompoent.prototype.remove = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, regionId, credentials, fc, nas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.debug('Remove nas start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.HELP);
                            return [2 /*return*/];
                        }
                        regionId = inputs.props.regionId;
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.credentials) === null || _b === void 0 ? void 0 : _b.Alias)];
                    case 1:
                        credentials = _c.sent();
                        fc = new fcResources_1.default(regionId, credentials);
                        return [4 /*yield*/, fc.remove(inputs)];
                    case 2:
                        _c.sent();
                        nas = new nas_1.default(regionId, credentials);
                        return [4 /*yield*/, nas.remove(inputs.props)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.ls = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, _b, commandData, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, argv_paras, nasDirCommonInput, isAllOpt, isLongOpt;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
                        _b = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if (commandData.help) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.props, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir;
                        return [4 /*yield*/, core_1.getCredential((_a = inputs.credentials) === null || _a === void 0 ? void 0 : _a.Alias)];
                    case 1:
                        credentials = _e.sent();
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _e.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_e.sent()).mountDir;
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
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.rm = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, _b, commandData, argv_paras, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, targetPath, isRootDir;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = {
                            boolean: ['recursive', 'force', 'help'],
                            alias: { recursive: 'r', force: 'f', help: 'h' },
                        };
                        _b = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || !argv_paras[0]) {
                            core_1.help(constant.RMHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.props, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir;
                        return [4 /*yield*/, core_1.getCredential((_a = inputs.credentials) === null || _a === void 0 ? void 0 : _a.Alias)];
                    case 1:
                        credentials = _e.sent();
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _e.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_e.sent()).mountDir;
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
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.cp = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, _b, commandData, argv_paras, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, excludes, credentials, isNasServerStale, mountDir, common;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = {
                            boolean: ['recursive', 'help', 'no-clobber'],
                            alias: { recursive: 'r', 'no-clobber': 'n', help: 'h' },
                        };
                        _b = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || argv_paras.length !== 2) {
                            core_1.help(constant.CPHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.props, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir, excludes = _c.excludes;
                        return [4 /*yield*/, core_1.getCredential((_a = inputs.credentials) === null || _a === void 0 ? void 0 : _a.Alias)];
                    case 1:
                        credentials = _e.sent();
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _e.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_e.sent()).mountDir;
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
                            })];
                    case 4:
                        _e.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTStCO0FBQy9CLGtEQUF1QjtBQUN2QixtREFBdUM7QUFFdkMsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHVDQUEyRDtBQUMzRCw4Q0FBbUQ7QUFFbkQ7SUFBQTtJQTBOQSxDQUFDO0lBdk5PLDRCQUFNLEdBQVosVUFBYSxNQUFlLEVBQUUsZ0JBQXlCOzs7Ozs7O3dCQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDO3dCQUV4RCxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt3QkFDbkQsV0FBVyxHQUFRLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFDO3dCQUNyRSxVQUFJLFdBQVcsQ0FBQyxJQUFJLDBDQUFFLElBQUksRUFBRTs0QkFDMUIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDcEIsc0JBQU87eUJBQ1I7d0JBRW1CLHFCQUFNLG9CQUFhLE9BQUMsTUFBTSxDQUFDLFdBQVcsMENB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