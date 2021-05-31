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
var constant_1 = require("../constant");
var Nas = /** @class */ (function () {
    function Nas(regionId, profile) {
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
                        this.logger.info('Could not find default nas file system, ready to generate one');
                        return [4 /*yield*/, this.createNasFileSystem(regionId, zoneId, nasName, storageType)];
                    case 2:
                        fileSystemId = _a.sent();
                        this.logger.info("Default nas file system has been generated, fileSystemId is: " + fileSystemId);
                        return [3 /*break*/, 4];
                    case 3:
                        this.logger.info("Nas file system already generated, fileSystemId is: " + fileSystemId);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.findMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 5:
                        mountTargetDomain = _a.sent();
                        if (!mountTargetDomain) return [3 /*break*/, 6];
                        this.logger.info("Nas file system mount target is already created, mountTargetDomain is: " + mountTargetDomain + ".");
                        return [3 /*break*/, 8];
                    case 6:
                        this.logger.info('Could not find default nas file system mount target, ready to generate one');
                        return [4 /*yield*/, this.createMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 7:
                        mountTargetDomain = _a.sent();
                        this.logger.info("Default nas file system mount target has been generated, mount domain is: " + mountTargetDomain);
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
                            return [2 /*return*/];
                        }
                        if (!nasName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findNasFileSystem(regionId, nasName)];
                    case 1:
                        fileSystemId = _a.sent();
                        if (!fileSystemId) {
                            this.logger.warn(nasName + " not found under " + regionId + ".");
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.findMountTarget(regionId, fileSystemId, vpcId, vSwitchId)];
                    case 3:
                        mountTargetDomain = _a.sent();
                        this.logger.info("Found mount target domain is: " + mountTargetDomain);
                        if (!mountTargetDomain) return [3 /*break*/, 5];
                        p = {
                            FileSystemId: fileSystemId,
                            MountTargetDomain: mountTargetDomain,
                        };
                        this.logger.info("DeleteMountTarget param is: " + JSON.stringify(p));
                        return [4 /*yield*/, this.nasClient.request('DeleteMountTarget', p, constant_1.REQUESTOPTION)];
                    case 4:
                        _a.sent();
                        this.logger.info("Delete " + mountTargetDomain + " success.");
                        _a.label = 5;
                    case 5:
                        this.logger.info("DeleteFileSystem " + fileSystemId + " start...");
                        return [4 /*yield*/, this.nasClient.request('DeleteFileSystem', { FileSystemId: fileSystemId }, constant_1.REQUESTOPTION)];
                    case 6:
                        _a.sent();
                        this.logger.info("DeleteFileSystem " + fileSystemId + " success.");
                        return [2 /*return*/];
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
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Nas.prototype, "logger", void 0);
    return Nas;
}());
exports.default = Nas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL25hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5RDtBQUN6RCxnRUFBcUM7QUFDckMsa0RBQXVCO0FBQ3ZCLGlDQUFzRTtBQUN0RSx3Q0FBcUQ7QUFHckQ7SUFJRSxhQUFZLFFBQVEsRUFBRSxPQUFxQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQUcsQ0FBQztZQUN2QixRQUFRLEVBQUUsZ0JBQWMsUUFBUSxrQkFBZTtZQUMvQyxVQUFVLEVBQUUsWUFBWTtZQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLGFBQWE7WUFDYixhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxrQkFBVSxFQUFFO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLGtCQUFJLEdBQVYsVUFBVyxVQUF1Qjs7Ozs7O3dCQUN4QixRQUFRLEdBQXFELFVBQVUsU0FBL0QsRUFBRSxPQUFPLEdBQTRDLFVBQVUsUUFBdEQsRUFBRSxLQUFLLEdBQXFDLFVBQVUsTUFBL0MsRUFBRSxNQUFNLEdBQTZCLFVBQVUsT0FBdkMsRUFBRSxTQUFTLEdBQWtCLFVBQVUsVUFBNUIsRUFBRSxXQUFXLEdBQUssVUFBVSxZQUFmLENBQWdCO3dCQUM3RCxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBOUQsWUFBWSxHQUFHLFNBQStDOzZCQUU5RCxDQUFDLFlBQVksRUFBYix3QkFBYTt3QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO3dCQUVuRSxxQkFB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