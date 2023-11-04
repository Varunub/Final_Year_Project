"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const conn_js_1 = require("./conn.js");
const router_js_1 = __importDefault(require("./router.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', router_js_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.post('/api/register', async (req,res)=>{
//     const {username,password,phonenumber}=req.body;
//     const msg=await insert([username,password,phonenumber]);
//     console.log(msg)
//     console.log("here")
//     app.get('/api/register', (req,res)=>{
//         res.json({success:true})
//     })
// })
app.listen(5000, () => {
    conn_js_1.client.connect();
    console.log("listening");
});
