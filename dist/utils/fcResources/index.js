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
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-base')];
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
                    case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-base')];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZmNSZXNvdXJjZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0U7QUFDeEUsa0RBQXVCO0FBQ3ZCLDhDQUF3QjtBQUN4Qix1REFBaUM7QUFDakMsb0NBQXFDO0FBQ3JDLDJDQUFrRDtBQUdsRCxrQ0FBaUM7QUFFakMsSUFBTSx3QkFBd0IsR0FBRyw4QkFBOEIsQ0FBQztBQUNoRSxJQUFNLHlCQUF5QixHQUFHLGlCQUFpQixDQUFDO0FBQ3BELElBQU0seUJBQXlCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUVuRixJQUFNLGdCQUFnQixHQUFHOzs7WUFDdkIsS0FBQSxDQUFBLEtBQUEsY0FBSSxDQUFBLENBQUMsSUFBSSxDQUFBO2tCQUFDLFNBQVM7O1lBQWdCLHFCQUFNLGlCQUFPLENBQUMsVUFBVSxFQUFFLEVBQUE7Z0JBQTdELHNCQUFBLHdCQUFxQixNQUFjLFNBQTBCLFVBQU0sR0FBQyxFQUFBOztTQUFBLENBQUM7QUFFdkU7SUFNRSxtQkFBWSxRQUFnQixFQUFFLE9BQXFCO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVLLHdCQUFJLEdBQVYsVUFBVyxNQUFlLEVBQUUsZ0JBQXdCOzs7Ozs7d0JBQ2xELEtBQUEsSUFBSSxDQUFBO3dCQUFVLHFCQUFNLG9CQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7d0JBQXBELEdBQUssTUFBTSxHQUFHLFNBQXNDLENBQUM7d0JBRXJELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxN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