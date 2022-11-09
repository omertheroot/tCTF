const { config } = require("dotenv");
const fs = require("fs");
const { data } = require("jquery");
const db = require("./db");

var readConfig = function () {
    let rt = "okunamadı";
    try {
        const data = fs.readFileSync('config.json', 'utf8');
        rt = JSON.parse(data);
    } 
    catch (err) {
        rt = err;
    }
    return rt;
}

module.exports = {
    readConfig: readConfig
}