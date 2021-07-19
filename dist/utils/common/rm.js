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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var client_1 = require("../client");
var constant_1 = require("../../constant");
var utils_1 = require("./utils");
var generatePath_1 = require("./generatePath");
var Ls = /** @class */ (function () {
    function Ls(regionId, credentials) {
        this.fcClient = client_1.fcClient(regionId, credentials);
    }
    Ls.prototype.rm = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fcPath, recursive, force, isRootDir, serviceName, functionName, nasHttpTriggerPath, statsRes, stats, nasId, permTip, warningInfo, cmd, rmResponse, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fcPath = options.targetPath, recursive = options.recursive, force = options.force, isRootDir = options.isRootDir, serviceName = options.serviceName, functionName = options.functionName;
                        nasHttpTriggerPath = generatePath_1.getHttpTriggerPath(serviceName, functionName);
                        return [4 /*yield*/, this.statsRequest(fcPath, nasHttpTriggerPath)];
                    case 1:
                        statsRes = _a.sent();
                        this.logger.debug("Call " + fcPath + " stats is: " + JSON.stringify(statsRes));
                        stats = statsRes.data;
                        if (!stats.exists) {
                            throw new Error(fcPath + " not exist");
                        }
                        if (stats.isDir && !recursive) {
                            throw new Error("nas rm: " + fcPath + ": is a directory, use -r/--recursive if you want to delete it");
                        }
                        return [4 /*yield*/, this.getNasConfig(serviceName)];
                    case 2:
                        nasId = _a.sent();
                        permTip = utils_1.checkWritePerm(stats, nasId, fcPath);
                        if (permTip) {
                            warningInfo = "nas rm: " + permTip;
                            this.logger.error("Warning: " + warningInfo);
                        }
                        cmd = isRootDir
                            ? "cd " + fcPath + " && rm -R " + (force ? '-f ' : '') + " *"
                            : "rm " + (recursive ? '-R' : '') + " " + (force ? '-f ' : '') + " " + fcPath;
                        this.logger.debug("Rm cmd is: " + cmd);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.commandsPath(nasHttpTriggerPath), { cmd: cmd })];
                    case 4:
                        rmResponse = _a.sent();
                        this.logger.log(rmResponse.data.stdout);
                        this.logger.log(rmResponse.data.stderr);
                        this.logger.log("'\u2714' remove " + fcPath + " done", 'green');
                        return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        if (isRootDir && ex_1.message.includes("cannot remove '*': No such file or directory")) {
                            this.logger.debug(ex_1.stack);
                        }
                        else {
                            throw ex_1;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Ls.prototype.getNasConfig = function (serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, userId, groupId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getService(serviceName)];
                    case 1:
                        res = _b.sent();
                        this.logger.debug("getService response is: " + JSON.stringify(res));
                        _a = res.data.nasConfig, userId = _a.userId, groupId = _a.groupId;
                        return [2 /*return*/, {
                                UserId: userId,
                                GroupId: groupId,
                            }];
                }
            });
        });
    };
    Ls.prototype.statsRequest = function (dstPath, httpTriggerPath) {
        return __awaiter(this, void 0, void 0, function () {
            var urlPath, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlPath = generatePath_1.statsPath(httpTriggerPath);
                        query = { dstPath: dstPath };
                        return [4 /*yield*/, this.fcClient.get(urlPath, query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Ls.prototype, "logger", void 0);
    return Ls;
}());
exports.default = Ls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlEO0FBQ3pELG9DQUFxQztBQUVyQywyQ0FBeUM7QUFDekMsaUNBQXlDO0FBQ3pDLCtDQUE2RTtBQWdCN0U7SUFJRSxZQUFZLFFBQWdCLEVBQUUsV0FBeUI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUssZUFBRSxHQUFSLFVBQVMsT0FBWTs7Ozs7O3dCQUNDLE1BQU0sR0FBNkQsT0FBTyxXQUFwRSxFQUFFLFNBQVMsR0FBa0QsT0FBTyxVQUF6RCxFQUFFLEtBQUssR0FBMkMsT0FBTyxNQUFsRCxFQUFFLFNBQVMsR0FBZ0MsT0FBTyxVQUF2QyxFQUFFLFdBQVcsR0FBbUIsT0FBTyxZQUExQixFQUFFLFlBQVksR0FBSyxPQUFPLGFBQVosQ0FBYTt3QkFFekYsa0JBQWtCLEdBQUcsaUNBQWtCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUN4RCxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxFQUFBOzt3QkFBOUQsUUFBUSxHQUFHLFNBQW1EO3dCQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFRLE1BQU0sbUJBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUcsQ0FBQyxDQUFDO3dCQUVwRSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7NEJBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUksTUFBTSxlQUFZLENBQUMsQ0FBQzt5QkFDeEM7d0JBRUQsSUFBSSxL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