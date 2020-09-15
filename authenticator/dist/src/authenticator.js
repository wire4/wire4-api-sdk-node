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
Object.defineProperty(exports, "__esModule", { value: true });
var js_base64_1 = require("js-base64");
var fetch = require('node-fetch');
var Bluebird = require('bluebird');
fetch.Promise = Bluebird;
var URLSearchParams = require('url').URLSearchParams;
var OAuthWire4 = /** @class */ (function () {
    function OAuthWire4(clientId, clientSecret, environment) {
        this.cache = {};
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        if (environment !== undefined) {
            this.tokenUrl = environment;
        }
        else {
            console.log('Environment enum value is required...');
            throw new Error('Environment enum value is required...');
        }
    }
    OAuthWire4.prototype.obtainAccessTokenApp = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheToken, response, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateScopeIsPresent(scope);
                        cacheToken = this.get(this.clientId + scope);
                        if (cacheToken !== null && cacheToken !== undefined &&
                            cacheToken.access_token !== null && this.isValid(cacheToken.expires_in)) {
                            return [2 /*return*/, this.formatToHeader(cacheToken.access_token)];
                        }
                        if (!(cacheToken === null || cacheToken === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.generateToken(scope)];
                    case 1:
                        cacheToken = (_a.sent());
                        response = cacheToken.expires_in;
                        date = new Date();
                        date.setSeconds(date.getSeconds() + (response.expires_in !== undefined && response.expires_in !== null ? response.expires_in : 0));
                        cacheToken.expires_in = date;
                        this.add(this.clientId + scope, cacheToken);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.formatToHeader(cacheToken.access_token)];
                }
            });
        });
    };
    OAuthWire4.prototype.obtainAccessTokenAppUser = function (userKey, secretKey, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheToken, response, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validObtainAccessTokenAppUser(userKey, secretKey, scope);
                        cacheToken = this.get(userKey + scope);
                        if (!(cacheToken !== null && cacheToken !== undefined &&
                            cacheToken.access_token !== null)) return [3 /*break*/, 3];
                        if (!!this.isValid(new Date(cacheToken.expires_in))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.generateTokenPasswordRefresh(cacheToken.refresh_token)];
                    case 1:
                        response = _a.sent();
                        cacheToken = this.makeITokenResponse(response);
                        this.add(userKey + scope, cacheToken);
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.generateTokenPassword(userKey, secretKey, scope)];
                    case 4:
                        response = _a.sent();
                        cacheToken = this.makeITokenResponse(response);
                        this.add(userKey + scope, cacheToken);
                        _a.label = 5;
                    case 5: return [2 /*return*/, this.formatToHeader(cacheToken.access_token)];
                }
            });
        });
    };
    OAuthWire4.prototype.add = function (key, value) {
        this.cache[key] = value;
    };
    OAuthWire4.prototype.exist = function (key) {
        return this.cache.hasOwnProperty(key);
    };
    OAuthWire4.prototype.sizeCache = function () {
        return this.cache;
    };
    OAuthWire4.prototype.validateScopeIsPresent = function (scope) {
        if (scope === undefined || scope === null || scope.trim().length === 0) {
            throw new Error('A least one scope is required...');
        }
    };
    OAuthWire4.prototype.validObtainAccessTokenAppUser = function (userKey, secretKey, scope) {
        if (userKey === undefined || userKey === null || userKey.trim().length === 0) {
            throw new Error('A least one scope is required...');
        }
        if (secretKey === undefined || secretKey === null || secretKey.trim().length === 0) {
            throw new Error('A least one scope is required...');
        }
        this.validateScopeIsPresent(scope);
    };
    OAuthWire4.prototype.get = function (key) {
        if (this.exist(key)) {
            return this.cache[key];
        }
        return null;
    };
    OAuthWire4.prototype.formatToHeader = function (token) {
        return "Bearer " + token;
    };
    OAuthWire4.prototype.isValid = function (expiration) {
        var dateTime = new Date();
        dateTime.setMinutes(dateTime.getMinutes() + 5);
        return expiration != null && dateTime.getTime() < expiration.getTime();
    };
    OAuthWire4.prototype.generateToken = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var form, options;
            return __generator(this, function (_a) {
                form = new URLSearchParams();
                form.append('grant_type', 'client_credentials');
                form.append('scope', scope);
                options = {
                    method: 'POST',
                    body: form,
                    headers: {
                        'Authorization': ' Basic ' + js_base64_1.Base64.encode(this.clientId + ':' + this.clientSecret)
                    }
                };
                return [2 /*return*/, fetch(this.tokenUrl, options)
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        return data;
                    }, function (error) {
                        console.log('An error ocurred');
                        return error;
                    })];
            });
        });
    };
    OAuthWire4.prototype.generateTokenPasswordRefresh = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new URLSearchParams();
                        form.append('grant_type', 'refresh_token');
                        form.append('refresh_token', refresh);
                        return [4 /*yield*/, this.doRequest(this.tokenUrl, this.makeOptions(form))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OAuthWire4.prototype.generateTokenPassword = function (userKey, secretKey, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new URLSearchParams();
                        form.append('grant_type', 'password');
                        form.append('username', userKey);
                        form.append('password', secretKey);
                        form.append('scope', scope);
                        return [4 /*yield*/, this.doRequest(this.tokenUrl, this.makeOptions(form))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OAuthWire4.prototype.makeOptions = function (form) {
        var options = {
            method: 'POST',
            body: form,
            headers: {
                'Authorization': ' Basic ' + js_base64_1.Base64.encode(this.clientId + ':' + this.clientSecret)
            }
        };
        return options;
    };
    OAuthWire4.prototype.doRequest = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(this.tokenUrl, options)
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        return data;
                    }, function (error) {
                        console.log('An error ocurred' + error);
                        return error;
                    })];
            });
        });
    };
    OAuthWire4.prototype.makeITokenResponse = function (response) {
        var cacheToken;
        cacheToken = response;
        var date = new Date();
        date.setSeconds(date.getSeconds() + (response.expires_in !== undefined && response.expires_in !== null ? response.expires_in : 0));
        cacheToken.expires_in = date;
        return cacheToken;
    };
    return OAuthWire4;
}());
exports.default = OAuthWire4;
