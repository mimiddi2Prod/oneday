var addRecommendVM = new Vue({
    el: '#addRecommend',
    data: {
        adTypeList: [{
            id: 0,
            name: '弹窗型'
        }, {
            id: 1,
            name: '轮播型'
        }],
        ad_type: '',
        imageList: [],
        desc: '',
        sort: '',

        category_parent: [],
        category: [],
        goodsList: [],
        category_parent_id_select: '',
        category_id_select: '',
        goods_id: '',
    },
    methods: {
        // changePage: function (e) {
        //     var href = './' + e + '.html'
        //     $("#container").load(href);
        //     sessionStorage.setItem("href", href);
        // },
        getImg: function (id) {
            let imgUploadList = []
            const self = this, type = 'ad_'
            // 图片blob 用于上传
            // let imgFiles = document.getElementById(id).files  //多张图上传
            // 多张图上传
            // for (let i = 0; i < imgFiles.length; i++) {
            //     imgUploadList.push({
            //         key: '',
            //         tempFilePath: window.URL.createObjectURL(imgFiles[i]),
            //         uploadToken: '',
            //         imgFile: imgFiles[i]
            //     })
            // }
            // qiniuUpload(imgUploadList, type, function (res) {
            //     self.sortModalImg = self.sortModalImg.concat(res)
            // })
            //单张图上传
            let imgFile = document.getElementById(id).files[0]
            imgUploadList[0] = {
                key: '',
                tempFilePath: window.URL.createObjectURL(imgFile),
                uploadToken: '',
                imgFile: imgFile
            }
            qiniuUpload(imgUploadList, type, function (res) {
                self.imageList = res
            })
        },
        delImg: function (index) {
            this.imageList.splice(index, 1)
        },
        haveCategoryParent: function (id) {
            let type = 1, parent_id = id
            this.category_id_select = ''
            getCategory(type, parent_id)
        },
        haveCategory: function (id) {
            let category_id_1 = id
            this.goods_id = ''
            getGoodsByCategory(category_id_1)
        },
        addReco: function (state) {
            // console.info(state)
            // console.info(this.ad_type)
            if (this.ad_type.length <= 0) {
                alert('请选择广告类型')
                return
            }
            if (this.imageList.length <= 0) {
                alert('请添加广告图片')
                return
            }
            if (this.desc == '') {
                alert('请填写广告描述')
                return
            }
            if (this.sort == '') {
                alert('请填写排序')
                return
            }
            // let imgUploadIsOkNum = 0
            // 全部验证完毕 开始上传图片 有图片的地方分别是 1.imgList 2.SortItem>size>img 3.goodsInfoImgList
            if (this.imageList.length > 0) {
                let self = this, flag = 0
                for (let i in this.imageList) {
                    uploadImg(this.imageList[i].key, this.imageList[i].uploadToken, this.imageList[i].imgFile, function (res) {
                        // flag 图片上传完毕之后才提交
                        flag++
                        if (flag == self.imageList.length) {
                            // console.info('上传完毕')
                            addAdvertisement(state)
                            // imgUploadIsOkNum = imgUploadIsOkNum + 1
                        }
                    })
                }
            }
        }
    }
})

function addAdvertisement(state) {
    const url = api.addAd, async = true
    let data = {}
    data.state = state
    data.type = addRecommendVM.ad_type
    data.text = addRecommendVM.desc
    data.sort = addRecommendVM.sort
    data.user_id = sessionStorage.getItem('user_id')
    data.imgList = []
    for (let i in addRecommendVM.imageList) {
        data.imgList.push(addRecommendVM.imageList[i].key)
    }
    data.url = '../goods/goods?id=' + addRecommendVM.goods_id
    server(url, data, async, "post", function (res) {
        if (res.text == '添加成功') {
            alert('添加成功')
            location.reload()
        }
    })
}

$(document).ready(function () {
    getCategory(0, 0)
})

function getCategory(type, parent_id) {
    const url = api.getCategory, async = true
    let data = {}
    data.type = type
    data.parent_id = parent_id
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.length > 0) {
            if (type == 0) {
                addRecommendVM.category_parent = res
            } else if (type == 1) {
                addRecommendVM.category = res
            }
        }
    })
}

function getGoodsByCategory(category_id_1) {
    const url = api.getGoodsByCategory, async = true
    let data = {}
    data.category_id_1 = category_id_1
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.length > 0) {
            addRecommendVM.goodsList = res
        }

    })
}

// laydate.render({
//   elem: '#test5'
//   ,type: 'datetime'
// });