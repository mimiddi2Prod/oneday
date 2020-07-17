var db = require("./../utils/dba");

module.exports = async function (cookie) {
    let data = {}
    // console.info(cookie)
    if (!cookie.token) {
        data.text = false
        return data
    } else {
        if (cookie.token.length <= 0) {
            data.text = false
            return data
        } else {
            let sql = 'select token_expire from admin where token = ?'
            let row = await db.Query(sql, cookie.token)
            let current_time = new Date()
            let token_expire = new Date(row[0].token_expire)
            if (row.length > 0) {
                if (token_expire > current_time) {
                    data.text = true
                    return data
                } else {
                    data.text = false
                    return data
                }
            }
        }
    }

}