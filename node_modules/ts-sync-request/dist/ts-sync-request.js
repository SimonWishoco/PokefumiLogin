"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sync_request_1 = __importDefault(require("sync-request"));
var SyncRequestClient = /** @class */ (function () {
    function SyncRequestClient(options) {
        this.options = options;
        this.service = new SyncRequestService();
        this.headers = new Array();
    }
    SyncRequestClient.prototype.addHeader = function (key, value) {
        this.headers.push(new SyncRequestHeader(key, value));
        return this;
    };
    SyncRequestClient.prototype.addHeaders = function (headers) {
        var _this = this;
        headers.forEach(function (header) { return _this.headers.push(header); });
        return this;
    };
    SyncRequestClient.prototype.get = function (url) {
        return this.service.get(url, this.headers, this.options);
    };
    SyncRequestClient.prototype.post = function (url, req) {
        return this.service.post(url, req, this.headers, this.options);
    };
    SyncRequestClient.prototype.create = function (url, req) {
        return this.service.create(url, req, this.headers, this.options);
    };
    SyncRequestClient.prototype.put = function (url, req) {
        this.service.put(url, req, this.headers, this.options);
    };
    SyncRequestClient.prototype.delete = function (url) {
        return this.service.delete(url, this.headers, this.options);
    };
    return SyncRequestClient;
}());
exports.SyncRequestClient = SyncRequestClient;
var SyncRequestService = /** @class */ (function () {
    function SyncRequestService() {
    }
    SyncRequestService.prototype.get = function (url, headers, opts) {
        var options = {};
        var res = null;
        if (opts != null) {
            options = this.addOptions(opts);
        }
        if (headers != null && headers.length > 0) {
            this.addHeaders(options, headers);
            res = sync_request_1.default('GET', url, options);
        }
        else {
            res = sync_request_1.default('GET', url);
        }
        var body = res.getBody('utf8');
        var o = JSON.parse(body);
        return o;
    };
    SyncRequestService.prototype.post = function (url, req, headers, opts) {
        var options = {};
        if (opts != null) {
            options = this.addOptions(opts);
        }
        var res = null;
        this.addHeaders(options, headers);
        options["json"] = JSON.parse(JSON.stringify(req));
        res = sync_request_1.default('POST', url, options);
        var body = res.getBody('utf8');
        var o = JSON.parse(body);
        return o;
    };
    SyncRequestService.prototype.create = function (url, req, headers, opts) {
        var options = {};
        if (opts != null) {
            options = this.addOptions(opts);
        }
        var res = null;
        this.addHeaders(options, headers);
        options["json"] = JSON.parse(JSON.stringify(req));
        res = sync_request_1.default('POST', url, options);
        var body = res.getBody('utf8');
        var o = JSON.parse(body);
        return o;
    };
    SyncRequestService.prototype.put = function (url, req, headers, opts) {
        var options = {};
        if (opts != null) {
            options = this.addOptions(opts);
        }
        this.addHeaders(options, headers);
        options["json"] = JSON.parse(JSON.stringify(req));
        sync_request_1.default('PUT', url, options);
    };
    SyncRequestService.prototype.delete = function (url, headers, opts) {
        var options = {};
        var res = null;
        if (opts != null) {
            options = this.addOptions(opts);
        }
        this.addHeaders(options, headers);
        res = sync_request_1.default('DELETE', url, options);
        var body = res.getBody('utf8');
        var o = JSON.parse(body);
        return o;
    };
    SyncRequestService.prototype.addHeaders = function (options, headers) {
        if (headers != null && headers.length > 0) {
            var tmp_1 = {};
            headers.forEach(function (h) {
                tmp_1[h.Key] = h.Value;
            });
            options["headers"] = tmp_1;
        }
    };
    SyncRequestService.prototype.addOptions = function (options) {
        var opts = options;
        var o = {};
        for (var propertyName in options) {
            var value = opts[propertyName];
            if (value != null) {
                o[propertyName] = value;
            }
        }
        return o;
    };
    return SyncRequestService;
}());
exports.SyncRequestService = SyncRequestService;
var SyncRequestHeader = /** @class */ (function () {
    function SyncRequestHeader(key, val) {
        this.key = key;
        this.val = val;
        this.Key = this.key;
        this.Value = this.val;
    }
    return SyncRequestHeader;
}());
exports.SyncRequestHeader = SyncRequestHeader;
var SyncRequestOptions = /** @class */ (function () {
    function SyncRequestOptions() {
        this.followRedirects = true;
        this.maxRedirects = Infinity;
        this.timeout = false;
        this.retry = false;
        this.retryDelay = 200;
        this.maxRetries = 5;
    }
    return SyncRequestOptions;
}());
exports.SyncRequestOptions = SyncRequestOptions;
