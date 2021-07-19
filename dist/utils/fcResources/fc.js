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
var constant_1 = require("../../constant");
var fs_1 = __importDefault(require("fs"));
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.remove = function (client, props) {
        return __awaiter(this, void 0, void 0, function () {
            var functionConfig, triggers, serviceName, functionName, _i, triggers_1, triggerName, ex_1, ex_2, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functionConfig = props.function, triggers = props.triggers;
                        serviceName = functionConfig.serviceName, functionName = functionConfig.functionName;
                        if (!triggers) return [3 /*break*/, 6];
                        _i = 0, triggers_1 = triggers;
                        _a.label = 1;
                    case 1:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 6];
                        triggerName = triggers_1[_i].triggerName;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.logger.debug("Delete trigger: " + serviceName + "/" + functionName + "/" + triggerName);
                        return [4 /*yield*/, client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.logger.debug("ex code: " + ex_1.code + ", ex: " + ex_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        this.logger.debug("Delete function: " + serviceName + "/" + functionName);
                        return [4 /*yield*/, client.deleteFunction(serviceName, functionName)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_2 = _a.sent();
                        this.logger.debug("ex code: " + ex_2.code + ", ex: " + ex_2.message);
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        this.logger.debug("Delete service: " + serviceName);
                        return [4 /*yield*/, client.deleteService(serviceName)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        ex_3 = _a.sent();
                        this.logger.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Component.deploy = function (client, props) {
        return __awaiter(this, void 0, void 0, function () {
            var service, functionConfig, triggers, _i, triggers_2, triggerConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = props.service, functionConfig = props.function, triggers = props.triggers;
                        return [4 /*yield*/, this.makeService(client, service)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.makeFunction(client, functionConfig)];
                    case 2:
                        _a.sent();
                        if (!triggers) return [3 /*break*/, 6];
                        _i = 0, triggers_2 = triggers;
                        _a.label = 3;
                    case 3:
                        if (!(_i < triggers_2.length)) return [3 /*break*/, 6];
                        triggerConfig = triggers_2[_i];
                        return [4 /*yield*/, this.makeTrigger(client, triggerConfig)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeService = function (client, service) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = service.serviceName;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        this.logger.debug("Create service " + serviceName + "...");
                        return [4 /*yield*/, client.createService(serviceName, service)];
                    case 2:
                        _a.sent();
                        this.logger.debug("Create service " + serviceName + " success.");
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'ServiceAlreadyExists') {
                            this.logger.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
                            throw ex_4;
                        }
                        this.logger.debug("Update service " + serviceName + "...");
                        return [4 /*yield*/, client.updateService(serviceName, service)];
                    case 4:
                        _a.sent();
                        this.logger.debug("Update service " + serviceName + " success.");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeFunction = function (client, functionConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, filename, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = functionConfig.serviceName, functionName = functionConfig.functionName, filename = functionConfig.filename;
                        delete functionConfig.filename;
                        functionConfig.code = {
                            zipFile: fs_1.default.readFileSync(filename, 'base64'),
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        this.logger.debug("Create function " + serviceName + "/" + functionName + "...");
                        return [4 /*yield*/, client.updateFunction(serviceName, functionName, functionConfig)];
                    case 2:
                        _a.sent();
                        this.logger.debug("Create function " + serviceName + "/" + functionName + " success.");
                        return [3 /*break*/, 6];
                    case 3:
                        ex_5 = _a.sent();
                        if (!(ex_5.code === 'FunctionNotFound')) return [3 /*break*/, 5];
                        functionConfig.functionName = functionName;
                        return [4 /*yield*/, client.createFunction(serviceName, functionConfig)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5:
                        this.logger.debug("ex code: " + ex_5.code + ", ex: " + ex_5.message);
                        throw ex_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeTrigger = function (client, triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, triggerName, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = triggerConfig.serviceName, functionName = triggerConfig.functionName, triggerName = triggerConfig.triggerName;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        this.logger.debug("Create trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        return [4 /*yield*/, client.createTrigger(serviceName, functionName, triggerConfig)];
                    case 2:
                        _a.sent();
                        this.logger.debug("Create trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        return [3 /*break*/, 5];
                    case 3:
                        ex_6 = _a.sent();
                        if (ex_6.code !== 'TriggerAlreadyExists') {
                            this.logger.debug("ex code: " + ex_6.code + ", ex: " + ex_6.message);
                            throw ex_6;
                        }
                        this.logger.debug("Update trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        return [4 /*yield*/, client.updateTrigger(serviceName, functionName, triggerName, triggerConfig)];
                    case 4:
                        _a.sent();
                        this.logger.debug("Update trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZmNSZXNvdXJjZXMvZmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFDekQsMkNBQXlDO0FBQ3pDLDBDQUFvQjtBQUVwQjtJQUFBO0lBd0dBLENBQUM7SUFyR2MsZ0JBQU0sR0FBbkIsVUFBb0IsTUFBTSxFQUFFLEtBQUs7Ozs7Ozt3QkFDYixjQUFjLEdBQWUsS0FBSyxTQUFwQixFQUFFLFFBQVEsR0FBSyxLQUFLLFNBQVYsQ0FBVzt3QkFDN0MsV0FBVyxHQUFtQixjQUFjLFlBQWpDLEVBQUUsWUFBWSxHQUFLLGNBQWMsYUFBbkIsQ0FBb0I7NkJBRWpELFFBQVEsRUFBUix3QkFBUTs4QkFDNEIsRUFBUixxQkFBUTs7OzZCQUFSLENBQUEsc0JBQVEsQ0FBQTt3QkFBekIsV0FBVyw2QkFBQTs7Ozt3QkFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQW1CLFdBQVcsU0FBSSxZQUFZLFNBQUksV0FBYSxDQUFDLENBQUM7d0JBQ25GLHFCQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQWxFLFNBQWtFLENBQUM7Ozs7d0JBRW5FLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBRSxDQUFDLElBQUksY0FBUyxJQUFFLENBQUMsT0FBUyxDQUFDLENBQUM7Ozt3QkFMbEMsSUFBUSxDQUFBOzs7O3dCQVd0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBb0IsV0FBVyxTQUFJLFlBQWMsQ0FBQyxDQUFDO3dCQUNyRSxxQkFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsRUFBQTs7d0JBQXRELFNBQXNELENBQUM7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