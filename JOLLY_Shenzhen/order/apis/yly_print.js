var db = require("./../utils/dba");
var yly = require("./../utils/yly")
let repeat = require('repeat-string')

const {formatTime} = require("./../utils/utils")

exports.run = async function (params) {
    let data = {}
    return new Promise(async function (resolve, reject) {
        data = await print(params)
        if (data) {
            resolve({
                errcode: 0,
                errmsg: 'request success',
                data: {
                    params: params,
                    data: data
                }
            })
        } else {
            reject({
                errcode: 2,
                errmsg: 'request fail'
            })
        }
    })
};

async function print(params) {
    let call;
    switch (params.type) {
        case "sign_out": {
            call = await printSignOut(params)
            break;
        }
        case "order": {
            call = await printOrder(params.data)
            break;
        }
    }
    return call
}

// todo 模板选择打印
/**
 * params应至少包含
 * type 1 god 2 admin 3 employee_account
 * */
async function printSignOut(params) {
    let printData = {},
        result = await db.Query("select * from admin where username = ? and type = ?", [params.username, 3])
    if (!result.length) {
        return {code: 0, errmsg: "不是员工账号或不存在"};
    }
    let last_login_time = new Date(result[0].last_login_time)
    result = await db.Query("select * from goods_trade where employee_account = ? and pay_status = ? and create_time >= ?", [params.username, 1, last_login_time])
    let Online = {
        name: "网点单据",
        total_price: 0,
        number: 0
    }, Reception = {
        name: "店内单据",
        total_price: 0,
        number: 0
    }, Topup = {
        name: "会员充值",
        total_price: 0,
        number: 0
    }, TotalIncome = {
        name: "营业实收",
        total_price: 0,
        number: 0
    }
    let wxpay = {
        total_price: 0,
        number: 0
    }, alipay = {
        total_price: 0,
        number: 0
    }, cash = {
        total_price: 0,
        number: 0
    }
    result.forEach(m => {
        if (m.pay_method == "Wxpay") {
            // 小程序
            Online.total_price += m.actually_total_price
            Online.number++

            wxpay.total_price += m.actually_total_price
            wxpay.number++
        } else if (new RegExp(m.pay_method).test("现金支付宝微信")) {
            Reception.total_price += m.actually_total_price
            Reception.number++
        }

        if (m.pay_method == "微信") {
            wxpay.total_price += m.actually_total_price
            wxpay.number++
        } else if (m.pay_method == "支付宝") {
            alipay.total_price += m.actually_total_price
            alipay.number++
        } else if (m.pay_method == "现金") {
            cash.total_price += m.actually_total_price
            cash.number++
        }
    })
    TotalIncome.total_price = Online.total_price + Reception.total_price
    TotalIncome.number = Online.number + Reception.number
    // 查询今日结账等数据并打印
    var content = "<MN>1</MN>";
    content += "<FS2><center>**#1 Oneday 森南店交接班**</center></FS2>";
    content += repeat('.', 32);
    content += "<FS2><center>--Oneday 森南店--</center></FS2>";
    // content += "<FS><center>张周兄弟烧烤</center></FS>";
    content += "开始时间:" + formatTime(last_login_time) + "\n";
    content += "结束时间:" + formatTime(new Date()) + "\n";
    content += repeat('-', 28);
    content += "<table>";
    content += "<tr><td>" + Online.name + "</td><td>" + Online.total_price + "元</td><td>共" + Online.number + "笔</td></tr>";
    content += "<tr><td>" + Reception.name + "</td><td>" + Reception.total_price + "元</td><td>共" + Reception.number + "笔</td></tr>";
    content += "<tr><td>" + Topup.name + "</td><td>" + Topup.total_price + "元</td><td>共" + Topup.number + "笔</td></tr>";
    content += "<tr><td>" + TotalIncome.name + "</td><td>" + TotalIncome.total_price + "元</td><td>共" + TotalIncome.number + "笔</td></tr>";
    content += "</table>";
    content += repeat('-', 28);
    content += "<table>";
    content += "<tr><td>支付统计</td></tr>";
    content += "<tr><td>微信</td><td>" + wxpay.total_price + "元</td><td>共" + wxpay.number + "笔</td></tr>";
    content += "<tr><td>支付宝</td><td>" + alipay.total_price + "元</td><td>共" + alipay.number + "笔</td></tr>";
    content += "<tr><td>现金</td><td>" + cash.total_price + "元</td><td>共" + cash.number + "笔</td></tr>";
    content += "</table>";
    content += repeat('-', 28);
    // content += "<QR>this is qrcode,you can write Officical Account url or Mini Program and so on</QR>";
    // content += "小计:￥82\n";
    // content += "折扣:￥４ \n";
    // content += repeat('*', 32);
    // content += "订单总价:￥78 \n";
    // content += "130515456456 \n";
    // content += "厦门市集美区sxxxxx \n";
    content += "<table>";
    content += "<tr><td>店铺地址</td><td>深圳市王母社区大鹏山庄中区13号101</td></tr>";
    content += "</table>";
    content += "<FS2><center>**#1 完**</center></FS2>";

    console.info(yly.Machine)
    let machineCode = yly.Machine.filter(val => {
            return val.name == "前台"
        })[0].machine_code, //一台设备
        originId = "jjb"
    yly.Print.index(machineCode, originId, content).then(function (res) {
        console.log(res);
        resolve(res);
    });
}

