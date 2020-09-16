var log = require('./utils/log')

function MakeResponse(code, obj, res) {
    var error = require("./error");
    res.writeHead(code, {"content-type": "text/html;charset=utf-8"});

    try {
        res.write(JSON.stringify(obj));
    } catch (err) {
        res.write(JSON.stringify({res: error.ErrorWhenMakeResponse, data: {}}));
        log.warn("MakeResponse::MakeResponse", "make the obj to json string is fail");
    }
}

module.exports = MakeResponse;

