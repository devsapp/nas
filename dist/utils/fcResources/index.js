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
var fc_1 = __importDefault(require("./fc"));
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
            var vm, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner('Deploy helper function...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.deployEnsureNasDir(inputs, mountPointDomain)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.deployNasService(inputs, mountPointDomain)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        vm.fail();
                        throw ex_1;
                    case 5:
                        vm.succeed('upload done');
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var nasServiceProps, ensureNasDirProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), '', false)];
                    case 1:
                        nasServiceProps = _a.sent();
                        return [4 /*yield*/, fc_1.default.remove(this.fcClient, nasServiceProps)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), '', true)];
                    case 3:
                        ensureNasDirProps = _a.sent();
                        return [4 /*yield*/, fc_1.default.remove(this.fcClient, ensureNasDirProps)];
                    case 4:
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
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), mountPointDomain, false)];
                    case 1:
                        nasServiceInputs = _a.sent();
                        this.logger.debug('deploy nas service');
                        return [4 /*yield*/, fc_1.default.deploy(this.fcClient, nasServiceInputs)];
                    case 2:
                        _a.sent();
                        this.logger.debug('Waiting for trigger to be up');
                        return [4 /*yield*/, utils_1.sleep(2500)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.deployEnsureNasDir = function (inputs, mountPointDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var ensureNasDirProps, _a, serviceName, functionName, _b, mountDir, nasDir;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.transformYamlConfigToFcbaseConfig(lodash_1.default.cloneDeep(inputs.props), mountPointDomain, true)];
                    case 1:
                        ensureNasDirProps = _c.sent();
                        return [4 /*yield*/, fc_1.default.deploy(this.fcClient, ensureNasDirProps)];
                    case 2:
                        _c.sent();
                        _a = ensureNasDirProps.function, serviceName = _a.serviceName, functionName = _a.functionName;
                        _b = inputs.props, mountDir = _b.mountDir, nasDir = _b.nasDir;
                        this.logger.debug("Invoke fc function, service name is: " + serviceName + ", function name is: " + functionName + ", event is: " + JSON.stringify([nasDir]));
                        return [4 /*yield*/, this.invokeFcUtilsFunction(serviceName, functionName, utils_1.transformNasDirPath(JSON.stringify([path_1.default.join(mountDir, nasDir)])))];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.prototype.transformYamlConfigToFcbaseConfig = function (inputProps, mountPointDomain, isEnsureNasDirExist) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, serviceName, _a, functionName, role, vpcId, vSwitchId, securityGroupId, mountDir, nasDir, _b, userId, _c, groupId, service, funName, props, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        regionId = inputProps.regionId, serviceName = inputProps.serviceName, _a = inputProps.functionName, functionName = _a === void 0 ? constant_1.FUNNAME : _a, role = inputProps.role, vpcId = inputProps.vpcId, vSwitchId = inputProps.vSwitchId, securityGroupId = inputProps.securityGroupId, mountDir = inputProps.mountDir, nasDir = inputProps.nasDir, _b = inputProps.userId, userId = _b === void 0 ? 10003 : _b, _c = inputProps.groupId, groupId = _c === void 0 ? 10003 : _c;
                        service = isEnsureNasDirExist
                            ? serviceName + "-" + ENSURENASDIREXISTSERVICE
                            : serviceName;
                        funName = isEnsureNasDirExist ? ENSURENASDIREXISTFUNCTION : functionName;
                        _d = {
                            region: regionId,
                            service: {
                                serviceName: service,
                                role: role,
                                vpcConfig: {
                                    vpcId: vpcId,
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
                        _e = {
                            serviceName: service,
                            functionName: funName,
                            handler: 'index.handler',
                            timeout: 600,
                            memorySize: 256
                        };
                        if (!isEnsureNasDirExist) return [3 /*break*/, 1];
                        _f = ENSURENASDIREXISTFILENAME;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, getNasServerFile()];
                    case 2:
                        _f = _g.sent();
                        _g.label = 3;
                    case 3:
                        props = (_d.function = (_e.filename = _f,
                            _e.runtime = 'nodejs12',
                            _e.environmentVariables = {
                                PATH: '/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/code/bin',
                            },
                            _e),
                            _d);
                        if (!isEnsureNasDirExist) {
                            props.triggers = [
                                {
                                    serviceName: service,
                                    functionName: funName,
                                    triggerName: 'httpTrigger',
                                    triggerType: 'http',
                                    triggerConfig: {
                                        authType: 'function',
                                        methods: ['POST', 'GET'],
                                    },
                                },
                            ];
                        }
                        return [2 /*return*/, props];
                }
            });
        });
    };
    Resources.prototype.invokeFcUtilsFunction = function (serviceName, functionName, event) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var rs, log, decodedLog;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fcClient.invokeFunction(serviceName, functionName, event, {
                            'X-Fc-Log-Type': 'Tail',
                        })];
                    case 1:
                        rs = _b.sent();
                        if (rs.data !== 'OK') {
                            log = rs.headers['x-fc-log-result'];
                            if (log) {
                                decodedLog = Buffer.from(log, 'base64');
                                this.logger.warn("Invoke fc function " + serviceName + "/" + functionName + " response is: " + decodedLog);
                                if ((_a = decodedLog.toString().toLowerCase()) === null || _a === void 0 ? void 0 : _a.includes('permission denied')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZmNSZXNvdXJjZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBa0U7QUFDbEUsa0RBQXVCO0FBQ3ZCLDhDQUF3QjtBQUN4Qix1REFBaUM7QUFDakMsb0NBQXFDO0FBQ3JDLDJDQUFrRDtBQUVsRCxrQ0FBc0Q7QUFDdEQsNENBQXNCO0FBRXRCLElBQU0sd0JBQXdCLEdBQUcsOEJBQThCLENBQUM7QUFDaEUsSUFBTSx5QkFBeUIsR0FBRyxpQkFBaUIsQ0FBQztBQUNwRCxJQUFNLHlCQUF5QixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFFbkYsSUFBTSxnQkFBZ0IsR0FBRzs7O1lBQ3ZCLEtBQUEsQ0FBQSxLQUFBLGNBQUksQ0FBQSxDQUFDLElBQUksQ0FBQTtrQkFBQyxTQUFTOztZQUFnQixxQkFBTSxpQkFBTyxDQUFDLFVBQVUsRUFBRSxFQUFBO2dCQUE3RCxzQkFBQSx3QkFBcUIsTUFBYyxTQUEwQixVQUFNLEdBQUMsRUFBQTs7U0FBQSxDQUFDO0FBRXZFO0lBS0UsbUJBQVksUUFBZ0IsRUFBRSxPQUFxQjtRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFSyx3QkFBSSxHQUFWLFVBQVcsTUFBZSxFQUFFLGdCQUF3Qjs7Ozs7O3dCQUM1QyxFQUFFLEdBQUcsY0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Ozs7d0JBRTlDLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQXZELFNB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