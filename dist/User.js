"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    cargo: String,
    dataHora: Number,
});
const User = mongoose_1.default.model("CreateUsers", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map