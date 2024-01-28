"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./controller.js"));
const router = (0, express_1.Router)();
router.route('/register').post(controller.register);
router.route('/login').post(controller.login);
router.route('/validate/:id').post(controller.validate);
router.route('/insertRecord').post(controller.insertData);
router.route('/getname/:id').get(controller.getName);
router.route('/getprofile/:id').get(controller.getProfile);
router.route('/getemployees').get(controller.getEmployees);
router.route('/home').get(controller.userInfo);
router.route('/getcurrentrecords').get(controller.getCurrentRecords);
router.route('/getyesterdayrecords').get(controller.getyesterdayRecords);
router.route('/getthresholddata/:type?').get(controller.getThresholdData);
router.route('/getspecificrecord').post(controller.getSpecificRecords);
router.route('/resetpassword').put(controller.resetPassword);
router.route('/update').put(controller.updateuser);
router.route('/updateRecord').put(controller.updateRecord);
router.route('/updatethreshold').put(controller.updateThreshold);
router.route('/updateAdmin/:id').put(controller.updateAdmin);
router.route('./resetPassword').put(controller.resetPassword);
exports.default = router;
