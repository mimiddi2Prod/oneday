var db = require("./../utils/dba");

function YinbaoGetCategoryHot() {
    this.Service = async function (version, param, callback) {
        var data = {}
        try {
            data.subCateHot = await db.Query("select * from restaurant_category_hot")
            data.goods = await db.Query("select * from restaurant_goods_hot")

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }

    }
}

module.exports = YinbaoGetCategoryHot;
