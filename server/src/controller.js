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
exports.updateAdmin = exports.updateThreshold = exports.updateRecord = exports.getSpecificRecords = exports.getyesterdayRecords = exports.getCurrentRecords = exports.getThresholdData = exports.getEmployees = exports.validate = exports.getProfile = exports.getName = exports.resetPassword = exports.updateuser = exports.logout = exports.userInfo = exports.insertData = exports.verifyUserPermissions = exports.login = exports.register = void 0;
const conn_js_1 = require("./conn.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const luxon_1 = require("luxon");
require("dotenv/config");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employee, username, password, phone, name } = req.body;
        console.log(username, password, phone, name);
        conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE employee_id=$1`, [employee.trim()], (err, result) => {
            try {
                if (result.rowCount == 0) {
                    const hashed = bcrypt_1.default.hashSync(password, Number(process.env.SALTING));
                    conn_js_1.client.query(`INSERT INTO EMPLOYEE (employee_id,name,email,password,phonenumber) VALUES ($1,$2,$3,$4,$5)`, [employee.trim(), name.trim(), username.trim(), hashed, phone], (err, result) => {
                        if (err) {
                            if (err.code == '23505') {
                                res.send({ msg: "Email Already Exists" });
                            }
                            else {
                                res.send({ msg: "Something went wrong" });
                            }
                        }
                        if (result) {
                            res.send({ msg: "Successfully Registered" });
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
            conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE email=$1 or name=$1 or employee_id=$1`, [username.trim()], (err, result) => __awaiter(this, void 0, void 0, function* () {
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
function verifyUserPermissions(empid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE employee_id=$1 and admin=1`, [empid]);
        console.log(result.rowCount);
        if (result.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.verifyUserPermissions = verifyUserPermissions;
function insertData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empid, temp, gcs, comp, moist, perm } = req.body;
        console.log(req.body);
        const date = luxon_1.DateTime.local();
        try {
            // Verify user permissions.
            if (!(yield verifyUserPermissions(empid))) {
                res.send({ msg: "User not allowed to insert data." });
            }
            else {
                conn_js_1.client.query(`INSERT INTO MACHINEDATA (empid, temp, gcs, comp, moist, perm, datetime) VALUES ($1, $2, $3, $4, $5, $6,$7)`, [empid.trim(), parseFloat(temp), parseFloat(gcs), parseFloat(comp), parseFloat(moist), parseFloat(perm), date.toJSDate()], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        +res.send({ msg: "Something went wrong" });
                    }
                    else {
                        res.send({ msg: "Successfuly Inserted" });
                    }
                }));
            }
        }
        catch (err) {
            res.send({ msg: "Something went wrong" });
        }
    });
}
exports.insertData = insertData;
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
    console.log(req.body);
    conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE email=$1`, [req.body.email[0]], (err, result) => {
        if (result.rowCount > 0) {
            const hashed = bcrypt_1.default.hashSync(req.body.password[0], Number(process.env.SALTING));
            conn_js_1.client.query(`UPDATE employee SET password=$1 where email=$2`, [hashed, req.body.email[0]], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send({ msg: "Updated Successfuly" });
                }
            });
        }
        else {
            res.send({ msg: "Email doesn't exists" });
        }
    });
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
    conn_js_1.client.query(`SELECT * FROM EMPLOYEE WHERE employee_id=$1 `, [id], (err, result) => {
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
    conn_js_1.client.query(`SELECT * FROM EMPLOYEE order by name`, (err, result) => {
        res.send({ data: result.rows });
    });
}
exports.getEmployees = getEmployees;
function getThresholdData(req, res) {
    const type = req.params['type'];
    // console.log(type)
    if (type) {
        conn_js_1.client.query(`SELECT * FROM threshold where name=$1`, [type], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ data: result.rows });
            }
        });
    }
    else {
        conn_js_1.client.query(`SELECT * FROM threshold order by name`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ data: result.rows });
            }
        });
    }
}
exports.getThresholdData = getThresholdData;
function getCurrentRecords(req, res) {
    const date = luxon_1.DateTime.local();
    const start = date.startOf('day');
    const end = date.endOf('day');
    conn_js_1.client.query(`select * from machinedata where datetime>=$1 and datetime<=$2 order by datetime asc`, [start, end], (err, result) => {
        res.send({ data: result.rows });
    });
}
exports.getCurrentRecords = getCurrentRecords;
function getyesterdayRecords(req, res) {
    const date = luxon_1.DateTime.local();
    const start = date.minus({ days: 1 }).startOf('day');
    const end = date.minus({ days: 1 }).endOf('day');
    conn_js_1.client.query(`select * from machinedata where datetime>=$1 and datetime<=$2 order by datetime asc`, [start, end], (err, result) => {
        res.send({ data: result.rows });
    });
}
exports.getyesterdayRecords = getyesterdayRecords;
function getSpecificRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.type[0] === 'Graph') {
            const start = new Date(req.body.from);
            const end = new Date(req.body.to);
            var out = [];
            var dateTime = [];
            var data = [];
            const result = yield conn_js_1.client.query(`SELECT datetime, ${req.body.machinetype} FROM machinedata WHERE datetime BETWEEN $1 AND $2 ORDER BY datetime ASC`, [req.body.from + ' 00:00:00', req.body.to + ' 23:59:59']);
            // console.log(result.rows)
            var arrTime = result.rows.map((row) => (Object.values(row)[0]));
            var arrData = result.rows.map((row) => (Object.values(row)[1]));
            dateTime.push(arrTime);
            data.push(arrData);
            dateTime = dateTime.flat();
            const formattedDates = dateTime.map((dateObject) => {
                const utcDateTime = luxon_1.DateTime.fromJSDate(dateObject, { zone: 'utc' });
                const istDateTime = utcDateTime.setZone('Asia/Kolkata');
                const formattedDate = istDateTime.toFormat('yyyy-MM-dd HH:mm:ss');
                return formattedDate;
            });
            data = data.flat();
            const formatedData = data.map((str) => (isNaN(Number(str)) ? 0 : Number(str)));
            out.push(formattedDates);
            out.push(formatedData);
            // console.log(out)
            res.send({ data: out, msg: "Success" });
        }
        else {
            conn_js_1.client.query(`select * from machinedata where datetime>=$1 and datetime<=$2 order by datetime asc`, [req.body.from + ' 00:00:00', req.body.to + ' 23:59:59'], (err, result) => {
                if (err) {
                    res.send({ msg: "Something went wrong" });
                }
                else {
                    console.log(result.rows);
                    res.send({ data: result.rows, msg: "Success" });
                }
            });
        }
    });
}
exports.getSpecificRecords = getSpecificRecords;
function updateRecord(req, res) {
    const { datetime, temp, gcs, comp, moist, perm } = req.body;
    conn_js_1.client.query(`update machinedata set temp=$1,gcs=$2,comp=$3,moist=$4,perm=$5 where datetime=$6 `, [parseFloat(temp), parseFloat(gcs), parseFloat(comp), parseFloat(moist), parseFloat(perm), datetime], (err, result) => {
        if (err) {
            res.send({ msg: "Something went wrong" });
        }
        else {
            res.send({ msg: "Successfully Updated " });
        }
    });
}
exports.updateRecord = updateRecord;
function updateThreshold(req, res) {
    const { name, SC1, WL1, WL2, SC2 } = req.body;
    conn_js_1.client.query(`update threshold set "SC1"=$1,"WL1"=$2,"WL2"=$3,"SC2"=$4 where name=$5 `, [parseFloat(SC1), parseFloat(WL1), parseFloat(WL2), parseFloat(SC2), name], (err, result) => {
        if (err) {
            res.send({ msg: "Something went wrong" });
        }
        else {
            res.send({ msg: "Successfully Updated " });
        }
    });
}
exports.updateThreshold = updateThreshold;
function updateAdmin(req, res) {
    const id = req.params['id'];
    const { access } = req.body;
    if (access) {
        conn_js_1.client.query(`update employee set admin=$1 where employee_id=$2`, [1, id], (err, result) => {
            if (err) {
                res.send({ msg: "Something went wrong" });
            }
            else {
                res.send({ msg: "successfuly updated" });
            }
        });
    }
    else {
        conn_js_1.client.query(`update employee set admin=$1 where employee_id=$2`, [0, id], (err, result) => {
            if (err) {
                res.send({ msg: "Something went wrong" });
            }
            else {
                res.send({ msg: "successfuly updated" });
            }
        });
    }
}
exports.updateAdmin = updateAdmin;
