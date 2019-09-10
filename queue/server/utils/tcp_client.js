var timeOutSecond = 2000;
function SendTo(data, addr, port){
    if(!addr){
        addr = "127.0.0.1";
    }
    if(!port){
        port = 5546;
    }
    var net = require("net");
    var FBLog = require("./log.js");
    var log = new FBLog;
    var client = new net.Socket();
    client.setEncoding("utf8");
    client.connect(port, addr, function(){
        log.info("SendTo::connect");
        client.write(data);
        setTimeout(() => {
            client.destroy();
        }, timeOutSecond);
    });
    client.on('error', function(err){
        log.warn("SendTo::connect", "on error, code:", err.code);
        client.destroy();
    });    
}

module.exports = SendTo;
