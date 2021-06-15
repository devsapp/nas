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
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var path_1 = __importDefault(require("path"));
var constant_1 = require("../constant");
var stdout_formatter_1 = __importDefault(require("../stdout-formatter"));
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
                        this.logger.debug(constant_1.CONTEXT, "Get verison path: " + httpPath);
                        return [4 /*yield*/, client.get(generatePath_1.versionPath(httpPath))];
                    case 2:
                        res = _a.sent();
                        this.logger.debug(constant_1.CONTEXT, "Get verison response: " + JSON.stringify(res, null, '  '));
                        curVersionId = res.data.curVersionId;
                        return [4 /*yield*/, this.getVersion()];
                    case 3:
                        version = _a.sent();
                        this.logger.debug(constant_1.CONTEXT, "curVersionId is: " + curVersionId + ", version is: " + version + ".");
                        isNew = curVersionId === version;
                        if (!isNew) {
                            this.logger.warn(constant_1.CONTEXT, stdout_formatter_1.default.stdoutFormatter.warn('function', 'The auxiliary function is not the latest code, the function needs to be updated'));
                        }
                        return [2 /*return*/, isNew];
                    case 4:
                        ex_1 = _a.sent();
                        this.logger.debug(constant_1.CONTEXT, ex_1);
                        this.logger.warn(constant_1.CONTEXT, stdout_formatter_1.default.stdoutFormatter.warn('function', 'Failed to request version, update function'));
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
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Version, "logger", void 0);
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTBCO0FBQzFCLDhDQUF5RDtBQUN6RCw4Q0FBd0I7QUFDeEIsd0NBQXNDO0FBRXRDLHlFQUFrRDtBQUNsRCxtQ0FBb0M7QUFDcEMsc0RBQXdFO0FBRXhFO0lBQUE7SUE2Q0EsQ0FBQztJQTNDYyx3QkFBZ0IsR0FBN0IsVUFDRSxPQUFxQixFQUNyQixRQUFnQixFQUNoQixXQUFtQixFQUNuQixZQUFvQjs7Ozs7O3dCQUVkLE1BQU0sR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDckMsUUFBUSxHQUFHLGlDQUFrQixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQzs7Ozt3QkFHN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sRUFBRSx1QkFBcUIsUUFBVSxDQUFDLENBQUM7d0JBQ2hELHFCQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFBOzt3QkFBN0MsR0FBRyxHQUFHLFNBQXVDO3dCQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLDJCQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFHLENBQUMsQ0FBQzt3QkFDL0UsWUFBWSxHQUFLLEdBQUcsQ0FBQyxJQUFJLGFBQWIsQ0FBYzt3QkFFbEIscUJBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBakMsT0FBTyxHQUFHLFNBQXVCO3dCQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLHNCQUFvQixZQUFZLHNCQUFpQixPQUFPLE1BQUcsQ0FBQyxDQUFDO3dCQUVsRixLQUFLLEdBQUcsWUFBWSxLQUFLLE9BQU8sQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxrQkFBTyxFQUNQLDBCQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUZBQWlGLENBQUMsQ0FDcEksQ0FBQzt5QkFDSDt3QkFFRCxzQkFBTyxLQUFLLEVBQUM7Ozt3QkFFYixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxFQUFFLElBQUUsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxrQkFBTyxFQUNQLDBCQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsNENBQTRDLENBQUMsQ0FDL0YsQ0FBQzt3QkFDRixzQkFBTyxLQUFLLEVBQUM7Ozs7O0tBRWhCO0lBRVksa0JBQVUsR0FBdkI7Ozs7Ozt3QkFDUSxXQUFXLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUUzRCxxQkFBTSxrQkFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQTs0QkFBdEMsc0JBQU8sQ0FBQyxTQUE4QixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUM7Ozs7S0FDcEQ7SUEzQ2lCO1FBQWpCLGNBQU8sQ0FBQyxrQkFBTyxDQUFDOztpQ0FBd0I7SUE0QzNDLGNBQUM7Q0FBQSxBQTdDRCxJQTZDQztrQkE3Q29CLE9BQU8ifQ==