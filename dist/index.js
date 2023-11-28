"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(`mongodb+srv://User:${process.env.KEY}@cluster1.9yvxty2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
    .then(() => console.log("MongoDB connected"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
const server = http_1.default.createServer(app);
server.listen(5000, () => {
    console.log("Server running on port 5000");
});
//# sourceMappingURL=index.js.map