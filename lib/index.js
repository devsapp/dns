"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var lodash_1 = require("lodash");
var base_1 = __importDefault(require("./common/base"));
var contants_1 = require("./common/contants");
var DnsComponent = /** @class */ (function (_super) {
    __extends(DnsComponent, _super);
    function DnsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
    DnsComponent.createClient = function (accessKeyId, accessKeySecret) {
        return new pop_core_1.default({
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
            // securityToken: '<your-sts-token>', // use STS Token
            endpoint: 'https://dns.aliyuncs.com',
            apiVersion: '2015-01-09'
        });
    };
    DnsComponent.prototype.request = function (method, data, requestOption) {
        if (requestOption === void 0) { requestOption = { method: 'POST' }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.request(method, data, requestOption)];
            });
        });
    };
    DnsComponent.prototype.reportInfo = function (data) {
        this.__report({
            name: 'dns',
            access: data.access,
            content: {
                domainName: data.domainName,
                rr: data.rr,
                type: data.type,
                value: data.value
            }
        });
        core_1.reportComponent('dns', {
            uid: data.uid,
            command: 'deploy',
        });
    };
    DnsComponent.prototype.addDomainRecord = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, domainName, type, value, domainArray, rr, _domainName, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data.domainName, domainName = _a === void 0 ? '' : _a, type = data.type, value = data.value;
                        if (!domainName || !value) {
                            return [2 /*return*/];
                        }
                        domainArray = domainName.split('.');
                        rr = domainArray[0];
                        _domainName = domainArray.slice(1).join('.');
                        result = {
                            domainName: domainName,
                            value: value
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request('AddDomainRecord', { DomainName: _domainName, RR: rr, Type: type, Value: value })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        if (e_1.code !== contants_1.ERROR_CODE.DomainRecordDuplicate) { // 忽略已经存在的异常
                            result = e_1.message;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    DnsComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var access, credentials, AccessKeyID, AccessKeySecret, _a, _b, domainName, _c, type, value, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        access = lodash_1.get(inputs, 'project.access');
                        credentials = lodash_1.get(inputs, 'credentials');
                        if (!lodash_1.isEmpty(credentials)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core_1.getCredential(inputs, access)];
                    case 1:
                        credentials = _d.sent();
                        _d.label = 2;
                    case 2:
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        _a = lodash_1.get(inputs, 'props'), _b = _a.domainName, domainName = _b === void 0 ? '' : _b, _c = _a.type, type = _c === void 0 ? 'CNAME' : _c, value = _a.value;
                        if (!this.client) {
                            this.client = DnsComponent.createClient(AccessKeyID, AccessKeySecret);
                        }
                        return [4 /*yield*/, this.addDomainRecord({ domainName: domainName, type: type, value: value })];
                    case 3:
                        result = _d.sent();
                        this.reportInfo({
                            access: access,
                            domainName: domainName,
                            type: type,
                            value: value,
                            uid: credentials.AccountID
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return DnsComponent;
}(base_1.default));
exports.default = DnsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXVFO0FBQ3ZFLGdFQUFzQztBQUN0QyxpQ0FBc0M7QUFDdEMsdURBQWlDO0FBQ2pDLDhDQUErQztBQWtCL0M7SUFBMEMsZ0NBQUk7SUFBOUM7O0lBb0ZBLENBQUM7SUFsRkM7Ozs7OztLQU1DO0lBQ00seUJBQVksR0FBbkIsVUFBb0IsV0FBbUIsRUFBRSxlQUF1QjtRQUM5RCxPQUFPLElBQUksa0JBQUksQ0FBQztZQUNkLFdBQVcsYUFBQTtZQUNYLGVBQWUsaUJBQUE7WUFDZixzREFBc0Q7WUFDdEQsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRWEsOEJBQU8sR0FBckIsVUFBc0IsTUFBYyxFQUFFLElBQVMsRUFBRSxhQUFrQztRQUFsQyw4QkFBQSxFQUFBLGtCQUFrQixNQUFNLEVBQUUsTUFBTSxFQUFFOzs7Z0JBQ2pGLHNCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEVBQUM7OztLQUN6RDtJQUVPLGlDQUFVLEdBQWxCLFVBQW1CLElBQWE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzNCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO1FB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