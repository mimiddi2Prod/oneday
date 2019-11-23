var couponVM = new Vue({
    el: '#coupon',
    data: {
        couponList: [],
        card_id:'',
        // id:'',
        // name: '',
        // location: '',
        // phone: '',
        // start_time: '',
        // end_time: '',
        type: 0,
        // last_id: 0,

        // pageList: [], // 分页栏
    },
    methods: {
        // getPage: function (index) {
        //     this.last_id = index
        //     getUser()
        // },
        toAddCoupon: function () {
            this.type = 0
            // this.name = ''
            // this.location = ''
            // this.phone = ''
            // this.start_time = ''
            // this.end_time = ''
            this.card_id = ""
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('添加卡券')
            })
        },
        toUpdateCoupon: function (id) {
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('修改店信息')
            })
            this.type = 1
            // for (let i in this.couponList) {
            //     if (this.couponList[i].id == id) {
            //         this.id = this.couponList[i].id
            //         this.name = this.couponList[i].name
            //         this.location = this.couponList[i].location
            //         this.phone = this.couponList[i].phone
            //         this.start_time = this.couponList[i].start_time
            //         this.end_time = this.couponList[i].end_time
            //         break
            //     }
            // }
        },
        toDelCoupon: function (id) {
            delCoupon(id)
        },
        submitCoupon: function () {
            if (this.card_id == "") {
                alert("请填写点名")
                return
            }
            // if (this.location == "") {
            //     alert("请填写坐标")
            //     return
            // }
            // if (this.phone == "") {
            //     alert("请填写客服电话")
            //     return
            // }
            // this.start_time = document.getElementById('test5_1').value
            // this.end_time = document.getElementById('test5_2').value
            // if (this.start_time == "") {
            //     alert("请选择营业开始时间")
            //     return
            // }
            // if (this.end_time == "") {
            //     alert("请选择营业结束时间")
            //     return
            // }
            // if (this.start_time > this.end_time) {
            //     alert("营业开始时间不得大于结束时间")
            //     return
            // }
            if (this.type == 0) addCoupon(); else updateCoupon()
        }
    }
})

$(document).ready(function () {
    // getCoupon()
})

function getCoupon() {
    const url = api.getCoupon, async = true
    let data = {}
    // data.last_id = couponVM.last_id
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.length > 0) {
            res = res.map((eData) => {
                eData.create_time = formatTime(new Date(eData.create_time))
                return eData
            })
            couponVM.couponList = res
        }

    })
}

function addCoupon() {
    const url = api.addCoupon, async = true
    let data = {}
    data.card_id = couponVM.card_id
    // data.location = couponVM.location
    // data.phone = couponVM.phone
    // data.start_time = couponVM.start_time
    // data.end_time = couponVM.end_time
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.code) {
            window.location.reload()
        }
    })
}

function updateCoupon() {
    const url = api.updateCoupon, async = true
    let data = {}
    data.id = couponVM.id
    data.name = couponVM.name
    data.location = couponVM.location
    data.phone = couponVM.phone
    data.start_time = couponVM.start_time
    data.end_time = couponVM.end_time
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.code) {
            window.location.reload()
        }
    })
}

function delCoupon(id) {
    const url = api.delCoupon, async = true
    let data = {}
    data.id = id
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.code) {
            window.location.reload()
        }
    })
}

laydate.render({
    elem: '#test5_1'
    , type: 'time'
    , calendar: true
});

laydate.render({
    elem: '#test5_2'
    , type: 'time'
    , calendar: true
});
