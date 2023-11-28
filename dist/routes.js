"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const User_1 = __importDefault(require("./User"));
const routes = express_1.default.Router();
routes.use((0, cors_1.default)());
routes.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    });
});
routes.get("/users", async (req, res) => {
    const post = await User_1.default.find();
    const loading = true;
    res.json({
        post: post,
        loading: loading,
    });
});
routes.get("/usersDetails/:slug", async (req, res) => {
    let loading = true;
    const id = req.params.slug;
    const post = await User_1.default.findOneAndUpdate({ _id: id }, { new: true }).then((postRes) => {
        loading = false;
        res.json({
            postRes: postRes, loading: loading
        });
    });
});
routes.post("/createLogin", (req, res) => {
    const { username, email, password, dataHora } = req.body;
    const user = {
        username: username,
        email: email,
        password: password,
        dataHora: new Date(),
    };
    db_1.default.create({
        username: user.username,
        email: user.email,
        password: user.password,
        id: user.dataHora
    });
    res.json({
        username: user.username,
    });
});
routes.post("/login", (req, res) => {
    const { username: username, password: password } = req.body;
    const user = {
        username: username,
        password: password,
    };
    const sendResponse = () => res.json({ success: user.username });
    const sendResponseError = () => res.json({ success: null });
    db_1.default.findOne({
        username: user.username,
        password: user.password
    }).then((res) => {
        const response = res;
        if (response === null) {
            sendResponseError();
        }
        else {
            sendResponse();
        }
    });
});
routes.post("/createUser", (req, res) => {
    const { username: username, email: email, password: password, cargo: cargo } = req.body;
    const user = {
        username: username,
        email: email,
        password: password,
        cargo: cargo,
    };
    User_1.default.create({
        username: user.username,
        email: user.email,
        password: user.password,
        cargo: user.cargo,
    });
    res.json({
        sucess: true,
    });
});
routes.put("/updateUser/:id", async (req, res) => {
    const id = req.params.id;
    const { userName: userName, email: email, password: password, cargo: cargo } = req.body;
    const user = {
        userName: userName,
        email: email,
        password: password,
        cargo: cargo,
    };
    User_1.default.updateOne({ _id: id }, {
        $set: {
            username: user.userName,
            email: user.email,
            password: user.password,
            cargo: user.cargo,
        }
    }, { new: true }).then((postRes) => {
        res.json({
            sucess: true,
        });
    });
});
routes.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    await User_1.default.findOneAndDelete({ _id: id }).then(() => {
        res.json({
            deleteUser: true,
        });
    });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map