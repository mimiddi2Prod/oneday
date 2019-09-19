var addBrunchBannerVM = new Vue({
    el: '#addBrunchBanner',
    data: {
        imageList: [],
        sort: '',
        category: [],
        goodsList: [],
        category_id_select: '',
        goods_id: '',
    },
    methods: {
        getImg: function (id) {
            let imgUploadList = []
            const self = this, type = 'brunchBanner_'
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
        haveCategory: function (id) {
            let category_id = id
            this.goods_id = ''
            getGoodsByCategory(category_id)
        },
        addReco: function (status) {
            if (this.imageList.length <= 0) {
                alert('请添加广告图片')
                return
            }
            if (this.sort == '') {
                alert('请填写排序')
                return
            }
            if (!this.goods_id) {
                alert('请选择商品类目')
                return
            }
            // 全部验证完毕 开始上传图片 有图片的地方分别是 1.imgList 2.SortItem>size>img 3.goodsInfoImgList
            if (this.imageList.length > 0) {
                let self = this, flag = 0
                for (let i in this.imageList) {
                    uploadImg(this.imageList[i].key, this.imageList[i].uploadToken, this.imageList[i].imgFile, function (res) {
                        // flag 图片上传完毕之后才提交
                        flag++
                        if (flag == self.imageList.length) {
                            // console.info('上传完毕')
                            addAdvertisement(status)
                            // imgUploadIsOkNum = imgUploadIsOkNum + 1
                        }
                    })
                }
            }
        }
    }
})

function addAdvertisement(status) {
    const url = api.addBrunchBanner, async = true
    let data = {}
    data.status = status
    // data.type = addBrunchBannerVM.ad_type
    // data.text = addBrunchBannerVM.desc
    data.sort = addBrunchBannerVM.sort
    data.user_id = sessionStorage.getItem('user_id')
    data.imgList = []
    for (let i in addBrunchBannerVM.imageList) {
        data.imgList.push(addBrunchBannerVM.imageList[i].key)
    }
    data.category_id = addBrunchBannerVM.category_id_select
    data.goods_id = addBrunchBannerVM.goods_id
    data.name = addBrunchBannerVM.goodsList.filter(function (eData) {
        return eData.id == data.goods_id
    })[0].name
    server(url, data, async, "post", function (res) {
        if (res.code == 0) {
            alert('添加成功')
            location.reload()
        }
    })
}

$(document).ready(function () {
    getBrunchCategory()
})

function getBrunchCategory() {
    const url = api.getBrunchCategory, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res && res.restaurantCategory.length > 0) {
            addBrunchBannerVM.category = res.restaurantCategory
        }
    })
}

function getGoodsByCategory(category_id) {
    const url = api.getGoodsByBrunchCategory, async = true
    let data = {}
    data.category_id = category_id
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res && res.restaurantGoods.length > 0) {
            addBrunchBannerVM.goodsList = res.restaurantGoods
        }

    })
}