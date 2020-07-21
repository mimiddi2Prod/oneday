var accountVM = new Vue({
    el: "#account",
    data: {
        account_list: [],
        // choose_id: "",

        submitName: "",
        submitPass: "",
    },
    methods: {
        addAccountModal: function () {
            // this.choose_id = 0
            this.submitName = ''
            this.submitPass = ''
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('添加账号')
            })
        },
        setAccount(id, state) {
            const url = api.setAccount, async = true
            let data = {
                id: id,
                state: state
            }
            server(url, data, async, "post", function (res) {
                if (res.code == 0) {
                    $('#obtained').removeClass('inline-block')
                    getAccount()
                } else {
                    alert(res.errmsg)
                }
            })
        },
        // 编辑类别
        // editCategoryModal: function (category_id, category_name, category_sort) {
        //     this.choose_id = category_id
        //     this.submitName = category_name
        //     this.submitSort = category_sort
        //     $('#myModal').on('show.bs.modal', function () {
        //         var modal = $(this)
        //         modal.find('.modal-title').text('编辑分类')
        //     })
        // },
        // 删除
        showObtainedModal: function (id) {
            this.choose_id = id
            $('#obtained').addClass('inline-block')
        },
        hideObtainedModal: function () {
            $('#obtained').removeClass('inline-block')
        },
        submitObtained: function () {
            // delCategory()
            this.setAccount(this.choose_id, 0)
        },
        submitAccount: function () {
            if (this.submitName == '') {
                alert('请填写账号')
                return
            }
            if (this.submitPass == '') {
                alert('请填写密码')
                return
            }
            addAccount()
            // if (this.choose_id == 0) {
            //     addCategory()
            // } else {
            //     editCategory()
            // }
        },
    },
    mounted() {
        getAccount()
    }
})

function getAccount() {
    const url = api.getAccount, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        accountVM.account_list = res
    })
}

function addAccount() {
    const url = api.setAccount, async = true
    let data = {}
    data.name = accountVM.submitName
    data.pass = accountVM.submitPass
    data.location_code = 'sz'
    data.user_id = sessionStorage.getItem('user_id')
    server(url, data, async, "post", function (res) {
        if (res.code == 0) {
            $('#myModal').modal('hide')
            getAccount()
        } else {
            alert(res.errmsg)
        }
    })
}

// function editCategory() {
//     const url = api.updateCategory, async = true
//     let data = {}
//     data.id = categoryVM.choose_id
//     data.name = categoryVM.submitName
//     data.sort = categoryVM.submitSort
//     data.location_code = 'szsn'
//     // data.user_id = sessionStorage.getItem('user_id')
//     data.user_id = 0
//     server(url, data, async, "post", function (res) {
//         if (res.code == 0) {
//             $('#myModal').modal('hide')
//             getCategory()
//         }
//     })
// }

// function delCategory() {
//     const url = api.setAccount, async = true
//     let data = {}
//     data.id = accountVM.choose_id
//     data.del = true
//     server(url, data, async, "post", function (res) {
//         if (res.code == 0) {
//             $('#obtained').removeClass('inline-block')
//             getAccount()
//         } else {
//             alert(res.errmsg)
//         }
//     })
// }
