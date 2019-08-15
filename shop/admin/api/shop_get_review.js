var db = require("./../utils/dba");
// const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function shopGetReview() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select count(id) from review_detail where item_id = ?";
            row = await db.Query(sql, param['item_id']);
            data.number = row[0]['count(id)']

            sql = "select id,text,image,param_1,param_2,create_time from review_detail where item_id = ? order by create_time desc limit ?,?"
            row = await db.Query(sql, [param['item_id'], param['last_id'] * 4, 4])

            if (row.length > 0) {
                row.map(function (fn) {
                    fn.image = JSON.parse(fn.image)
                    return fn
                })
                data.reviewList = row
            }

            if (param['review_id'] == 0) {
                // 没有设置最佳评论，显示最新评论
                sql = "select id,text,image,param_1,param_2,create_time from review_detail where item_id = ? order by create_time desc limit ?"
                row = await db.Query(sql, [param['item_id'], 1])
                if (row.length > 0) {
                    data.best_review = []
                    data.best_review.push({
                        id: row[0].id,
                        text: row[0].text,
                        image: JSON.parse(row[0].image),
                        create_time: row[0].create_time,
                        param_1: row[0].param_1,
                        param_2: row[0].param_2,
                        review_id: param['review_id']
                    })
                }
            } else if (param['review_id'] > 0) {
                sql = 'select * from review where id = ?'
                row = await db.Query(sql, param['review_id']);
                data.best_review = []
                if (row.length > 0) {
                    let best_review_detail_id = row[0].best_review_detail_id
                    if (best_review_detail_id > 0) {
                        // 获取商品热门评价详情
                        sql = 'select id,text,image,create_time,param_1,param_2 from review_detail where id = ?'
                        row = await db.Query(sql, best_review_detail_id);
                        data.best_review.push({
                            id: row[0].id,
                            text: row[0].text,
                            image: JSON.parse(row[0].image),
                            create_time: row[0].create_time,
                            param_1: row[0].param_1,
                            param_2: row[0].param_2,
                            review_id: param['review_id']
                        })
                    }
                }

            }

            // sql = "select image,name,review_id from item where id = ?"
            // row = await query(sql, param['item_id'])
            // data.goodsInfo = row[0]
            // data.goodsInfo.item_id = param['item_id']
            // data.goodsInfo.image = JSON.parse(row[0].image)[0]

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetReview;