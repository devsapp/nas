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
    Ls.prototype.ls = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var targetPath, isAllOpt, isLongOpt, serviceName, functionName, nasHttpTriggerPath, lsCmd, lsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetPath = options.targetPath, isAllOpt = options.isAllOpt, isLongOpt = options.isLongOpt, serviceName = options.serviceName, functionName = options.functionName;
                        nasHttpTriggerPath = generatePath_1.getHttpTriggerPath(serviceName, functionName);
                        lsCmd = "ls " + (isAllOpt ? '-a ' : '') + (isLongOpt ? '-l ' : '') + targetPath;
                        return [4 /*yield*/, this.fcClient.post(generatePath_1.commandsPath(nasHttpTriggerPath), { cmd: lsCmd })];
                    case 1:
                        lsResponse = _a.sent();
                        this.logger.log(lsResponse.data.stdout);
                        this.logger.log(lsResponse.data.stderr);
                        return [2 /*return*/];
                }
            });
        });
    };
    Ls.prototype.checkLsNasDir = function (targetPath) {
        if (targetPath === '' || targetPath === undefined) {
            this.logger.info('Please input nas path!');
            return false;
        }
        if (!utils_1.isNasProtocol(targetPath)) {
            this.logger.info('Please input correct nas path!');
            return false;
        }
        return true;
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Ls.prototype, "logger", void 0);
    return Ls;
}());
exports.default = Ls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlEO0FBQ3pELG9DQUFxQztBQUVyQywyQ0FBeUM7QUFDekMsaUNBQXdDO0FBQ3hDLCtDQUFrRTtBQVNsRTtJQUlFLFlBQVksUUFBZ0IsRUFBRSxXQUF5QjtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFSyxlQUFFLEdBQVIsVUFBUyxPQUFZOzs7Ozs7d0JBQ1gsVUFBVSxHQUFxRCxPQUFPLFdBQTVELEVBQUUsUUFBUSxHQUEyQyxPQUFPLFNBQWxELEVBQUUsU0FBUyxHQUFnQyxPQUFPLFVBQXZDLEVBQUUsV0FBVyxHQUFtQixPQUFPLFlBQTFCLEVBQUUsWUFBWSxHQUFLLE9BQU8sYUFBWixDQUFhO3dCQUV6RSxrQkFBa0IsR0FBRyxpQ0FBa0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ25FLEtBQUssR0FBRyxTQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxVQUFZLENBQUM7d0JBQ2xFLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdkYsVUFBVSxHQUFHLFNBQTBFO3dCQUU3RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztLQUN6QztJQUVELDBCQUFhLEdBQWIsVUFBYyxVQUFrQjtRQUM5QixJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMscUJBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O0lBNUJpQjtRQUFqQixjQUFPLENBQUMsa0JBQU8sQ0FBQztzREFBUyxjQUFPLG9CQUFQLGNBQU87c0NBQUM7SUE2QnBDLFNBQUM7Q0FBQSxBQS9CRCxJQStCQztrQkEvQm9CLEVBQUUifQ==