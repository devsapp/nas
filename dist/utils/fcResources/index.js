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
                        return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(inputs, '', false)];
                    case 2:
                        nasServiceInputs = _a.sent();
                        nasServiceInputs.args = 'service -s -y';
                        return [4 /*yield*/, fcBase.remove(nasServiceInputs)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(inputs, '', true)];
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
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(inputs, mountPointDomain, false)];
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
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(inputs, mountPointDomain, true)];
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
                            timeout: 600
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
                            _f.runtime = 'nodejs8',
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