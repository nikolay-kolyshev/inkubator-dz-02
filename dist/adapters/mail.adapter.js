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
exports.MailAdapter = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var settings_1 = require("../settings");
var MailAdapter = /** @class */ (function () {
    function MailAdapter() {
    }
    /**
     * @param to
     * @param subject
     * @param message
     * @returns {Promise<string>} messageId
     */
    MailAdapter.sendMessage = function (to, subject, message) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, mailData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1.default.createTransport({
                            host: settings_1.settings.mailTransport.host,
                            port: settings_1.settings.mailTransport.port,
                            secure: true,
                            auth: {
                                user: settings_1.settings.mailTransport.user,
                                pass: settings_1.settings.mailTransport.password,
                            },
                        });
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                transporter.verify(function (error, success) {
                                    if (error) {
                                        console.error('[MailAdapter.sendMessage, transporter.verify]', error);
                                        reject(error);
                                    }
                                    else {
                                        resolve(success);
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        mailData = {
                            from: {
                                name: "\u041D\u0438\u043A\u043E\u043B\u0430\u0439 \u041A\u043E\u043B\u044B\u0448\u0435\u0432",
                                address: settings_1.settings.mailTransport.user,
                            },
                            to: to,
                            html: message,
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                transporter.sendMail(mailData, function (err, info) {
                                    if (err) {
                                        console.error(err);
                                        reject(null);
                                    }
                                    else {
                                        resolve(info.messageId);
                                    }
                                });
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('[MailAdapter.sendMessage, transporter.sendMail]', error_1);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MailAdapter;
}());
exports.MailAdapter = MailAdapter;
//# sourceMappingURL=mail.adapter.js.map