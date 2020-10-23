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
    return new Promise(async function (resolve, reject) {
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
 * column：参数，插入更新的数据
 * table:：表名，sql对象表
 * condition：条件，对查询更新进行条件判断
 * */
/**
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Select("*", "user", [{key: "openid", value: "dsa"}])
 * */
DBA.Select = async function (column, table, condition, groupBy, orderBy, orderByDesc) {
    return new Promise(async function (resolve, reject) {
        let sql = "select " + column + " from " + table
        let valueList = [], conditionList = []
        if (condition.length > 0) {
            sql += " where "
            for (let i in condition) {
                conditionList.push(condition[i].key + " = ?")
                valueList.push(condition[i].value)
            }
            conditionList = conditionList.join(" and ")
            sql += conditionList
        }
        if(orderBy.length > 0){
            sql += " order by " + orderBy
        }
        let row = await DBA.Query(sql, valueList)
        resolve(row)
    })
}

/**
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Insert("user", [{key: "openid", value: "dsa"}])
 * */
DBA.Insert = async function (table, column) {
    return new Promise(async function (resolve, reject) {
        let sql = "insert into " + table
        let columnList = [], mark = [], valueList = []
        if (column.length > 0) {
            for (let i = 0; i < column.length; i++) {
                columnList.push(column[i].key)
                mark.push("?")
                valueList.push(column[i].value)
            }
            columnList = "(" + columnList.join(",") + ")values"
            mark = "(" + mark.join(",") + ")"
        } else {
            resolve({
                err: "sql is error,column not to exist"
            })
        }
        sql += columnList + mark
        let row = await DBA.Query(sql, valueList)
        let insertIdList = []
        if (row.affectedRows > 0) {
            let insertId = row.insertId
            for (let i = 0; i < row.affectedRows; i++) {
                insertIdList.push(insertId + i)
            }
        }
        resolve({
            insertIdList: insertIdList,
            errmsg: "success"
        })
    })
}

/**
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Insert("user", [{key: "openid", value: "dsa"}])
 * */
DBA.Update = async function (column, table, condition) {
    return new Promise(async function (resolve, reject) {
        let sql = "update " + table + " set "
        let columnList = [], conditionList = [], valueList = []
        if (column.length > 0) {
            for (let i = 0; i < column.length; i++) {
                columnList.push(column[i].key + " = ?")
                valueList.push(column[i].value)
            }
            columnList = columnList.join(",")
        } else {
            resolve({
                err: "sql is error,column not to exist"
            })
        }
        sql += columnList
        if (condition.length > 0) {
            sql += " where "
            for (let i = 0; i < condition.length; i++) {
                conditionList.push(condition[i].key + " = ?")
                valueList.push(condition[i].value)
            }
            conditionList = conditionList.join(",")
        } else {
            resolve({
                err: "sql is error,column not to exist"
            })
        }
        sql += conditionList
        let row = await DBA.Query(sql, valueList)
        resolve({
            insertIdList: row.changedRows,
            errmsg: "success"
        })
    })
}

/**
 * 有则更新，无则插入
 * 数据应为无时效性的，如重腾讯那边获取的 openid 和 session_key
 * session_key 为 具有时效性的数据
 * 简易示例：
 * var db = require("./../utils/dba");
 * let conditionList = [{key: "openid",value: data["openid"]}, {key: "session_key",value: data["session_key"]}]
 * await db.UpdateIfThereIs_InsertIfNot("*", "user", conditionList)
 * */
// todo 待更新 应考虑一些具有时效性的数据 暂时废弃 有需要再考虑
// DBA.UpdateIfThereIs_InsertIfNot = async function (column, table, condition) {
//     console.info(condition)
//     return new Promise(async function (resolve, reject) {
//         let result = await DBA.Select(column, table, condition)
//         console.info(result)
//         if (result.length <= 0) {
//             result = await DBA.Insert(table, condition)
//         } else {
//
//         }
//         resolve(result)
//     })
// }

module.exports = DBA;