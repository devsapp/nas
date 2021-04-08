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
exports.fcClient = void 0;
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var utils_1 = require("./utils");
function fcClient(regionId, profile) {
    var _this = this;
    var client = new fc2_1.default(profile.AccountID, {
        accessKeyID: profile.AccessKeyID,
        accessKeySecret: profile.AccessKeySecret,
        region: regionId,
        timeout: utils_1.getTimeout(),
    });
    client.get = function (path, query, headers) { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.request('GET', path, query, null, headers)];
                case 1:
                    res = _a.sent();
                    data = (res && res.data) || {};
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    return [2 /*return*/, res];
            }
        });
    }); };
    client.post = function (path, body, headers, queries, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(_this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.request('POST', path, queries, body, headers, opts)];
                    case 1:
                        res = _a.sent();
                        data = (res && res.data) || {};
                        if (data.error) {
                            throw new Error(data.error);
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return client;
}
exports.fcClient = fcClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFFL0IsaUNBQXFDO0FBRXJDLFNBQWdCLFFBQVEsQ0FBQyxRQUFnQixFQUFFLE9BQXFCO0lBQWhFLGlCQTZCQztJQTVCQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1FBQ3ZDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztRQUNoQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7UUFDeEMsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFLGtCQUFVLEVBQUU7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFPLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTzs7Ozt3QkFDMUIscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE3RCxHQUFHLEdBQUcsU0FBdUQ7b0JBQzdELElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzdCO29CQUVELHNCQUFPLEdBQUcsRUFBQzs7O1NBQ1osQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBTyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUzs7Ozs7NEJBQzlDLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQXRFLEdBQUcsR0FBRyxTQUFnRTt3QkFDdEUsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDN0I7d0JBRUQsc0JBQU8sR0FBRyxFQUFDOzs7O0tBQ1osQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUE3QkQsNEJBNkJDIn0=