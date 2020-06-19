var dbConfig = require('./../config/dbConfig')
const {isEmpty} = require("./utils")
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
DBA.Select = async function (column, table, condition, conditionIn, other) {
    return new Promise(async function (resolve, reject) {
        let sql = "select " + column + " from " + table
        let valueList = [], conditionList = []
        if (condition) {
            sql += " where "
            for (let i in condition) {
                conditionList.push(condition[i].key + " = ?")
                valueList.push(condition[i].value)
            }
            conditionList = conditionList.join(" and ")
            sql += conditionList
        }
        if (conditionIn) {
            // value 需是一个数组 []
            if (sql.indexOf("where") == -1) {
                sql += " where "
            }
            for (let i in conditionIn) {
                conditionList.push(conditionIn[i].key + " in (?)")
                valueList.push(conditionIn[i].value)
            }
            sql += conditionList
        }
        if (other) {
            sql += " " + other
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
 * 批量插入多组数据
 * table:数据库表名
 * list:[{key1:value1,key2:value2},{key1:value3,key2:value4}]
 */
DBA.BulkInsert = async function (table, list) {
    return new Promise(async function (resolve, reject) {
        if (isEmpty(list)) {
            resolve({
                errmsg: "sql is error,list not to exist"
            })
        }
        let keys = Object.keys(list[0])
        let sql = "insert into " + "`" + table + "` (`" + keys.join("`,`") + "`) values "
        let string_1 = "(" + (() => {
            let temp = []
            keys.forEach(() => {
                temp.push("?")
            })
            return temp
        })() + ")"
        let string_2 = (() => {
            let temp = []
            list.forEach(() => {
                temp.push(string_1)
            })
            return temp
        })()
        sql += string_2
        // 整理获得插入数据
        let arr = []
        list.forEach((value) => {
            arr = arr.concat(Object.values(value))
        })
        let row = await DBA.Query(sql, arr)
        // 添加数据对应的id列表
        let id_list = []
        if (row.affectedRows == list.length) {
            for (let i = 0; i < row.affectedRows; i++) {
                id_list[i] = row.insertId + i
            }
            resolve({
                id_list: id_list,
                errmsg: "success"
            })
        } else {
            resolve({
                errmsg: "insert failed"
            })
        }
    })
}


module.exports = DBA;