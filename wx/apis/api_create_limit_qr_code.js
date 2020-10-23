var wechatApi = require("./../utils/wechat_api")
const fs = require('fs')
var qr_image = require('qr-image')

exports.run = async function (params) {
    return new Promise(async function (resolve, reject) {
        /**
         * fileSrc: 图片存储的文件夹
         * 如果没有文件夹 则创建
         * */
        let fileSrc = __dirname + "\\limit_qr_code\\"
        if (!fs.existsSync(fileSrc)) {
            fs.mkdirSync(fileSrc);
        }
        for (let i = 101; i <= 150; i++) {
            wechatApi.api.createLimitQRCode(i, function (err, result) {
                console.info(result)
                var temp_qrcode = qr_image.image(result.url, {ec_level: 'H'})//设置容错率level为30%
                temp_qrcode.pipe(fs.createWriteStream(fileSrc + i + ".png").on('finish', function () {
                    // console.info('write finished')
                }))
            });
        }
    })
};