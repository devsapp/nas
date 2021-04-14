"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var path_1 = __importDefault(require("path"));
var version_1 = __importDefault(require("../version"));
var client_1 = require("../client");
var constant_1 = require("../../constant");
var utils_1 = require("../utils");
var ENSURENASDIREXISTSERVICE = 'ensure-nas-dir-exist-service';
var ENSURENASDIREXISTFUNCTION = 'nas_dir_checker';
var ENSURENASDIREXISTFILENAME = path_1.default.join(__dirname, 'ensure-nas-dir-exist.zip');
var getNasServerFile = function () { return __awaiter(void 0, void 0, void 0, function () { var _a, _b, _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = path_1.default).join;
            _c = [__dirname];
            _d = "nas-server-";
            return [4 /*yield*/, version_1.default.getVersion()];
        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d + (_e.sent()) + ".zip"]))];
    }
}); }); };
var Resources = /** @class */ (function () {
    function Resources(regionId, profile) {
        this.fcClient = client_1.fcClient(regionId, profile);
        this.profile = profile;
    }
    Resources.prototype.init = function (inputs, mountPointDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, core_1.loadComponent('fc-base')];
                    case 1:
                        _a.fcBase = _b.sent();
                        return [4 /*yield*/, this.deployEnsureNasDir(inputs, mountPointDomain)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.deployNasService(inputs, mountPointDomain)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var fcBase, nasServiceInputs, ensureNasDirInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.loadComponent('fc-base')];
                    case 1:
                        fcBase = _a.sent();
                        return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs), '', false)];
                    case 2:
                        nasServiceInputs = _a.sent();
                        nasServiceInputs.args = 'service -s -y';
                        return [4 /*yield*/, fcBase.remove(nasServiceInputs)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs), '', true)];
                    case 4:
                        ensureNasDirInputs = _a.sent();
                        ensureNasDirInputs.args = 'service -s -y';
                        return [4 /*yield*/, fcBase.remove(ensureNasDirInputs)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.deployNasService = function (inputs, mountPointDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var nasServiceInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs), mountPointDomain, false)];
                    case 1:
                        nasServiceInputs = _a.sent();
                        this.logger.warn("deploy nas service");
                        return [4 /*yield*/, this.fcBase.deploy(nasServiceInputs)];
                    case 2:
                        _a.sent();
                        this.logger.warn("Waiting for trigger to be up");
                        return [4 /*yield*/, utils_1.sleep(5000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.deployEnsureNasDir = function (inputs, mountPointDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var ensureNasDirInputs, f, _a, mountDir, nasDir;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs), mountPointDomain, true)];
                    case 1:
                        ensureNasDirInputs = _b.sent();
                        return [4 /*yield*/, this.fcBase.deploy(ensureNasDirInputs)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, utils_1.sleep(1000)];
                    case 3:
                        _b.sent();
                        f = ensureNasDirInputs.props.function;
                        _a = inputs.props, mountDir = _a.mountDir, nasDir = _a.nasDir;
                        this.logger.debug("Invoke fc function, service name is: " + f.service + ", function name is: " + f.name + ", event is: " + JSON.stringify([nasDir]));
                        return [4 /*yield*/, this.invokeFcUtilsFunction(f.service, f.name, JSON.stringify([path_1.default.join(mountDir, nasDir)]))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.transformYamlConfigToFcbaseConfig = function (inputs, mountPointDomain, isEnsureNasDirExist) {
        return __awaiter(this, void 0, void 0, function () {
            var output, _a, regionId, serviceName, _b, functionName, role, 
            // vpcId,
            vSwitchId, securityGroupId, mountDir, nasDir, _c, userId, _d, groupId, service, funName, props, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        output = inputs;
                        _a = inputs.props, regionId = _a.regionId, serviceName = _a.serviceName, _b = _a.functionName, functionName = _b === void 0 ? constant_1.FUNNAME : _b, role = _a.role, vSwitchId = _a.vSwitchId, securityGroupId = _a.securityGroupId, mountDir = _a.mountDir, nasDir = _a.nasDir, _c = _a.userId, userId = _c === void 0 ? 10003 : _c, _d = _a.groupId, groupId = _d === void 0 ? 10003 : _d;
                        service = isEnsureNasDirExist
                            ? serviceName + "-" + ENSURENASDIREXISTSERVICE
                            : serviceName;
                        funName = isEnsureNasDirExist ? ENSURENASDIREXISTFUNCTION : functionName;
                        _e = {
                            region: regionId,
                            service: {
                                name: service,
                                role: role,
                                vpcConfig: {
                                    // vpcId,
                                    securityGroupId: securityGroupId,
                                    vswitchIds: [vSwitchId],
                                },
                                nasConfig: {
                                    userId: userId,
                                    groupId: groupId,
                                    mountPoints: [
                                        {
                                            serverAddr: mountPointDomain + ":/" + (isEnsureNasDirExist ? '' : nasDir),
                                            mountDir: mountDir,
                                        },
                                    ],
                                },
                            }
                        };
                        _f = {
                            service: service,
                            name: funName,
                            handler: 'index.handler',
                            timeout: 600,
                            memorySize: 256
                        };
                        if (!isEnsureNasDirExist) return [3 /*break*/, 1];
                        _g = ENSURENASDIREXISTFILENAME;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, getNasServerFile()];
                    case 2:
                        _g = _h.sent();
                        _h.label = 3;
                    case 3:
                        props = (_e.function = (_f.filename = _g,
                            _f.runtime = 'nodejs12',
                            _f.environmentVariables = {
                                PATH: '/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/code/bin'
                            },
                            _f),
                            _e);
                        if (!isEnsureNasDirExist) {
                            props.triggers = [
                                {
                                    name: 'httpTrigger',
                                    function: funName,
                                    service: service,
                                    type: 'http',
                                    config: {
                                        authType: 'function',
                                        methods: ['POST', 'GET'],
                                    },
                                },
                            ];
                        }
                        lodash_1.default.forEach(inputs, function (value, key) {
                            var k = lodash_1.default.lowerFirst(key);
                            if (k === 'properties' || !lodash_1.default.isObject(value)) {
                                output[k] = value;
                            }
                            else {
                                output[k] = lodash_1.default.mapKeys(value, function (v, k) { return lodash_1.default.lowerFirst(k); });
                            }
                        });
                        output.credentials = this.profile;
                        output.props = props;
                        output.args += ' -s -y';
                        return [2 /*return*/, output];
                }
            });
        });
    };
    Resources.prototype.invokeFcUtilsFunction = function (serviceName, functionName, event) {
        return __awaiter(this, void 0, void 0, function () {
            var rs, log, decodedLog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fcClient.invokeFunction(serviceName, functionName, event, {
                            'X-Fc-Log-Type': 'Tail',
                        })];
                    case 1:
                        rs = _a.sent();
                        if (rs.data !== 'OK') {
                            log = rs.headers['x-fc-log-result'];
                            if (log) {
                                decodedLog = Buffer.from(log, 'base64');
                                this.logger.warn("Invoke fc function " + serviceName + "/" + functionName + " response is: " + decodedLog);
                                if (decodedLog.toString().toLowerCase().includes('permission denied')) {
                                    throw new Error("fc utils function " + functionName + " invoke error, error message is: " + decodedLog);
                                }
                                throw new Error("fc utils function " + functionName + " invoke error, error message is: " + decodedLog);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Resources.prototype, "logger", void 0);
    return Resources;
}());
exports.default = Resources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZmNSZXNvdXJjZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0U7QUFDeEUsa0RBQXVCO0FBQ3ZCLDhDQUF3QjtBQUN4Qix1REFBaUM7QUFDakMsb0NBQXFDO0FBQ3JDLDJDQUFrRDtBQUdsRCxrQ0FBaUM7QUFFakMsSUFBTSx3QkFBd0IsR0FBRyw4QkFBOEIsQ0FBQztBQUNoRSxJQUFNLHlCQUF5QixHQUFHLGlCQUFpQixDQUFDO0FBQ3BELElBQU0seUJBQXlCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUVuRixJQUFNLGdCQUFnQixHQUFHOzs7WUFDdkIsS0FBQSxDQUFBLEtBQUEsY0FBSSxDQUFBLENBQUMsSUFBSSxDQUFBO2tCQUFDLFNBQVM7O1lBQWdCLHFCQUFNLGlCQUFPLENBQUMsVUFBVSxFQUFFLEVBQUE7Z0JBQTdELHNCQUFBLHdCQUFxQixNQUFjLFNBQTBCLFVBQU0sR0FBQyxFQUFBOztTQUFBLENBQUM7QUFFdkU7SUFNRSxtQkFBWSxRQUFnQixFQUFFLE9BQXFCO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVLLHdCQUFJLEdBQVYsVUFBVyxNQUFlLEVBQUUsZ0JBQXdCOzs7Ozs7d0JBQ2xELEtBQUEsSUFBSSxDQUFBO3dCQUFVLHFCQUFNLG9CQUFhLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUE1QyxHQUFLLE1BQU0sR0FBRyxTQUE4QixDQUFDO3dCQUU3QyxxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFB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