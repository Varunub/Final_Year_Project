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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = exports.validate = exports.getProfile = exports.getName = exports.resetPassword = exports.updateuser = exports.logout = exports.userInfo = exports.login = exports.register = void 0;
const conn_js_1 = require("./conn.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employee, username, password, phone, name } = req.body;
        console.log(username, password, phone, name);
        conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE employee_id=$1`, [employee], (err, result) => {
            try {
                if (result.rowCount == 0) {
                    const hashed = bcrypt_1.default.hashSync(password, Number(process.env.SALTING));
                    conn_js_1.client.query(`INSERT INTO EMPLOYEE (employee_id,name,email,password,phonenumber) VALUES ($1,$2,$3,$4,$5)`, [employee, name, username, hashed, phone], (err, result) => {
                        if (err) {
                            res.send({ msg: "Error inserting" });
                        }
                        if (result) {
                            res.send({ msg: "Successfully inserted" });
                        }
                    });
                }
                else {
                    console.log(result.rows[0]);
                    res.send({ msg: "Already Account Exist :Login" });
                }
            }
            catch (e) {
                res.send({ msg: "Something went wrong" });
            }
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const hashed = bcrypt_1.default.hashSync(password, Number(process.env.SALTING));
        try {
            conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE email=$1 or name=$1 or employee_id=$1`, [username], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (result.rowCount == 0) {
                    res.send({ msg: "Please register" });
                }
                else {
                    console.log(result.rows[0]);
                    if (bcrypt_1.default.compareSync(password, result.rows[0].password)) {
                        res.send({
                            msg: "Login Successful...!",
                            id: result.rows[0].employee_id,
                        });
                        // res.cookie("jwt",token,{
                        //     expires:new Date(Date.now()+50000),httpOnly:true
                        // })
                        // // console.log("this cookie is awesome", req.cookie.jwt)
                        // res.send({ msg: "login:success ...!" });
                    }
                    else {
                        res.send({ msg: "Incorrect password" });
                    }
                }
            }));
        }
        catch (err) {
            res.send({ msg: "Something went wrong..." });
        }
    });
}
exports.login = login;
function userInfo(req, res) {
    const token = req.cookies;
    console.log("token", token);
}
exports.userInfo = userInfo;
function logout(req, res) {
}
exports.logout = logout;
function updateuser(req, res) {
    console.log(req.body);
    if (!req.body.password) {
        conn_js_1.client.query(`UPDATE employee SET email=$1,phonenumber=$2 where employee_id=$3`, [req.body.email, req.body.phonenumber, req.body.employee_id], (err, result) => {
            if (err) {
                res.send({ msg: "error" });
            }
            else {
                res.send({ msg: "success" });
            }
        });
    }
    else {
        const hashed = bcrypt_1.default.hashSync(req.body.password, Number(process.env.SALTING));
        conn_js_1.client.query(`UPDATE employee SET email=$1,phonenumber=$2,password=$3 where employee_id=$4`, [req.body.email, req.body.phonenumber, hashed, req.body.employee_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ msg: "success" });
            }
        });
    }
}
exports.updateuser = updateuser;
function resetPassword(req, res) {
}
exports.resetPassword = resetPassword;
function getName(req, res) {
    const id = req.params['id'];
    conn_js_1.client.query(`SELECT name FROM EMPLOYEE WHERE employee_id=$1`, [id], (err, result) => {
        if (err) {
            res.send({ name: null, msg: "something went wrong" });
        }
        else {
            res.send({ name: result.rows[0].name, msg: "success" });
        }
    });
}
exports.getName = getName;
function getProfile(req, res) {
    const id = req.params['id'];
    conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE employee_id=$1`, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ data: result.rows[0], msg: "success" });
        }
    });
}
exports.getProfile = getProfile;
function validate(req, res) {
    // console.log(req.body.data)
    conn_js_1.client.query(`SELECT password FROM EMPLOYEE WHERE employee_id=$1`, [req.params.id], (err, result) => {
        if (bcrypt_1.default.compareSync(req.body.data, result.rows[0].password)) {
            res.send({ msg: "success" });
        }
        else {
            res.send({ msg: "error" });
        }
    });
}
exports.validate = validate;
function getEmployees(req, res) {
    conn_js_1.client.query(`SELECT * FROM EMPLOYEE`, (err, result) => {
        res.send({ data: result.rows });
    });
}
exports.getEmployees = getEmployees;
