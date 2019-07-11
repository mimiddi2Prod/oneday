var Tools = require("./tool");
var tool = new Tools;
async function test(){
    var row = await tool.query("select 1");
    console.info(row);
    tool.log.error("Hello");
}

test();