var userVM = new Vue({
    el: '#user',
    data: {
        navList: ['全部', '普通用户', '注册会员'],
        navId: -1,
        select_1: '商品ID',
        id_or_name: '',
        // start_time: '',
        // end_time: '',
        trade_id: '',

        userList: [],
        pageList: [],
        last_id: 0,

        logistics_type: '',
        logistics_order_id: '',
        logistics_code: '',
        logistics_tel: '', //顺丰快递查询还需要电话号码 后四位 格式-> 单号:号码后四位

        // 改版
        start_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 00:00:00',
        end_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 23:59:59',

        // goods_price: 0,
        total_recharge: 0,
        total_handsel: 0,
        total_recharge_number: 0,
        // refund_fee: 0,

        // 新增搜索用户
        searchString: "",
    },
    methods: {
        searchUser() {
            const url = api.getUserBySearch, async = true
            let self = this, data = {
                searchString: this.searchString
            }
            server(url, data, async, "post", function (res) {
                if (res.user.length) {
                    res.user = res.user.map(function (eData) {
                        eData.register_time = formatTime(new Date(eData.register_time))
                        eData.get_phone_time = eData.get_phone_time ? formatTime(new Date(eData.get_phone_time)) : eData.get_phone_time
                        if (eData.get_phone_time) {
                            eData.history.forEach(m => {
                                m.create_time = formatTime(new Date(m.create_time))
                                self.total_recharge += m.increment_balance
                                self.total_handsel += m.handsel_balance
                                self.total_recharge_number++
                            })
                        }
                        return eData
                    })
                    self.userList = res.user
                    self.pageList = [1]
                    // 分页栏
                    // for (let i = 0; i < res.number / 20; i++) {
                    //     userVM.pageList.push(i + 1)
                    // }
                } else {
                    self.total_recharge = 0
                    self.total_handsel = 0
                    self.total_recharge_number = 0
                }

                self.total_recharge = Math.round(self.total_recharge * 100) / 100
                self.total_handsel = Math.round(self.total_handsel * 100) / 100
            })
        },
        changePage: function (e, id) {
            var href = './' + e + '.html'
            $("#container").load(href);

            sessionStorage.setItem("href", href);
            sessionStorage.setItem("orderId", id);
        },
        getPage: function (index) {
            this.last_id = index
            getUser()
        },
        changeNav: function (index) {
            this.navId = index - 1
            this.last_id = 0
            getUser()
        },
        // updateOrderState: function (order_id, state) {
        //     const url = '../api/update_orderState'
        //     let data = {}
        //     data.order_id = order_id
        //     data.state = state
        //     server(url, data, "post", function (res) {
        //         // console.info(res)
        //         if (res == "更新订单成功") {
        //             getUser()
        //         }
        //     })
        // },
        // getLogistics: function (order_id, tel) {
        //     $('#myModal').on('show.bs.modal', function () {
        //         var modal = $(this)
        //         modal.find('.modal-title').text('请填写快递运输单号')
        //     })
        //     this.logistics_order_id = order_id
        //     this.logistics_tel = tel
        // },
        // submitLogisticsCode: function () {
        //     if (!this.logistics_type) {
        //         alert("请选择快递类型")
        //         return
        //     }
        //     if (!this.logistics_code) {
        //         alert('请填写运输单号')
        //         return
        //     }
        //     const url = '../api/add_logistics_code_to_order'
        //     let data = {}, self = this
        //     data.logistics_order_id = this.logistics_order_id
        //     if (this.logistics_type == "顺丰") {
        //         data.logistics_code = this.logistics_code + ':' + this.logistics_tel.substring(this.logistics_tel.length - 4)
        //     } else {
        //         data.logistics_code = this.logistics_code
        //     }
        //     server(url, data, "post", function (res) {
        //         // console.info(res)
        //         if (res.text == "添加运输单号成功") {
        //             $('#myModal').modal('hide')
        //             self.updateOrderState(self.logistics_order_id, 2)
        //         }
        //     })
        // }
    }
})

