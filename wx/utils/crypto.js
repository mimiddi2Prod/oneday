let crypto = require("crypto")
let XMLJS = require('xml2js');
// const wxConfig = require("../config/wxConfig")

exports.DecodeAES = async function (data) {
    const wxConfig = require("../utils/wechat_api").wxConfig
    let aesKey = Buffer.from(wxConfig.EncodingAESKey + '=', 'base64');
    let aesCipher = crypto.createDecipheriv("aes-256-cbc", aesKey, aesKey.slice(0, 16));
    aesCipher.setAutoPadding(false);
    let decipheredBuff = Buffer.concat([aesCipher.update(data, 'base64'), aesCipher.final()]);
    decipheredBuff = PKCS7Decoder(decipheredBuff);
    let len_netOrder_corpid = decipheredBuff.slice(16);
    let msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
    let xml = len_netOrder_corpid.slice(4, msg_len + 4).toString(); // 返回一个解密后的明文
    const result = await XMLParse(xml)
    return result;
}

function PKCS7Decoder(buff) {
    var pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
        pad = 0;
    }
    return buff.slice(0, buff.length - pad);
}

async function XMLParse(xml) {
    return new Promise(function (resolve, reject) {
        XMLJS.parseString(xml, async (err, data) => {
            resolve(data) // 返回一个xml转换后的数据
        })
    })
}