var db = require("./../utils/dba");

function YinbaoGetDefaultSort() {
    this.Service = async function (version, param, callback) {
        var data = {}
        try {
            data.subCateSort = await db.Query("select * from yinbao_sort where `type` = ? order by sort desc", ["分类"])
            data.goods = await db.Query("select * from yinbao_sort where `type` = ? order by sort desc", ["商品"])

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }

    }
}

module.exports = YinbaoGetDefaultSort;
