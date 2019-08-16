var editAccountVM = new Vue({
    el: '#editAccount',
    data: {
        login_name: '',
        nick_name: '',
        password: '',
        check_password: '',

        positionList: [],
        position_id: '',

        select_position_detail: {},
    },
    methods: {
        changePage: function (e) {
            var href = './' + e + '.html'
            $("#container").load(href);
            sessionStorage.setItem("href", href);
        },

        // 商品提交
        submitAccount: function (state) {
            // state 0 保存 1保存并继续添加
            if (this.login_name == '') {
                alert('请填写登录名')
                return
            }
            if (this.nick_name == '') {
                alert('请填写子账号昵称')
                return
            }
            if (this.password == '') {
                alert('请填写密码')
                return
            }
            if (this.check_password == '') {
                alert('请填写确认密码')
                return
            }
            if (this.password != this.check_password) {
                alert('确认密码错误')
                return
            }
            if (this.position_id == '') {
                alert('请选择岗位与权限')
                return
            }
            addAccount(state)
        }
    },
    watch: {
        position_id: function (val) {
            if (val) {
                this.select_position_detail = this.positionList.filter(function (res) {
                    return res.id == val
                })[0]
            }
        }
    }
})

$(document).ready(function () {
    let list = JSON.parse(sessionStorage.getItem("editAccountList"));
    console.info(list)
    getPosition()
})

function getPosition() {
    const url = api.getPosition, async = true
    let data = {}
    data.last_id = -1
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.positionDetailList) {
            editAccountVM.positionList = res.positionDetailList
        }
    })
}

function addAccount(state) {
    // state 0 保存 1保存并继续添加
    const url = api.addAccount, async = true
    let data = {}
    data.login_name = editAccountVM.login_name
    data.nick_name = editAccountVM.nick_name
    data.password = editAccountVM.password
    data.position_id = editAccountVM.position_id
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.text == '添加成功') {
            alert('添加成功')
            if (state == 1) {
                location.reload()
            } else {
                editAccountVM.changePage('account')
            }
        }
    })
}