"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionPath = exports.downloadPath = exports.pathExsit = exports.statsPath = exports.cleanPath = exports.fileCheck = exports.fileChunkUpload = exports.commandsPath = exports.getHttpTriggerPath = void 0;
exports.getHttpTriggerPath = function (serviceName, functionName) {
    return "/proxy/" + serviceName + "/" + functionName + "/";
};
exports.commandsPath = function (httpTriggerPath) { return httpTriggerPath + "commands"; };
exports.fileChunkUpload = function (httpTriggerPath) {
    return httpTriggerPath + "file/chunk/upload";
};
exports.fileCheck = function (httpTriggerPath) { return httpTriggerPath + "file/check"; };
exports.cleanPath = function (httpTriggerPath) { return httpTriggerPath + "clean"; };
exports.statsPath = function (httpTriggerPath) { return httpTriggerPath + "stats"; };
exports.pathExsit = function (httpTriggerPath) { return httpTriggerPath + "path/exsit"; };
exports.downloadPath = function (httpTriggerPath) { return httpTriggerPath + "download"; };
exports.versionPath = function (httpTriggerPath) { return httpTriggerPath + "version"; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi9nZW5lcmF0ZVBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxrQkFBa0IsR0FBRyxVQUFDLFdBQW1CLEVBQUUsWUFBb0I7SUFDMUUsT0FBQSxZQUFVLFdBQVcsU0FBSSxZQUFZLE1BQUc7QUFBeEMsQ0FBd0MsQ0FBQztBQUU5QixRQUFBLFlBQVksR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLGFBQVcsRUFBN0IsQ0FBNkIsQ0FBQztBQUVsRixRQUFBLGVBQWUsR0FBRyxVQUFDLGVBQXVCO0lBQ3JELE9BQUcsZUFBZSxzQkFBb0I7QUFBdEMsQ0FBc0MsQ0FBQztBQUU1QixRQUFBLFNBQVMsR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLGVBQWEsRUFBL0IsQ0FBK0IsQ0FBQztBQUVqRixRQUFBLFNBQVMsR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLFVBQVEsRUFBMUIsQ0FBMEIsQ0FBQztBQUU1RSxRQUFBLFNBQVMsR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLFVBQVEsRUFBMUIsQ0FBMEIsQ0FBQztBQUU1RSxRQUFBLFNBQVMsR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLGVBQWEsRUFBL0IsQ0FBK0IsQ0FBQztBQUVqRixRQUFBLFlBQVksR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLGFBQVcsRUFBN0IsQ0FBNkIsQ0FBQztBQUVsRixRQUFBLFdBQVcsR0FBRyxVQUFDLGVBQXVCLElBQWEsT0FBRyxlQUFlLFlBQVUsRUFBNUIsQ0FBNEIsQ0FBQyJ9