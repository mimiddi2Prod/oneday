var dbConfig = require('./../config/dbConfig')
var ip = dbConfig.host,
    port = dbConfig.port,
    user = dbConfig.user,
    psw = dbConfig.password,
    database = dbConfig.database

function DBA() {
}

DBA.Init = function () {
    if (!DBA.pool) {
        const mysql = require('mysql');
        DBA.pool = mysql.createPool({
            host: ip,
            port: port,
            user: user,
            password: psw,
            database: database
        })
    }
    return DBA.pool;
}
DBA.Query = function (sql, arr) {
    return new Promise(function (resolve, reject) {
        DBA.pool.getConnection(function (err, conn) {
            if (err) {
                reject(err);
                conn.release();
            } else {
                conn.query(sql, arr, function (err, res) {
                    if (err) {
                        reject(err);
                        conn.release();
                    } else {
                        res = JSON.stringify(res);
                        res = JSON.parse(res);
                        resolve(res);
                    }
                    conn.release();
                })
            }
        })
    })
};

/**
 * 有则更新，无则插入
 * 关键字 on duplicate key update
 * update：{
 *     list:[num],
 *     str:"num = num + 2"
 * }
 * list 和 str 二选一
 *
 * 示例：
 * INSERT INTO cart(openid,p_id,sku_id,num) VALUES("o1ocv5ektU9hHLmbWQ0DFwN9I9OE",5,2,2),("o1ocv5ektU9hHLmbWQ0DFwN9I9OE",6,3,3) on duplicate key update
 num = VALUES (num); 给不同记录更新不同值 或者 num = num +2; 在原有的基础上+2

 * var db = require("./../utils/dba");
 * let result = await db.BulkInsertOrDuplicateUpdate("user", [{"key1": "value1","key2": "value2"},{"key1": "value3","key2": "value4"}], {list:[]/str:""})
 */

DBA.BulkInsertOrDuplicateUpdate = async function (table, insert_list, update) {
    return new Promise(async function (resolve, reject) {
        if (isEmpty(insert_list) || ((update.list && isEmpty(update.list)) && (update.str && isEmpty(update.str)))) {
            resolve({
                errmsg: "sql is error,list not to exist"
            })
        }
        // 插入部分
        let i_keys = Object.keys(insert_list[0]),
            sql = "insert into " + "`" + table + "` (`" + i_keys.join("`,`") + "`) values ",
            string_1 = "(" + (() => {
                let temp = []
                i_keys.forEach(() => {
                    temp.push("?")
                })
                return temp
            })() + ")",
            string_2 = (() => {
                let temp = []
                insert_list.forEach(() => {
                    temp.push(string_1)
                })
                return temp
            })()
        sql += string_2
        // 整理获得插入数据
        let arr = []
        insert_list.forEach((value) => {
            arr = arr.concat(Object.values(value))
        })

        // 更新部分
        sql += " on duplicate key update "
        if (update.list) {
            for (let i in update.list) sql += "`" + update.list[i] + "` = VALUES (`" + update.list[i] + "`)";
        } else if (update.str) {
            sql += update.str;
        }
        // 执行sql部分
        let row = await DBA.Query(sql, arr)
        if (row.insertId) {
            resolve({
                code: row.affectedRows == insert_list.length ? 0 : 1, // 0 插入 1 更新
                errmsg: row.insertId ? "success" : "insert failed"
            })
        }
    })
}

/**
 * 是否为空
 * */
function isEmpty(obj) {
    //检验null和undefined
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    //检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}

module.exports = DBA;