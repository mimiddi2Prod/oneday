var tools = require("./../tool");
var qiniu = require("qiniu");

function SHOPGetUploadToken() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetUploadToken::Run";
        // log.debug("SHOPGetUploadToken::Run.in");
        var data = [];
        var response = tool.error.OK;
        var row = [];
        try {
            var accessKey = 'r4jtfPWWt-3YWnuJCVH9DAIp2h2SSBE5i6LwZJ7B';
            var secretKey = 'qStM0CzH2Lnt1-CWcqya4VGuQiR-WeByx4blseQI';
            var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            var bucket = "notwasting";

            var keyToOverwrite = param.key;
            var options = {
                scope: bucket + ":" + keyToOverwrite,
            };
            var putPolicy = new qiniu.rs.PutPolicy(options);
            var uploadToken=putPolicy.uploadToken(mac);

            var list = {}

            list.uploadToken = uploadToken
            list.key = param.key
            list.tempFilePath = param.tempFilePath
            data = list
        } catch (err) {
            if (err.code) {
                response = tool.error.ErrorSQL;
                log.warn(name, "code:", err.code, ", sql:", err.sql);
            } else {
                log.warn(name, JSON.stringify(response));
                response = tool.error.ErrorCatch;
            }
        }

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_uploadToken",
            }, res);
        // tool.log.debug("SHOPGetUploadToken::Run.out");
    }
}

module.exports = SHOPGetUploadToken;