var categoryVM = new Vue({
    el: "#category",
    data: {
        categoryList: [],
        submitName: '',
        submitSort: '',
        edit_id: 0,
        // 前方是地狱


        last_id: 0,
        pageList: [],
        sortList: [],
        index: '',
        sortModalText: '',
        sortModalSort: '',
        // 大分类才有
        sortModalDesc: '',
        // 小分类才有
        sortModalImg: [],
        sortModalUrl: '',

        modalType: 0,  //0 添加分类 1删除分类
        delCategoryId: '',
        delCategoryParentId: '',

    },
    methods: {
        addCategoryModal: function () {
            this.edit_id = 0
            this.submitName = ''
            this.submitSort = ''
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('添加分类')
            })
        },
        // 编辑类别
        editCategoryModal: function (category_id, category_name, category_sort) {
            this.edit_id = category_id
            this.submitName = category_name
            this.submitSort = category_sort
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('编辑分类')
            })
        },
        submitCategory: function () {
            if (this.modalType == 0) {
                // 添加分类
                // let type = 0, parent_id = 0
                if (this.submitName == '') {
                    alert('请填写分类名称')
                    return
                }
                if (this.submitSort == '') {
                    alert('请填写分类排序')
                    return
                }
                if (this.edit_id == 0) {
                    addCategory()
                } else {
                    editCategory()
                }
                // let self = this, flag = 0
                // for (let i in this.sortModalImg) {
                //     uploadImg(this.sortModalImg[i].key, this.sortModalImg[i].uploadToken, this.sortModalImg[i].imgFile, function (res) {
                //         // flag 图片上传完毕之后才提交
                //         flag++
                //         if (flag == self.sortModalImg.length) {
                //             // console.info('上传完毕')
                //             addCategory(type, parent_id)
                //         }
                //     })
                // }
            }
        },
    }
})

$(document).ready(function () {
    getCategory()
})

function getCategory() {
    const url = api.getCategory, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.length > 0) {
            categoryVM.categoryList = res.map(function (eData) {
                eData.create_time = formatTime(new Date(eData.create_time))
                return eData
            })
        }
    })
}

function addCategory() {
    const url = api.addCategory, async = true
    let data = {}
    data.name = categoryVM.submitName
    data.sort = categoryVM.submitSort
    data.location_code = 'xmspw'
    // data.user_id = sessionStorage.getItem('user_id')
    data.user_id = 0
    server(url, data, async, "post", function (res) {
        if (res.code == 0) {
            $('#myModal').modal('hide')
            getCategory()
        }
    })
}

function editCategory() {
    const url = api.updateCategory, async = true
    let data = {}
    data.id = categoryVM.edit_id
    data.name = categoryVM.submitName
    data.sort = categoryVM.submitSort
    data.location_code = 'xmspw'
    // data.user_id = sessionStorage.getItem('user_id')
    data.user_id = 0
    server(url, data, async, "post", function (res) {
        if (res.code == 0) {
            $('#myModal').modal('hide')
            getCategory()
        }
    })
}

function delCategory(parent_id, id) {
    const url = '../api/del_category'
    let data = {}
    data.parent_id = parent_id
    data.id = id
    server(url, data, "post", function (res) {
        if (res.text == '删除成功') {
            getCategory()
        }
    })
}
