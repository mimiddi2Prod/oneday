var qiniu = require("qiniu");
var qiniuConfig = require('./../config/qiniuConfig')
module.exports = {

    writeImg: function (data, res) {
        var accessKey = qiniuConfig.accessKey;
        var secretKey = qiniuConfig.secretKey;
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var bucket = qiniuConfig.bucket;

        var keyToOverwrite = data.key;
        var options = {
            scope: bucket + ":" + keyToOverwrite,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);

        return res(uploadToken)


    }
}



