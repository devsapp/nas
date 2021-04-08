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
exports.chunk = exports.readDirRecursive = exports.splitRangeBySize = exports.checkWritePerm = exports.isDirOrFile = exports.resolveLocalPath = exports.parseNasUri = exports.isNasProtocol = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQixrREFBdUI7QUFDdkIsc0RBQTBCO0FBQzFCLDhDQUF3QjtBQUN4QixrREFBNEI7QUFDNUIsb0RBQThCO0FBQzlCLGtDQUF5QztBQUV6QyxJQUFNLFNBQVMsR0FBRyxZQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0IsSUFBTSxlQUFlLEdBQUcsNkJBQTZCLENBQUM7QUFFekMsUUFBQSxhQUFhLEdBQUcsVUFBQyxTQUFpQixJQUFjLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLENBQUM7QUFFL0YsU0FBZ0IsV0FBVyxDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLGNBQXNCO0lBQ2xGLGNBQWMsR0FBRyxxQkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRS9DLElBQU0sUUFBUSxHQUFHLFlBQVUsY0FBYyxNQUFHLENBQUM7SUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEMsSUFBSSxNQUFNLEtBQUssWUFBVSxjQUFnQixFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXFCLE1BQU0scUNBQWdDLFFBQVUsQ0FBQyxDQUFDO1NBQ3hGO0tBQ0Y7SUFFRCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUksY0FBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFbEYsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXFCLE1BQVEsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQs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