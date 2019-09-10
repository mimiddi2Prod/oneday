var tools = require("./tool")

function FBRouter(){
    var tool = new tools;
    this.Run = function(path, param, res){
        tool.log.info("FBRouter::Run.in");
        var arr = path.split("/");
        console.info(arr);
        if(arr.length < 3){
            tool.MakeResponse(200, {res: tool.error.ErrorPath, data: {}}, res);
            tool.log.warn("FBRouter::Run", "path is error");
        }else {
            var work = null;
            switch(arr[2]){
                case "queue":{
                    var queue = require("./apis/queue");
                    work = new queue;
                    break;
                }
                case "update_queue_time_by_token":{
                    var updateQueueTimeByToken = require("./apis/update_queue_time_by_token");
                    work = new updateQueueTimeByToken;
                    break;
                }
                default:
                    break;
            }
            if(work){
                work.Run(arr[1], param, res).then(function(obj){
                    res.end();
                    tool.log.info("FBRouter::Run.out");
                });
            }else{
                tool.MakeResponse(200, {res: tool.error.ErrorBranch, data: {}}, res);
                res.end();
            }
        }
    }
}

module.exports = FBRouter;