var fs = require("fs")
var path = require("path")

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        data = await getData()
        if (!data.err) {
            resolve({
                errcode: 0,
                errmsg: "request success",
                data: data
            })
        } else {
            reject({
                errcode: 2,
                errmsg: "request fail"
            })
        }
    })
};


async function getData() {
    const publicKey = fs.readFileSync(path.join(__dirname,'../web/source/rsa/pem/public.pem')).toString('utf-8')
    return {key: publicKey}
}

