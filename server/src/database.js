"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
const client = new pg_1.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
client.connect();
// export async function insert(data:any){
//     const result=await find(data[0]);
//     if(!result){
//         client.query(`INSERT INTO EMPLOYEE (USERNAME,PASSWORD,PHONENUMBER) VALUES ($1, $2,$3)`,data,(err,res)=>{
//             if (err){
//             }
//         });
//         return 1;
//     }
//     else{
//         return 0;
//     }
// }
// export async function find(data:any){
//     const res= await client.query(`SELECT USERNAME FROM EMPLOYEE WHERE USERNAME=$1`,[data])
//     return res.rowCount;
// }
