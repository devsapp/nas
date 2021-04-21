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
    NasCompoent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                delete inputs.Credentials;
                // @ts-ignore
                delete inputs.credentials;
                this.logger.debug("inputs params: " + JSON.stringify(inputs));
                return [2 /*return*/, inputs];
            });
        });
    };
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        inputs = _b.sent();
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'deploy',
                        });
                        properties = lodash_1.default.cloneDeep(inputs.props);
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        fileSystemId = '';
                        if (!properties.mountPointDomain) return [3 /*break*/, 3];
                        mountPointDomain = properties.mountPointDomain;
                        this.logger.info("Specify parameters, reuse configuration.");
                        return [3 /*break*/, 5];
                    case 3:
                        nas = new nas_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, nas.init(properties)];
                    case 4:
                        nasInitResponse = _b.sent();
                        this.logger.debug("Nas init response is: " + JSON.stringify(nasInitResponse));
                        mountPointDomain = nasInitResponse.mountTargetDomain;
                        fileSystemId = nasInitResponse.fileSystemId;
                        _b.label = 5;
                    case 5:
                        this.logger.debug("Create nas success, mountPointDomain: " + mountPointDomain);
                        mountDir = utils_1.getMountDir(mountPointDomain, inputs.props.nasDir);
                        inputs.props.nasDir = utils_1.nasUriHandler(inputs.props.nasDir);
                        this.logger.debug("Whether to open the service configuration: " + !isNasServerStale);
                        if (!!isNasServerStale) return [3 /*break*/, 7];
                        inputs.props.mountDir = mountDir;
                        fc = new fcResources_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, fc.init(inputs, mountPointDomain)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, { mountPointDomain: mountPointDomain, fileSystemId: fileSystemId, mountDir: mountDir }];
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
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        inputs = _b.sent();
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant.HELP);
                            return [2 /*return*/];
                        }
                        regionId = inputs.props.regionId;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'remove',
                        });
                        fc = new fcResources_1.default(regionId, credentials);
                        return [4 /*yield*/, fc.remove(inputs)];
                    case 3:
                        _b.sent();
                        nas = new nas_1.default(regionId, credentials);
                        return [4 /*yield*/, nas.remove(inputs.props)];
                    case 4:
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
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        inputs = _d.sent();
                        apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
                        _a = core_1.commandParse({ args: inputs.args }, apts).data, commandData = _a === void 0 ? {} : _a;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if (commandData.help) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        _b = inputs.props, regionId = _b.regionId, serviceName = _b.serviceName, _c = _b.functionName, functionName = _c === void 0 ? constant.FUNNAME : _c, nasDirYmlInput = _b.nasDir;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'ls',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 3:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 4:
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
                    case 5:
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
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        inputs = _d.sent();
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
                    case 2:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'rm',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 3:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 4:
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
                    case 5:
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
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        inputs = _d.sent();
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
                    case 2:
                        credentials = _d.sent();
                        core_1.reportComponent(constant.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'cp',
                        });
                        return [4 /*yield*/, version_1.default.isNasServerStale(credentials, regionId, serviceName, functionName)];
                    case 3:
                        isNasServerStale = _d.sent();
                        return [4 /*yield*/, this.deploy(inputs, isNasServerStale)];
                    case 4:
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
                    case 5:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLGtEQUF1QjtBQUN2QixtREFBdUM7QUFFdkMsb0RBQThCO0FBQzlCLDBEQUFvQztBQUNwQyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHVDQUEyRDtBQUMzRCw4Q0FBbUQ7QUFFbkQsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzQjtJQUFBO0lBd1BBLENBQUM7SUFyUE8sbUNBQWEsR0FBbkIsVUFBb0IsTUFBTTs7O2dCQUN4QixhQUFhO2dCQUNiLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDMUIsYUFBYTtnQkFDYixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7Z0JBRTlELHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2Y7SUFFSyw0QkFBTSxHQUFaLFVBQWEsTUFBZSxFQUFFLGdCQUF5Qjs7Ozs7OzRCQUM1QyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBekMsTUFBTSxHQUFHLFNBQWdDLENBQUM7d0JBRXBDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxXQUFXLEdBQVEsbUJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxNQUFN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