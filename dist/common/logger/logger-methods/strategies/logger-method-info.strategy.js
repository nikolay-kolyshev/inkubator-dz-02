"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.LoggerMethodInfoStrategy = void 0;
var logger_method_abstract_1 = require("../logger-method.abstract");
var LoggerMethodInfoStrategy = /** @class */ (function (_super) {
    __extends(LoggerMethodInfoStrategy, _super);
    function LoggerMethodInfoStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LoggerMethodInfoStrategy.prototype, "log", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            console.info.apply(console, __spreadArray([message], args, false));
        }
    });
    return LoggerMethodInfoStrategy;
}(logger_method_abstract_1.LoggerMethodAbstract));
exports.LoggerMethodInfoStrategy = LoggerMethodInfoStrategy;
//# sourceMappingURL=logger-method-info.strategy.js.map