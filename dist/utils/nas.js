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
            var pageSize, requestPageNumber, totalCount, pageNumber, fileSystem, params, rs, ex_1, fileSystems;
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
                        rs = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.logger.debug("DescribeFileSystems request pageNumber: " + requestPageNumber);
                        return [4 /*yield*/, this.nasClient.request('DescribeFileSystems', params, constant_1.REQUESTOPTION)];
                    case 3:
                        rs = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        throw ex_1;
                    case 5:
                        totalCount = rs.TotalCount;
                        pageNumber = rs.PageNumber;
                        fileSystems = rs.FileSystems.FileSystem;
                        this.logger.debug("DescribeFileSystems response is: " + JSON.stringify(fileSystems) + ".");
                        fileSystem = lodash_1.default.find(fileSystems, { Description: description });
                        this.logger.debug("find filesystem: " + JSON.stringify(fileSystem) + ".");
                        _a.label = 6;
                    case 6:
                        if (!fileSystem && totalCount && pageNumber && pageNumber * pageSize < totalCount) return [3 /*break*/, 1];
                        _a.label = 7;
                    case 7: return [2 /*return*/, (fileSystem || {}).FileSystemId];
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
                        this.logger.debug('nas status is: ' + status);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL25hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5RDtBQUN6RCxnRUFBcUM7QUFDckMsa0RBQXVCO0FBQ3ZCLGlDQUFzRTtBQUN0RSx3Q0FBcUQ7QUFHckQ7SUFJRSxhQUFZLFFBQVEsRUFBRSxPQUFxQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQUcsQ0FBQztZQUN2QixRQUFRLEVBQUUsZ0JBQWMsUUFBUSxrQkFBZTtZQUMvQyxVQUFVLEVBQUUsWUFBWTtZQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLElBQUksRUFBRTtnQkFDSixPQUFPLEVBQUUsa0JBQVUsRUFBRTthQUN0QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSyxrQkFBSSxHQUFWLFVBQVcsVUFBdUI7Ozs7Ozt3QkFDeEIsUUFBUSxHQUFxRCxVQUFVLFNBQS9ELEVBQUUsT0FBTyxHQUE0QyxVQUFVLFFBQXRELEVBQUUsS0FBSyxHQUFxQyxVQUFVLE1BQS9DLEVBQUUsTUFBTSxHQUE2QixVQUFVLE9BQXZDLEVBQUUsU0FBUyxHQUFrQixVQUFVLFVBQTVCLEVBQUUsV0FBVyxHQUFLLFVBQVUsWUFBZixDQUFnQjt3QkFDN0QscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQTlELFlBQVksR0FBRyxTQUErQzs2QkFFOUQsQ0FBQyxZQUFZLEVBQWIsd0JBQWE7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQzt3QkFFbkUscUJBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVB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