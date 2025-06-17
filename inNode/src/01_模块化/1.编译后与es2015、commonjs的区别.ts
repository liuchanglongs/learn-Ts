// 1. esModuleInterop : 不开启
import fs from "fs"; // 内部是 module.exports = {}
fs.readFileSync("./");

// import * as fs from "fs"; // 内部是 module.exports = {}
// fs.readFileSync("./");

// 2.开启
