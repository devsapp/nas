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
process.setMaxListeners(0);
var NasCompoent = /** @class */ (function () {
    function NasCompoent() {
    }
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc;
            return __generator(this, function (_b) {
                switch (_b.label) {
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
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'deploy',
                        });
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
                        if (!!isNasServerStale) return [3 /*break*/, 6];
                        inputs.props.mountDir = mountDir;
                        fc = new fcResources_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, fc.init(inputs, mountPointDomain)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, { mountPointDomain: mountPointDomain, fileSystemId: fileSystemId, mountDir: mountDir }];
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
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'remove',
                        });
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
            var apts, _a, commandData, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, argv_paras, nasDirCommonInput, isAllOpt, isLongOpt;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if (commandData.help) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'ls',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_d.sent()).mountDir;
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
            var apts, _a, commandData, argv_paras, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, targetPath, isRootDir;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
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
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'rm',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_d.sent()).mountDir;
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
    NasCompoent.prototype.cp = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, _a, commandData, argv_paras, _b, regionId, serviceName, _c, functionName, nasDirYmlInput, excludes, credentials, isNasServerStale, mountDir, common;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = {
                            boolean: ['recursive', 'help', 'no-clobber'],
                            alias: { recursive: 'r', 'no-clobber': 'n', help: 'h' },
                        };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || argv_paras.length !== 2) {
                            core_1.help(constant.CPHELP);
                            return [2 /*return*/];
                        }
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir, excludes = _b.excludes;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'cp',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 2:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 3:
                        mountDir = (_d.sent()).mountDir;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLGtEQUF1QjtBQUN2QixtREFBdUM7QUFFdkMsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHVDQUEyRDtBQUMzRCw4Q0FBbUQ7QUFFbkQsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzQjtJQUFBO0lBZ1BBLENBQUM7SUE3T08sNEJBQU0sR0FBWixVQUFhLE1BQWUsRUFBRSxnQkFBeUI7Ozs7Ozs7d0JBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7d0JBRXhELElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxXQUFXLEdBQVEsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBRyxDQUFDLENBQUM7d0JBQ3JFLFVBQUksV0FBVyxDQUFDLElBQUksMENBQUUsSUFBSSxFQUFFOzRCQUMxQixXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNwQixzQkFBTzt5QkFDUjt3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