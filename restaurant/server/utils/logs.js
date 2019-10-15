var fs = require('fs')
var formatTime = require('./formatTime')

function Log() {
}

Log.Init = function () {
    Log.LogLevel = ['Debug', 'Info', 'Warm', 'Error', 'Fatal']
}

Log.AppendFile = function (name, data, logLevel) {
    let log = Log.LogLevel[logLevel - 1]
    let current_time = formatTime(new Date())
    let string = '[' + current_time + '] [' + log + '] [' + name + '] ' + data + '\n'
    // try{
    //     fs.appendFileSync('log.txt', string)
    // }catch (err) {
    //     console.info(err)
    // }
    fs.appendFile('log.txt', string, function (err) {
        if (err) {
            console.info(err)
            return;
        }
    })
}

module.exports = Log