/**
 * params应至少包含
 * 1.基础订单数据，包括但不限于商品名，数量，单价等，令可使订单号 trade_id 作为 originId 使用
 * 2.打单数量，根据情况，配送类的可能需要两联，一联留底一联给配送员，店内类的后厨只需要一联即可，前台仍需两联
 * 3.机器码，根据机器码的不同选择不同的打单机打单
 * 4.（选做）打单模板选择，不同店铺选择打印的样式不同，属性增加或减少，
 *   同一订单可能需要多单打印，包括前台打单，后厨打单等
 * */
async function printOrder(params) {
    // let repeat = require('repeat-string')
    // todo 将获得的数据data放入打印单上
    var content = "<MN>2</MN>"; // 打印两联
    content += "<FS2><center>**#1 美团**</center></FS2>";
    content += repeat('.', 32);
    content += "<FS2><center>--在线支付--</center></FS2>";
    content += "<FS><center>张周兄弟烧烤</center></FS>";
    content += "订单时间:2018-12-27 16:23\n";
    content += "订单编号:40807050607030\n";
    content += repeat('*', 14) + "商品" + repeat("*", 14);
    content += "<table>";
    content += "<tr><td>商品</td><td>数量</td><td>价格</td></tr>";
    content += "<tr><td>烤土豆(超级辣)</td><td>x3</td><td>5.96</td></tr>";
    content += "<tr><td>烤豆干(超级辣)</td><td>x2</td><td>3.88</td></tr>";
    content += "<tr><td>烤鸡翅(超级辣)</td><td>x3</td><td>17.96</td></tr>";
    content += "<tr><td>烤排骨(香辣)</td><td>x3</td><td>12.44</td></tr>";
    content += "<tr><td>烤韭菜(超级辣)</td><td>x3</td><td>8.96</td></tr>";
    content += "</table>";
    content += repeat('.', 32);
    content += "<QR>this is qrcode,you can write Officical Account url or Mini Program and so on</QR>";
    content += "小计:￥82\n";
    content += "折扣:￥４ \n";
    content += repeat('*', 32);
    content += "订单总价:￥78 \n";
    content += "130515456456 \n";
    content += "厦门市集美区sxxxxx \n";
    content += "<FS2><center>**#1 完**</center></FS2>";

    // machineCode = "4004639956" //一台设备
    yly.Print.index(machineCode, originId, content).then(function (res) {
        console.log(res);
        resolve(res);
    });
}