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
exports.chunk = exports.readDirRecursive = exports.splitRangeBySize = exports.checkWritePerm = exports.isDirOrFile = exports.resolveLocalPath = exports.parseNasUri = exports.commandCmd = exports.isNasProtocol = void 0;
var os_1 = __importDefault(require("os"));
var lodash_1 = __importDefault(require("lodash"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ignore_1 = __importDefault(require("ignore"));
var walkdir_1 = __importDefault(require("walkdir"));
var utils_1 = require("../utils");
var USER_HOME = os_1.default.homedir();
var NAS_URI_PATTERN = /^nas:\/\/((?:\/[^/]+)*\/?)$/;
exports.isNasProtocol = function (inputPath) { return inputPath.indexOf('nas://') === 0; };
function commandCmd(args, mountDir, nasDirYmlInput) {
    nasDirYmlInput = utils_1.nasUriHandler(nasDirYmlInput);
    var reg = new RegExp("nas:///" + nasDirYmlInput, 'g');
    return args.replace(reg, mountDir);
}
exports.commandCmd = commandCmd;
function parseNasUri(nasUri, mountDir, nasDirYmlInput) {
    nasDirYmlInput = utils_1.nasUriHandler(nasDirYmlInput);
    var startStr = "nas:///" + nasDirYmlInput + "/";
    if (!nasUri.startsWith(startStr)) {
        if (nasUri !== "nas:///" + nasDirYmlInput) {
            throw new Error("Invalid nas path: " + nasUri + ", nas path should start with " + startStr);
        }
    }
    var res = nasUri.replace("/" + nasDirYmlInput, mountDir).match(NAS_URI_PATTERN);
    if (!res) {
        throw new Error("Invalid nas path: " + nasUri);
    }
    return res[1];
}
exports.parseNasUri = parseNasUri;
function resolveLocalPath(localPath) {
    if (!localPath) {
        throw new Error('Local path could not be empty');
    }
    var rootDir = path_1.default.parse(process.cwd()).root;
    if (localPath.startsWith(rootDir)) {
        return localPath;
    }
    else if (localPath.startsWith('~')) {
        return localPath.replace(/~/, USER_HOME);
    }
    var currentDir = process.cwd();
    return path_1.default.join(currentDir, localPath);
}
exports.resolveLocalPath = resolveLocalPath;
function isDirOrFile(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.lstat(inputPath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, {
                            isDir: stats.isDirectory(),
                            isFile: stats.isFile(),
                        }];
            }
        });
    });
}
exports.isDirOrFile = isDirOrFile;
function hasWritePerm(num, stats, nasPath) {
    if (stats.isDir && !stats.isFile) {
        // -wx, num | 100 === 7
        return (num | 4) === 7;
    }
    else if (stats.isFile && !stats.isDir) {
        // -w-, num | 101
        return (num | 5) === 7;
    }
    else if (stats.isFile && stats.isDir) {
        throw new Error("isFile and isDir attributes of " + nasPath + " are true simultaneously");
    }
}
// 检查nasId 是否有 nasPath 的写权限
// 返回相关字符串信息,undefined 表示有权限，否则无权限且返回相应 tip
function checkWritePerm(stats, nasId, nasPath) {
    if (!stats.exists) {
        return undefined;
    }
    var userId = nasId.UserId;
    var groupId = nasId.GroupId;
    var mode = stats.mode;
    var nasPathUserId = stats.UserId;
    var nasPathGroupId = stats.GroupId;
    if (nasPathUserId === 0 && nasPathGroupId === 0) {
        return undefined;
    }
    // permStirng 为 ‘777’ 形式的权限形式
    var permString = (mode & parseInt('777', 8)).toString(8);
    var _a = lodash_1.default.map(permString, function (perm) {
        return hasWritePerm(parseInt(perm), stats, nasPath);
    }), ownerCanWrite = _a[0], groupCanWrite = _a[1], otherCanWrite = _a[2];
    if (!ownerCanWrite && !groupCanWrite && !otherCanWrite) {
        return nasPath + " has no '-w-' or '-wx' permission, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md";
    }
    else if (ownerCanWrite && groupCanWrite && otherCanWrite) {
        return undefined;
    }
    else if (userId === nasPathUserId &&
        !ownerCanWrite &&
        groupId === nasPathGroupId &&
        !groupCanWrite &&
        otherCanWrite) {
        return "UserId: " + nasPathUserId + " and GroupId: " + nasPathGroupId + " have no '-w-' or '-wx' permission to " + nasPath + ", which may cause permission problem, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md";
    }
    else if (!((userId === nasPathUserId && ownerCanWrite) || (groupId === nasPathGroupId && groupCanWrite))) {
        return "UserId: " + userId + " and GroupId: " + groupId + " in your NasConfig are mismatched with UserId: " + nasPathUserId + " and GroupId: " + nasPathGroupId + " of " + nasPath + ", which may cause permission problem, more information please refer to https://github.com/alibaba/funcraft/blob/master/docs/usage/faq-zh.md";
    }
    return undefined;
}
exports.checkWritePerm = checkWritePerm;
function splitRangeBySize(start, end, chunkSize) {
    if (chunkSize === 0) {
        throw new Error('chunkSize of function splitRangeBySize should not be 0');
    }
    var res = [];
    while (start < end) {
        var size = Math.min(chunkSize, end - start);
        res.push({
            start: start,
            size: size,
        });
        start = start + size;
    }
    return res;
}
exports.splitRangeBySize = splitRangeBySize;
function isEmptyDir(targetPath) {
    var lstat = fs_extra_1.default.lstatSync(targetPath);
    if (lstat.isDirectory()) {
        var dirs = fs_extra_1.default.readdirSync(targetPath);
        if (lodash_1.default.isEmpty(dirs)) {
            return true;
        }
    }
    return false;
}
function readDirRecursive(rootPath, excludes) {
    var ig = ignore_1.default().add(excludes);
    return new Promise(function (resolve) {
        var relativePaths = [];
        if (isEmptyDir(rootPath)) {
            return resolve(relativePaths);
        }
        walkdir_1.default(rootPath, {
            track_inodes: true,
        })
            .on('path', function (fullPath, stat) {
            var relativePath = path_1.default.relative(rootPath, fullPath);
            if (ig.ignores(relativePath)) {
                return;
            }
            if (process.platform === 'win32') {
                relativePath = relativePath.split(path_1.default.sep).join('/');
            }
            if (stat.isDirectory()) {
                if (!lodash_1.default.isEmpty(fs_extra_1.default.readdirSync(fullPath))) {
                    return;
                }
                relativePath = relativePath + "/";
            }
            relativePaths.push(relativePath);
        })
            .on('end', function () { return resolve(relativePaths); });
    });
}
exports.readDirRecursive = readDirRecursive;
function chunk(arr, size) {
    if (size < 1) {
        throw new Error('chunk step should not be 0');
    }
    return Array(Math.ceil(arr.length / size))
        .fill(undefined)
        .map(function (__, i) { return arr.slice(i * size, i * size + size); });
}
exports.chunk = chunk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQixrREFBdUI7QUFDdkIsc0RBQTBCO0FBQzFCLDhDQUF3QjtBQUN4QixrREFBNEI7QUFDNUIsb0RBQThCO0FBQzlCLGtDQUF5QztBQUV6QyxJQUFNLFNBQVMsR0FBRyxZQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0IsSUFBTSxlQUFlLEdBQUcsNkJBQTZCLENBQUM7QUFFekMsUUFBQSxhQUFhLEdBQUcsVUFBQyxTQUFpQixJQUFjLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUM7QUFFL0YsU0FBZ0IsVUFBVSxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLGNBQXNCO0lBQy9FLGNBQWMsR0FBRyxxQkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLElBQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVUsY0FBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxjQUFzQjtJQUNsRixjQUFjLEdBQUcscUJBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUvQyxJQUFNLFFBQVEsR0FBRyxZQUFVLGNBQWMsTUFBRyxDQUFDO0lBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2hDLElBQUksTUFBTSxLQUFLLFlBQVUsY0FBZ0IsRUFBRTtZQUN6QyxNQUFNLElBQUks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