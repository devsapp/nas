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
var interface_1 = require("./interface");
var nas_1 = __importDefault(require("./utils/nas"));
var common_1 = __importDefault(require("./utils/common"));
var version_1 = __importDefault(require("./utils/version"));
var fcResources_1 = __importDefault(require("./utils/fcResources"));
var utils_1 = require("./utils/utils");
var utils_2 = require("./utils/common/utils");
var NasCompoent = /** @class */ (function () {
    function NasCompoent() {
    }
    NasCompoent.prototype.getCredentials = function (credentials, provider, accessAlias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Obtain the key configuration, whether the key needs to be obtained separately: " + lodash_1.default.isEmpty(credentials));
                        if (interface_1.isCredentials(credentials)) {
                            return [2 /*return*/, credentials];
                        }
                        return [4 /*yield*/, core_1.getCredential(provider, accessAlias)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NasCompoent.prototype.deploy = function (inputs, isNasServerStale) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, credentials, properties, mountPointDomain, fileSystemId, nas, nasInitResponse, mountDir, fc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug('Create nas start...');
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        inputs.Credentials = credentials;
                        properties = lodash_1.default.cloneDeep(inputs.Properties);
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
                        mountDir = utils_1.getMountDir(mountPointDomain, inputs.Properties.nasDir);
                        inputs.Properties.nasDir = utils_1.nasUriHandler(inputs.Properties.nasDir);
                        this.logger.debug("Whether to open the service configuration: " + !isNasServerStale);
                        if (!!isNasServerStale) return [3 /*break*/, 6];
                        inputs.Properties.mountDir = mountDir;
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, regionId, credentials, fc, nas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug('Remove nas start...');
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        regionId = inputs.Properties.regionId;
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        inputs.Credentials = credentials;
                        fc = new fcResources_1.default(regionId, credentials);
                        return [4 /*yield*/, fc.remove(inputs)];
                    case 2:
                        _b.sent();
                        nas = new nas_1.default(regionId, credentials);
                        return [4 /*yield*/, nas.remove(inputs.Properties)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.ls = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, apts, _b, commandData, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, argv_paras, nasDirCommonInput, isAllOpt, isLongOpt;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['a', 'all', 'l', 'long'], alias: { all: 'a', long: 'l' } };
                        _b = core_1.commandParse({ args: inputs.Args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if (commandData.help) {
                            core_1.help(constant.LSHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.Properties, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir;
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _e.sent();
                        inputs.Credentials = credentials;
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, apts, _b, commandData, argv_paras, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, credentials, isNasServerStale, mountDir, common, targetPath, isRootDir;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        apts = {
                            boolean: ['r', 'recursive', 'f', 'force'],
                            alias: { recursive: 'r', force: 'f' },
                        };
                        _b = core_1.commandParse({ args: inputs.Args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || !argv_paras[0]) {
                            core_1.help(constant.RMHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.Properties, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir;
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _e.sent();
                        inputs.Credentials = credentials;
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
                                recursive: commandData.r,
                                force: commandData.f,
                            })];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NasCompoent.prototype.cp = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, apts, _b, commandData, argv_paras, _c, regionId, serviceName, _d, functionName, nasDirYmlInput, excludes, credentials, isNasServerStale, mountDir, common;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        apts = {
                            boolean: ['recursive', 'r', 'no-clobber', 'n'],
                            alias: { recursive: 'r', 'no-clobber': 'n' },
                        };
                        _b = core_1.commandParse({ args: inputs.Args }, apts).data, commandData = _b === void 0 ? {} : _b;
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        argv_paras = commandData._ || [];
                        if (commandData.help || argv_paras.length !== 2) {
                            core_1.help(constant.CPHELP);
                            return [2 /*return*/];
                        }
                        _c = inputs.Properties, regionId = _c.regionId, serviceName = _c.serviceName, _d = _c.functionName, functionName = _d === void 0 ? constant.FUNNAME : _d, nasDirYmlInput = _c.nasDir, excludes = _c.excludes;
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _e.sent();
                        inputs.Credentials = credentials;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBTytCO0FBQy9CLGtEQUF1QjtBQUN2QixtREFBdUM7QUFDdkMseUNBQXNGO0FBQ3RGLG9EQUE4QjtBQUM5QiwwREFBb0M7QUFDcEMsNERBQXNDO0FBQ3RDLG9FQUE4QztBQUM5Qyx1Q0FBMkQ7QUFDM0QsOENBQW1EO0FBRW5EO0lBQUE7SUE4UEEsQ0FBQztJQTNQTyxvQ0FBYyxHQUFwQixVQUNFLFdBQThCLEVBQzlCLFFBQWdCLEVBQ2hCLFdBQW9COzs7Ozt3QkFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ysb0ZBQWtGLGdCQUFDLENBQUMsT0FBTyxDQUN6RixXQUFXLENBQ1YsQ0FDSixDQUFDO3dCQUNGLElBQUkseUJBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDOUIsc0JBQU8sV0FBVyxFQUFDO3lCQUNwQjt3QkFDTSxxQkFBTSxvQkFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFBQTs0QkFBakQsc0JBQU8sU0FBMEMsRUFBQzs7OztLQUNuRDtJQUVLLDRCQUFNLEdBQVosVUFBYSxNQUFpQixFQUFFLGdCQUF5Qjs7Ozs7O3dCQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUVuQyxLQUlGLE1BQU0sQ0FBQyxPQUFPLEVBSEgsV0FBVyxpQkFBQSxFQUNkLFFBQVEsY0FBQSxFQUNMLFdBQVcsaUJBQUEsQ0FDUDt3QkFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBSSxXQUFXLHlCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7d0JBRTNELHFCQUFNLElBQUks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