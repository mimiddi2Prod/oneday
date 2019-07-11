function JUMPLog(){
    this.LogLevel = "w|r|g|y|b|p";//white, red, green, yellow, blue, purple
    this.white = function(name, ...vars){
        if(this.LogLevel.indexOf("w") == -1){return;}
        let strLog = this.MakeHead(name);
        for(let i = 0; i < vars.length; i++){
            strLog += vars[i];
        }
        console.info(strLog);
    };
    this.debug = this.white;
    this.red = function(name, ...vars){
        if(this.LogLevel.indexOf("r") == -1){return;}
        let strLog = this.MakeHead(name);
        for(let i = 0; i < vars.length; i++){
            strLog += vars[i];
        }
        console.info('\x1b[31m%s\x1b[0m', strLog);//red output
    };
    this.error = this.red;
    this.green = function(name, ...vars){
        if(this.LogLevel.indexOf("g") == -1){return;}
        let strLog = this.MakeHead(name);
        for(let i = 0; i < vars.length; i++){
            strLog += vars[i];
        }
        console.info('\x1b[32m%s\x1b[0m', strLog);//green output
    };
    this.info = this.green;
    this.yellow = function(name, ...vars){
        if(this.LogLevel.indexOf("y") == -1){return;}
        let strLog = this.MakeHead(name);
        for(let i = 0; i < vars.length; i++){
            strLog += vars[i];
        }
        console.info('\x1b[33m%s\x1b[0m', strLog);//yellow output
    };    
    this.warn = this.yellow;
    this.MakeHead = function(name){
        var date = new Date();
        var strDate = 
            date.getUTCMonth() + "/" + date.getUTCDate() + " " 
            + date.getHours() + ":" + date.getMinutes() + ":" 
            + date.getSeconds() + "." + date.getMilliseconds();
        let strLog = "[" + strDate + "][" + name + "]:";
        return strLog;
    }
}

module.exports = JUMPLog;