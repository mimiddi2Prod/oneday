var tools = require("./tool");

const crypto = require('crypto')
var fs = require('fs');
const path = require('path')

function shopLogin() {
    var tool = new tools;
    var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param['username'].length <= 0) {
                console.info('username is null')
            } else if (!param['password']) {
                console.info('password is null')
            } else {
                const privateKey = fs.readFileSync(path.join(__dirname, '../rsa/pem/private.pem')).toString('utf-8')
                const password = Decrypt(param['password'], privateKey)
                // param['username'] = encodeURIComponent(param['username'])

                sql = "select id,`type`,position_id from admin where username = ? and password = ?";
                row = await query(sql, [param['username'], password]);
                if (row.length > 0) {
                    data.text = "login is success"
                    data.id = row[0].id
                    data.type = row[0].type

                    if (data.type == 1 && row[0].position_id) {
                        sql = "select * from `position` where id = ?"
                        row = await query(sql, row[0].position_id)
                        data.position = row
                    }
                    console.info(data)

                    sql = "update admin set last_login_time = CURRENT_TIMESTAMP where id = ?"
                    row = await query(sql, data.id)
                } else {
                    data.text = 'login is fail'
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopLogin;

function Decrypt(src, privateKey) {
    src = src.replace(/\s+/g, '+')
    let buffer2 = new Buffer(src, 'base64')
    let decrypted = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer2
    )
    return decrypted.toString('utf-8')
}