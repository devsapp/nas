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
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("./utils");
var stdout_formatter_1 = __importDefault(require("../stdout-formatter"));
var constant_1 = require("../constant");
var Nas = /** @class */ (function () {
    function Nas(regionId, profile) {
        this.stdoutFormatter = stdout_formatter_1.default.stdoutFormatter;
        this.nasClient = new pop_core_1.default({
            endpoint: "http://nas." + regionId + ".aliyuncs.com",
            apiVersion: '2017-06-26',
            accessKeyId: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            // @ts-ignore
            securityToken: profile.SecurityToken,
            opts: {
                timeout: utils_1.getTimeout(),
            },
        });
    }
    Nas.prototype.init = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, nasName, vpcId, zoneId, vSwitchId, storageType, fileSystemId, mountTargetDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, nasName = properties.nasName, vpcId = properties.vpcId, zoneId = properties.zoneId, vSwitchId = properties.vSwitchId, storageType = properties.storageType;
                        return [4 /*yield*/, this.findNasFileSystem(regionId, nasName)];
                    case 1:
                        fileSystemId = _a.sent();
                        if (!!fileSystemId) return [3 /*break*/, 3];
                        this.logger.info(this.stdoutFormatter.create('NasFileSystem', nasName));
                        return [4 /*yield*/, this.createNasFileSystem(regionId, zoneId, nasName, storageType)];
                    case 2:
                        fileSystemId = _a.sent();
                        this.logger.debug("Default nas file system has been generated, fileSystemId is: " + fileSystemId);
                        return [3 /*break*/, 4];
                    case 3:
                        this.logger.debug("Nas file system already generated, fileSystemId is: " + fileSystemId);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.findMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 5:
                        mountTargetDomain = _a.sent();
                        if (!mountTargetDomain) return [3 /*break*/, 6];
                        this.logger.debug("Nas file system mount target is already created, mountTargetDomain is: " + mountTargetDomain + ".");
                        return [3 /*break*/, 8];
                    case 6:
                        this.logger.info(this.stdoutFormatter.create('MountTarget', fileSystemId));
                        return [4 /*yield*/, this.createMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 7:
                        mountTargetDomain = _a.sent();
                        this.logger.debug("Default nas file system mount target has been generated, mount domain is: " + mountTargetDomain);
                        _a.label = 8;
                    case 8: return [2 /*return*/, {
                            fileSystemId: fileSystemId,
                            mountTargetDomain: mountTargetDomain,
                        }];
                }
            });
        });
    };
    Nas.prototype.remove = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, nasName, vpcId, vSwitchId, fileSystemId, mountTargetDomain, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, nasName = properties.nasName, vpcId = properties.vpcId, vSwitchId = properties.vSwitchId;
                        fileSystemId = properties.fileSystemId;
                        if (!nasName || !fileSystemId) {
                            this.logger.debug('Not found nasName or fileSystemId,skip remove nas.');
                            return [2 /*return*/, false];
                        }
                        if (!nasName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findNasFileSystem(regionId, nasName)];
                    case 1:
                        fileSystemId = _a.sent();
                        if (!fileSystemId) {
                            this.logger.warn(this.stdoutFormatter.warn('NasFileSystem', nasName + " not found under " + regionId + "."));
                            return [2 /*return*/, false];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.findMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 3:
                        mountTargetDomain = _a.sent();
                        this.logger.debug("Found mount target domain is: " + mountTargetDomain);
                        if (!mountTargetDomain) return [3 /*break*/, 5];
                        p = {
                            FileSystemId: fileSystemId,
                            MountTargetDomain: mountTargetDomain,
                        };
                        this.logger.info(this.stdoutFormatter.remove('MountTarget', mountTargetDomain));
                        return [4 /*yield*/, this.nasClient.request('DeleteMountTarget', p, constant_1.REQUESTOPTION)];
                    case 4:
                        _a.sent();
                        this.logger.debug("Delete " + mountTargetDomain + " success.");
                        _a.label = 5;
                    case 5:
                        this.logger.info(this.stdoutFormatter.remove('FileSystem', fileSystemId));
                        return [4 /*yield*/, this.nasClient.request('DeleteFileSystem', { FileSystemId: fileSystemId }, constant_1.REQUESTOPTION)];
                    case 6:
                        _a.sent();
                        this.logger.debug("DeleteFileSystem " + fileSystemId + " success.");
                        return [2 /*return*/, fileSystemId];
                }
            });
        });
    };
    Nas.prototype.findNasFileSystem = function (regionId, description) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, requestPageNumber, totalCount, pageNumber, fileSystem, params, rs, fileSystems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = 100;
                        requestPageNumber = 0;
                        _a.label = 1;
                    case 1:
                        params = {
                            RegionId: regionId,
                            PageSize: pageSize,
                            PageNumber: ++requestPageNumber,
                        };
                        this.logger.debug("DescribeFileSystems request pageNumber: " + requestPageNumber);
                        return [4 /*yield*/, this.nasClient.request('DescribeFileSystems', params, constant_1.REQUESTOPTION)];
                    case 2:
                        rs = _a.sent();
                        totalCount = rs.TotalCount;
                        pageNumber = rs.PageNumber;
                        fileSystems = rs.FileSystems.FileSystem;
                        this.logger.debug("DescribeFileSystems response is: " + JSON.stringify(fileSystems) + ".");
                        fileSystem = lodash_1.default.find(fileSystems, { Description: description });
                        this.logger.debug("find filesystem: " + JSON.stringify(fileSystem) + ".");
                        _a.label = 3;
                    case 3:
                        if (!fileSystem && totalCount && pageNumber && pageNumber * pageSize < totalCount) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [2 /*return*/, (fileSystem || {}).FileSystemId];
                }
            });
        });
    };
    Nas.prototype.findMountTarget = function (region, fileSystemId, vpcId, vSwitchId) {
        return __awaiter(this, void 0, void 0, function () {
            var rs, mountTargets, mountTarget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nasClient.request('DescribeMountTargets', {
                            RegionId: region,
                            FileSystemId: fileSystemId,
                        }, constant_1.REQUESTOPTION)];
                    case 1:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeMountTargets response is: " + JSON.stringify(rs));
                        mountTargets = rs.MountTargets.MountTarget;
                        if (!lodash_1.default.isEmpty(mountTargets)) {
                            mountTarget = lodash_1.default.find(mountTargets, {
                                VpcId: vpcId,
                                VswId: vSwitchId,
                            });
                            if (mountTarget) {
                                return [2 /*return*/, mountTarget.MountTargetDomain];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Nas.prototype.createNasFileSystem = function (regionId, zoneId, description, storageType) {
        return __awaiter(this, void 0, void 0, function () {
            var zones, params, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nasClient.request('DescribeZones', {
                            RegionId: regionId,
                        }, constant_1.REQUESTOPTION)];
                    case 1:
                        zones = _a.sent();
                        this.logger.debug("Call DescribeZones RegionId is: " + regionId + ", response is: " + JSON.stringify(zones));
                        return [4 /*yield*/, this.getStorageType(zones.Zones.Zone, zoneId, regionId, storageType)];
                    case 2:
                        storageType = _a.sent();
                        params = {
                            RegionId: regionId,
                            StorageType: storageType,
                            Description: description,
                            ZoneId: zoneId,
                            ProtocolType: 'NFS',
                        };
                        this.logger.debug("Call CreateFileSystem params is: " + JSON.stringify(params) + ".");
                        return [4 /*yield*/, this.nasClient.request('CreateFileSystem', params, constant_1.REQUESTOPTION)];
                    case 3:
                        rs = _a.sent();
                        return [2 /*return*/, rs.FileSystemId];
                }
            });
        });
    };
    Nas.prototype.createMountTarget = function (region, fileSystemId, vpcId, vSwitchId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs, mountTargetDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: region,
                            NetworkType: 'Vpc',
                            FileSystemId: fileSystemId,
                            AccessGroupName: 'DEFAULT_VPC_GROUP_NAME',
                            VpcId: vpcId,
                            VSwitchId: vSwitchId,
                        };
                        return [4 /*yield*/, this.nasClient.request('CreateMountTarget', params, constant_1.REQUESTOPTION)];
                    case 1:
                        rs = _a.sent();
                        this.logger.debug("CreateMountTarget target response: " + JSON.stringify(rs));
                        mountTargetDomain = rs.MountTargetDomain;
                        return [4 /*yield*/, this.waitMountPointUntilAvaliable(region, fileSystemId, mountTargetDomain)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, mountTargetDomain];
                }
            });
        });
    };
    Nas.prototype.getStorageType = function (zones, zoneId, region, storageType) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, zones_1, item, msg, yes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, zones_1 = zones;
                        _a.label = 1;
                    case 1:
                        if (!(_i < zones_1.length)) return [3 /*break*/, 5];
                        item = zones_1[_i];
                        if (!(item.ZoneId === zoneId)) return [3 /*break*/, 4];
                        if (storageType) {
                            if (lodash_1.default.isEmpty(item[storageType].Protocol)) {
                                throw new Error("There is no " + storageType + " storage type in this area.");
                            }
                            else {
                                return [2 /*return*/, storageType];
                            }
                        }
                        if (!!lodash_1.default.isEmpty(item.Performance.Protocol)) return [3 /*break*/, 2];
                        return [2 /*return*/, 'Performance'];
                    case 2:
                        msg = "Region " + region + " only supports capacity NAS. Do you want to create it automatically?";
                        return [4 /*yield*/, utils_1.promptForConfirmContinue(msg)];
                    case 3:
                        yes = _a.sent();
                        if (yes) {
                            return [2 /*return*/, 'Capacity'];
                        }
                        throw new Error("No NAS service available under region " + region + ".");
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: throw new Error("There is no zoneId " + zoneId + " available for the region " + region + ".");
                }
            });
        });
    };
    Nas.prototype.waitMountPointUntilAvaliable = function (region, fileSystemId, mountTargetDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var count, status, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        _a.label = 1;
                    case 1:
                        count++;
                        return [4 /*yield*/, utils_1.sleep(2000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.nasClient.request('DescribeMountTargets', {
                                RegionId: region,
                                FileSystemId: fileSystemId,
                                MountTargetDomain: mountTargetDomain,
                            }, constant_1.REQUESTOPTION)];
                    case 3:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeMountTargets response is: " + JSON.stringify(rs));
                        status = rs.MountTargets.MountTarget[0].Status;
                        this.logger.debug("nas status is: " + status);
                        this.logger.info("Nas mount target domain already created, waiting for status to be 'Active', now is " + status);
                        _a.label = 4;
                    case 4:
                        if (count < 15 && status !== 'Active') return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        if (status !== 'Active') {
                            throw new Error("Timeout while waiting for MountPoint " + mountTargetDomain + " status to be 'Active',please try again.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Nas.prototype, "logger", void 0);
    return Nas;
}());
exports.default = Nas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL25hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5RDtBQUN6RCxnRUFBcUM7QUFDckMsa0RBQXVCO0FBQ3ZCLGlDQUFzRTtBQUN0RSx5RUFBa0Q7QUFDbEQsd0NBQXFEO0FBR3JEO0lBS0UsYUFBWSxRQUFRLEVBQUUsT0FBcUI7UUFGM0Msb0JBQWUsR0FBRywwQkFBZSxDQUFDLGVBQWUsQ0FBQztRQUdoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQUcsQ0FBQztZQUN2QixRQUFRLEVBQUUsZ0JBQWMsUUFBUSxrQkFBZTtZQUMvQyxVQUFVLEVBQUUsWUFBWTtZQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLGFBQWE7WUFDYixhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxrQkFBVSxFQUFFO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLGtCQUFJLEdBQVYsVUFBVyxVQUF1Qjs7Ozs7O3dCQUN4QixRQUFRLEdBQXFELFVBQVUsU0FBL0QsRUFBRSxPQUFPLEdBQTRDLFVBQVUsUUFBdEQsRUFBRSxLQUFLLEdBQXFDLFVBQVUsTUFBL0MsRUFBRSxNQUFNLEdBQTZCLFVBQVUsT0FBdkMsRUFBRSxTQUFTLEdBQWtCLFVBQVUsVUFBNUIsRUFBRSxXQUFXLEdBQUssVUFBVSxZQUFmLENBQWdCO3dCQUM3RCxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBOUQsWUFBWSxHQUFHLFNBQStDOzZCQUU5RCxDQUFDLFlBQVksRUFBYix3QkFBYTt3QkFDZixJQUFJLENB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