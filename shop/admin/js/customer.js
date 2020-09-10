var customerVM = new Vue({
    el: '#customer',
    data: {
        userList: [],
        last_id: 0,

        pageList: [], // 分页栏
    },
    methods: {
        // 跳转添加推荐位需要
        // changePage: function (e, brand_id) {
        //     let temp = this.brandList.filter(function (res) {
        //         return res.id == brand_id
        //     })
        //     sessionStorage.setItem("editBrandList", JSON.stringify(temp));
        //
        //     var href = './' + e + '.html'
        //     $("#container").load(href);
        //     sessionStorage.setItem("href", href);
        // },
        getPage: function (index) {
            this.last_id = index
            getUser()
        },
    }
})

$(document).ready(function () {
    getUser()
})

function getUser() {
    customerVM.pageList = []
    customerVM.userList = []
    const url = api.getUser, async = true
    let data = {}
    data.last_id = customerVM.last_id
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.number > 0) {
            res.userList.map(function (fn) {
                fn.register_time = formatTime(new Date(fn.register_time))
                fn.last_login_time = formatTime(new Date(fn.last_login_time))
                fn.user_name = decodeURIComponent(fn.user_name)
                return fn
            })
            customerVM.userList = res.userList

            // 分页栏
            for (let i = 0; i < res.number / 4; i++) {
                customerVM.pageList.push(i + 1)
            }
        }
    })
}
