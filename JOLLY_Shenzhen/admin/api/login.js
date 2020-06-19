var db = require("./../utils/dba");

const crypto = require('crypto')
// var fs = require('fs');
// const path = require('path')

var uuid = require('node-uuid')
const privateKey = require('./../utils/getPrivateKey').Get()

function shopLogin() {
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
                // const privateKey = fs.readFileSync(path.join(__dirname, '../rsa/pem/private.pem')).toString('utf-8')
                const password = Decrypt(param['password'], privateKey)
                // param['username'] = encodeURIComponent(param['username'])
                sql = "select id,`type` from admin where username = ? and password = ?";
                row = await db.Query(sql, [param['username'], password]);
                console.info(row)
                if (row.length > 0) {
                    data.text = "login is success"
                    data.id = row[0].id
                    data.type = row[0].type

                    data.token = uuid.v4()
                    data.expiredTime = new Date().getTime() + (12 * 1000 * 60 * 60)
                    let expiredTime = new Date(data.expiredTime)

                    sql = "update admin set token = ?,token_expire = ?,last_login_time = CURRENT_TIMESTAMP where id = ?"
                    row = await db.Query(sql, [data.token, expiredTime, data.id])
                    // if (data.type == 1 && row[0].position_id) {
                    //     sql = "select * from `position` where id = ?"
                    //     row = await db.query(sql, row[0].position_id)
                    //     data.position = row
                    // }
                    // console.info(data)

                    // sql = "update admin set last_login_time = CURRENT_TIMESTAMP where id = ?"
                    // row = await db.Query(sql, data.id)
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