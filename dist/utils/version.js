"use strict";
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
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var path_1 = __importDefault(require("path"));
var constant_1 = require("../constant");
var client_1 = require("./client");
var generatePath_1 = require("./common/generatePath");
var Version = /** @class */ (function () {
    function Version() {
    }
    Version.isNasServerStale = function (profile, regionId, serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var client, httpPath, res, curVersionId, version, isNew, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = client_1.fcClient(regionId, profile);
                        httpPath = generatePath_1.getHttpTriggerPath(serviceName, functionName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        core_1.Logger.debug(constant_1.CONTEXT, "Get verison path: " + httpPath);
                        return [4 /*yield*/, client.get(generatePath_1.versionPath(httpPath))];
                    case 2:
                        res = _a.sent();
                        core_1.Logger.debug(constant_1.CONTEXT, "Get verison response: " + JSON.stringify(res, null, '  '));
                        curVersionId = res.data.curVersionId;
                        return [4 /*yield*/, this.getVersion()];
                    case 3:
                        version = _a.sent();
                        core_1.Logger.debug(constant_1.CONTEXT, "curVersionId is: " + curVersionId + ", version is: " + version + ".");
                        isNew = curVersionId === version;
                        if (!isNew) {
                            core_1.Logger.warn(constant_1.CONTEXT, 'The auxiliary function is not the latest code, the function needs to be updated.');
                        }
                        return [2 /*return*/, isNew];
                    case 4:
                        ex_1 = _a.sent();
                        core_1.Logger.debug(constant_1.CONTEXT, ex_1);
                        core_1.Logger.warn(constant_1.CONTEXT, 'Failed to request version, update function.');
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Version.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var versionFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        versionFile = path_1.default.join(__dirname, 'fcResources', 'VERSION');
                        return [4 /*yield*/, fs_extra_1.default.readFile(versionFile)];
                    case 1: return [2 /*return*/, (_a.sent()).toString()];
                }
            });
        });
    };
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTBCO0FBQzFCLDhDQUErQztBQUMvQyw4Q0FBd0I7QUFDeEIsd0NBQXNDO0FBRXRDLG1DQUFvQztBQUNwQyxzREFBd0U7QUFFeEU7SUFBQTtJQXlDQSxDQUFDO0lBeENjLHdCQUFnQixHQUE3QixVQUNFLE9BQXFCLEVBQ3JCLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLFlBQW9COzs7Ozs7d0JBRWQsTUFBTSxHQUFHLGlCQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUNyQyxRQUFRLEdBQUcsaUNBQWtCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7O3dCQUc3RCxhQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFPLEVBQUUsdUJBQXFCLFFBQVUsQ0FBQyxDQUFDO3dCQUMzQyxxQkFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQTs7d0JBQTdDLEdBQUcsR0FBRyxTQUF1Qzt3QkFDbkQsYUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLDJCQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFHLENBQUMsQ0FBQzt3QkFDNUUsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUUzQixxQkFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUE7O3dCQUFqQyxPQUFPLEdBQUcsU0FBdUI7d0JBRXZDLGFBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBRSxzQkFBb0IsWUFBWSxzQkFBaUIsT0FBTyxNQUFHLENBQUMsQ0FBQzt3QkFFN0UsS0FBSyxHQUFHLFlBQVksS0FBSyxPQUFPLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1YsYUFBTSxDQUFDLElBQUksQ0FDVCxrQkFBTyxFQUNQLGtGQUFrRixDQUNuRixDQUFDO3lCQUNIO3dCQUVELHNCQUFPLEtBQUssRUFBQzs7O3dCQUViLGFBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBRSxJQUFFLENBQUMsQ0FBQzt3QkFDMUIsYUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7d0JBQ3BFLHNCQUFPLEtBQUssRUFBQzs7Ozs7S0FFaEI7SUFFWSxrQkFBVSxHQUF2Qjs7Ozs7O3dCQUNRLFdBQVcsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBRTNELHFCQUFNLGtCQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzRCQUF0QyxzQkFBTyxDQUFDLFNBQThCLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBQzs7OztLQUNwRDtJQUNILGNBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDIn0=