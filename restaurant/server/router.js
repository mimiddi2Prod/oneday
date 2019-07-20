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
                case "restaurant_get_openid":{
                    var RestaurantGetOpenid = require("./apis/restaurant_get_openid");
                    work = new RestaurantGetOpenid;
                    break;
                }
                case "restaurant_get_category_by_location_code":{
                    var RestaurantGetCategoryByLocationCode = require("./apis/restaurant_get_category_by_location_code");
                    work = new RestaurantGetCategoryByLocationCode;
                    break;
                }
                case "restaurant_add_order":{
                    var RestaurantAddOrder = require("./apis/restaurant_add_order");
                    work = new RestaurantAddOrder;
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