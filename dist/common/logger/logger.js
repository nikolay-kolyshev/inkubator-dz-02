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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var logger_method_error_strategy_1 = require("./logger-methods/strategies/logger-method-error.strategy");
var logger_method_info_strategy_1 = require("./logger-methods/strategies/logger-method-info.strategy");
var logger_method_warning_strategy_1 = require("./logger-methods/strategies/logger-method-warning.strategy");
var logger_constants_1 = require("./logger.constants");
var Logger = /** @class */ (function () {
    function Logger() {
        Object.defineProperty(this, "errorMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "warningMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "infoMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.errorMethod = new logger_method_error_strategy_1.LoggerMethodErrorStrategy();
        this.warningMethod = new logger_method_warning_strategy_1.LoggerMethodWarningStrategy();
        this.infoMethod = new logger_method_info_strategy_1.LoggerMethodInfoStrategy();
    }
    Object.defineProperty(Logger.prototype, "error", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this.errorMethod).log.apply(_a, __spreadArray([message], args, false));
        }
    });
    Object.defineProperty(Logger.prototype, "warning", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this.warningMethod).log.apply(_a, __spreadArray([message], args, false));
        }
    });
    Object.defineProperty(Logger.prototype, "info", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this.infoMethod).log.apply(_a, __spreadArray([message], args, false));
        }
    });
    Logger = __decorate([
        (0, inversify_binding_decorators_1.provide)(logger_constants_1.LOGGER_IDS.Logger),
        __metadata("design:paramtypes", [])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map