// laydate.render({
//     elem: '#test5_1'
//     , type: 'datetime'
//     , calendar: true
// });
//
// laydate.render({
//     elem: '#test5_2'
//     , type: 'datetime'
//     , calendar: true
// });
laydate.render({
    elem: '#test5_1'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: userVM.start_time
    , done: function (value, date) {
        userVM.start_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});

laydate.render({
    elem: '#test5_2'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: userVM.end_time
    , done: function (value, date) {
        userVM.end_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});


$(document).ready(function () {
    getUser()
})

function getUser() {
    userVM.total_recharge = 0
    userVM.total_handsel = 0
    userVM.total_recharge_number = 0
    userVM.pageList = []
    userVM.userList = []
    const url = api.getUser, async = true
    let data = {}
    data.trade_platform = userVM.navId + 1
    data.last_id = userVM.last_id
    data.start_time = document.getElementById("test5_1").value || userVM.start_time
    data.end_time = document.getElementById("test5_2").value || userVM.end_time
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.number > 0) {
            res.user = res.user.map(function (eData) {
                eData.register_time = formatTime(new Date(eData.register_time))
                eData.get_phone_time = eData.get_phone_time ? formatTime(new Date(eData.get_phone_time)) : eData.get_phone_time
                if (eData.get_phone_time) {
                    eData.history.forEach(m => {
                        m.create_time = formatTime(new Date(m.create_time))
                        userVM.total_recharge += m.increment_balance
                        userVM.total_handsel += m.handsel_balance
                        userVM.total_recharge_number++
                    })
                }
                return eData
            })
            userVM.userList = res.user
            // 分页栏
            for (let i = 0; i < res.number / 20; i++) {
                userVM.pageList.push(i + 1)
            }
        } else {
            userVM.total_recharge = 0
            userVM.total_handsel = 0
            userVM.total_recharge_number = 0
        }

        userVM.total_recharge = Math.round(userVM.total_recharge * 100) / 100
        userVM.total_handsel = Math.round(userVM.total_handsel * 100) / 100
    })
}

// function getUserBySearch() {
//     let start_time = userVM.start_time,
//         end_time = userVM.end_time
//     if (userVM.id_or_name.length <= 0 && !start_time && !end_time && userVM.user_id.length <= 0) {
//         alert('请至少填写一项筛选条件！')
//         return
//     }
//     if (start_time && !end_time) {
//         alert('请选择截止时间')
//         return
//     }
//     if (!start_time && end_time) {
//         alert('请选择起始时间')
//         return
//     }
//     if (new Date(start_time) > new Date(end_time)) {
//         alert('起始时间不得大于截止时间')
//         return
//     }
//     // console.info(start_time)
//     // console.info(end_time)
//     userVM.pageList = []
//     userVM.userList = []
//     userVM.navId = -1
//     const url = api.getUserBySearch, async = true
//     let data = {}
//     // data.last_id = userVM.last_id
//     data.select = (userVM.select_1 == '商品ID' ? 0 : 1)
//     data.id_or_name = userVM.id_or_name
//     data.start_time = start_time
//     data.end_time = end_time
//     data.user_id = userVM.user_id
//
//     server(url, data, async, "post", function (res) {
//         console.info(res)
//         // if (res.list.length > 0) {
//         //     res.list = res.list.map(function (eData) {
//         //         eData.create_time = formatTime(new Date(eData.create_time))
//         //         eData.total_price = Number(eData.price * eData.number).toFixed(2)
//         //         eData.price = Number(eData.price).toFixed(2)
//         //         return eData
//         //     })
//         //     userVM.userList = res.list
//         // }
//         if (res.number) {
//             res.user = res.user.map(function (eData) {
//                 eData.create_time = formatTime(new Date(eData.create_time))
//                 // eData.total_price = Number(eData.price * eData.number).toFixed(2)
//                 // eData.price = Number(eData.price).toFixed(2)
//                 return eData
//             })
//             userVM.userList = res.user
//         }
//         // console.info(res.list)
//     })
// }