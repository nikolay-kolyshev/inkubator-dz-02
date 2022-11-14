"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
var FieldValidator = /** @class */ (function () {
    function FieldValidator() {
        Object.defineProperty(this, "errorsMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    Object.defineProperty(FieldValidator.prototype, "addFieldValidation", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (config) {
            if (config.errorCondition) {
                this.errorsMessages.push({
                    message: config.errorMessage,
                    field: config.fieldName,
                });
            }
            return this;
        }
    });
    Object.defineProperty(FieldValidator.prototype, "finishAndReturnErrorMessages", {
        get: function () {
            var errorsMessages = this.errorsMessages;
            this.errorsMessages = [];
            return errorsMessages;
        },
        enumerable: false,
        configurable: true
    });
    return FieldValidator;
}());
exports.FieldValidator = FieldValidator;
//# sourceMappingURL=field-validator.js.map