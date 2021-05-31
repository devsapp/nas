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
exports.getMountDir = exports.nasUriHandler = exports.promptForConfirmContinue = exports.sleep = exports.getTimeout = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
exports.getTimeout = function () { return parseInt(process.env.NAS_FUNCTION_TIMEOUT) || 600 * 1000; };
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function promptForConfirmContinue(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.stdin.isTTY) {
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'confirm',
                                name: 'ok',
                                message: message,
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    if (answers.ok) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.promptForConfirmContinue = promptForConfirmContinue;
exports.nasUriHandler = function (nasDirYmlInput) {
    return (nasDirYmlInput.startsWith('/') ? nasDirYmlInput.substr(1) : nasDirYmlInput);
};
function getMountDir(mountPointDomain, nasDir) {
    // 24e0349ccc-psq48.cn-shenzhen.nas.aliyuncs.com
    var _a = mountPointDomain.split('.'), systemId = _a[0], region = _a[1];
    return "/mnt/" + systemId + "-" + region + "/" + exports.nasUriHandler(nasDir);
}
exports.getMountDir = getMountDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdDO0FBRW5CLFFBQUEsVUFBVSxHQUFHLGNBQWMsT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQXhELENBQXdELENBQUM7QUFFcEYsUUFBQSxLQUFLLEdBQUcsVUFBQyxFQUFVLElBQUssT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztBQUV2RixTQUFzQix3QkFBd0IsQ0FBQyxPQUFlOzs7Ozs7b0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDeEIsc0JBQU8sSUFBSSxFQUFDO3FCQUNiO29CQUVlLHFCQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDOzRCQUNwQztnQ0FDRSxJQUFJLEVBQUUsU0FBUztnQ0FDZixJQUFJLEVBQUUsSUFBSTtnQ0FDVixPQUFPLFNBQUE7NkJBQ1I7eUJBQ0YsQ0FBQyxFQUFBOztvQkFOSSxPQUFPLEdBQUcsU0FNZDtvQkFFRixJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUU7d0JBQ2Qsc0JBQU8sSUFBSSxFQUFDO3FCQUNiO29CQUNELHNCQUFPLEtBQUssRUFBQzs7OztDQUNkO0FBakJELDREQWlCQztBQUVZLFFBQUEsYUFBYSxHQUFHLFVBQUMsY0FBc0I7SUFDbEQsT0FBQSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUE1RSxDQUE0RSxDQUFDO0FBRS9FLFNBQWdCLFdBQVcsQ0FBQyxnQkFBd0IsRUFBRSxNQUFjO0lBQ2xFLGdEQUFnRDtJQUMxQyxJQUFBLEtBQXFCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBL0MsUUFBUSxRQUFBLEVBQUUsTUFBTSxRQUErQixDQUFDO0lBQ3ZELE9BQU8sVUFBUSxRQUFRLFNBQUksTUFBTSxTQUFJLHFCQUFhLENBQUMsTUFBTSxDQUFHLENBQUM7QUFDL0QsQ0FBQztBQUpELGtDQUlDIn0=