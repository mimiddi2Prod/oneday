const {isEmpty} = require("./utils")
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

// SELECT
// CONCAT(' select ',GROUP_CONCAT(COLUMN_NAME),' from ', TABLE_NAME,' ;')
// FROM information_schema.COLUMNS
// WHERE table_name = 'address'
// AND TABLE_SCHEMA = 'a_test_online_shop' and COLUMN_NAME != 'id';
/**
 * 查询 某个字段外的 其他所有字段
 */
DBA.WithoutColumn = async function (column, table) {
    let sql = "SELECT CONCAT('select ',GROUP_CONCAT(COLUMN_NAME),' from ', TABLE_NAME,' ') str"
    sql += " FROM information_schema.COLUMNS"
    sql += " WHERE table_name = '" + table + "'"
    sql += " AND TABLE_SCHEMA = '" + dbConfig.database + "'"
    sql += " AND COLUMN_NAME != '" + column + "'"
    let row = await DBA.Query(sql)
    return row[0].str
}

/**
 * column：要查询的数据
 * table:：表名，sql对象表
 * condition_obj：条件，对查询对象条件判断
 *
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Select_ver_2("*", "user", {"openid": "dsa"})
 * */
DBA.Select = async function (column, table, condition_obj, other) {
    return new Promise(async function (resolve, reject) {
        let valueList = [], conditionList = [], sql = "select " + column + " from `" + table + "`"
        if (condition_obj && !isEmpty(condition_obj)) {
            sql += " where "
            valueList = Object.values(condition_obj)
            for (let i in Object.keys(condition_obj)) {
                conditionList.push("`" + Object.keys(condition_obj)[i] + "` = ?")
            }
            conditionList = conditionList.join(" and ")
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

/**
 * column_obj：参数，要更新的数据
 * table:：表名，sql对象表
 * condition_obj：条件判断
 *
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Update_ver_2("{"key1": "value1", "key2": "value2"}, user", {"id": "1"})
 * */
DBA.Update = async function (column_obj, table, condition_obj) {
    return new Promise(async function (resolve, reject) {
        let sql = "update `" + table + "` set "
        let columnList = [], conditionList = [], valueList = []
        if (column_obj && !isEmpty(column_obj)) {
            valueList = Object.values(column_obj)
            for (let i in Object.keys(column_obj)) {
                columnList.push("`" + Object.keys(column_obj)[i] + "` = ?")
            }
            columnList = columnList.join(",")
        } else {
            resolve({
                err: "sql is error,column not to exist"
            })
        }
        sql += columnList
        if (condition_obj && !isEmpty(condition_obj)) {
            sql += " where "
            valueList = valueList.concat(Object.values(condition_obj))
            for (let i in Object.keys(condition_obj)) {
                conditionList.push("`" + Object.keys(condition_obj)[i] + "` = ?")
            }
            conditionList = conditionList.join(" and ")
        } else {
            resolve({
                err: "sql is error,condition not to exist"
            })
        }
        sql += conditionList
        let row = await DBA.Query(sql, valueList)
        row.changedRows ? resolve({
            changedRows: row.changedRows,
            errmsg: "success"
        }) : resolve({
            errmsg: "update failed"
        })
    })
}

/**
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.Delete_ver_2("user", {"key1": "value1", "key2": "value2"})
 * */
DBA.Delete = async function (table, condition_obj) {
    return new Promise(async function (resolve, reject) {
        let sql = "delete from " + "`" + table + "`"
        let valueList = [], conditionList = []
        if (condition_obj && !isEmpty(condition_obj)) {
            sql += " where "
            valueList = Object.values(condition_obj)
            for (let i in Object.keys(condition_obj)) {
                conditionList.push(Object.keys(condition_obj)[i] + " = ?")
            }
            conditionList = conditionList.join(" and ")
            sql += conditionList
        }
        let row = await DBA.Query(sql, valueList)
        resolve(row)
    })
}

/**
 * 有则更新，无则插入（关键字段：ignore）
 * 需配合数据库创建唯一索引
 * 例如购物车：应使用户id与产品id为唯一索引
 * 以小程序为例：字段（openid,p_id）,索引类型（Unique）,索引方法（BTREE）
 * 简易示例：
 * var db = require("./../utils/dba");
 * let result = await db.IgnoreInsert("user", [{key: "openid", value: "dsa"}])
 * */
DBA.IgnoreInsert = async function (table, column) {
    return new Promise(async function (resolve, reject) {
        let sql = "insert ignore into " + table
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

module.exports = DBA;