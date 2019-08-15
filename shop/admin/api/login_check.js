// var tools = require("./tool");
var db = require("./../utils/dba");

const crypto = require('crypto')
var fs = require('fs');
const path = require('path')

// var session = require('client-sessions')

function loginCheck() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            if(param['str'] == param['serverSessionUser'].str){
                data.code = 0
                data.user = param['serverSessionUser']
            }else{
                data.code = 1
                data.user = ''
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = loginCheck;

// function Decrypt(src, privateKey) {
//     src = src.replace(/\s+/g, '+')
//     let buffer2 = new Buffer(src, 'base64')
//     let decrypted = crypto.privateDecrypt({
//             key: privateKey,
//             padding: crypto.constants.RSA_PKCS1_PADDING
//         },
//         buffer2
//     )
//     return decrypted.toString('utf-8')
// }