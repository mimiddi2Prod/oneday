const mysql = require("mysql");
const pool = mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"queue"
});

let query = function(sql, arr){
    return new Promise(function(resovle, reject){
        pool.getConnection(function(err, conn){
            if(err){
                reject(err);
            }else{
                conn.query(sql, arr, function(err, res){
                    if(err){
                        reject(err);
                    }else{
                        res = JSON.stringify(res);
                        res = JSON.parse(res);
                        resovle(res);
                    }
                    conn.release();
                })
            }
        })
    });
}

module.exports = {
    query:query
}