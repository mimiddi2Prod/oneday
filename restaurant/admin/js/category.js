var categoryVM = new Vue({
    el: "#category",
    data: {
        categoryList: [],
        submitName: '',
        submitSort: '',
        choose_id: 0,
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
            this.choose_id = 0
            this.submitName = ''
            this.submitSort = ''
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('添加分类')
            })
        },
        // 编辑类别
        editCategoryModal: function (category_id, category_name, category_sort) {
            this.choose_id = category_id
            this.submitName = category_name
            this.submitSort = category_sort
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('编辑分类')
            })
        },
        // 删除
        showObtainedModal: function (category_id) {
            this.choose_id = category_id
            $('#obtained').addClass('inline-block')
        },
        hideObtainedModal: function () {
            $('#obtained').removeClass('inline-block')
        },
        submitObtained: function () {

            delCategory()
        },
        submitCategory: function () {
            // if (this.modalType == 0) {
            // 添加分类
            // let type = 0, parent_id = 0
            console.info(this.submitSort)
            console.info(this.submitName)
            if (this.submitName == '') {
                alert('请填写分类名称')
                return
            }
            if (this.submitSort.length <= 0) {
                alert('请填写分类排序')
                return
            }
            if (this.choose_id == 0) {
                addCategory()
            } else {
                editCategory()
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
    data.id = categoryVM.choose_id
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

function delCategory() {
    const url = api.delCategory, async = true
    let data = {}
    // data.parent_id = parent_id
    data.id = categoryVM.choose_id
    console.info(data.id)
    server(url, data, async, "post", function (res) {
        if (res.code == 0) {
            $('#obtained').removeClass('inline-block')
            getCategory()
        }
    })
}
