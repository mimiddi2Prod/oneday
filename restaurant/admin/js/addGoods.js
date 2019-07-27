var addGoodsVM = new Vue({
    el: '#addGoods',
    data: {
        // 商品图片
        imgList: [],
        // 商品名
        goods_title: '',
        // 商品补充说明
        goods_desc: '',
        // 商品所有类型加载
        category: [],
        // 选中的类型id
        select_category_id: '',
        priceTypeList: [{
            id: 0,
            name: '否'
        }, {
            id: 1,
            name: '是'
        }],
        priceTypeId: 0,
        goods_price: '',

        // 类别 option使用
        classList: ['糖度', '冰度'],
        // 商品型号 选中的 类型 和 参数
        classSubmitList: [],
        // key - value - price - stock
        table: [],
        // 弹窗时要筛选出对应的param 到 tempParamModal 以供选择
        paramList: [{
            name: '糖度',
            param: ['半糖', '多糖', '单糖']
        }, {
            name: '冰度',
            param: ['0度', '50度', '100度']
        }],
        // 弹窗时获取当前的参数 临时使用
        tempParamModal: {},
        // 类别 和 参数 弹窗填写的字段
        classModalText: '',
        paramModalText: '',
        // 标记是往哪个class里面加param
        seleceClassIndex: '',

        // 最后提交时 商品的状态 0下架 / 1上架
        goodsStatus: '',
    },
    methods: {
        // -----> 商品图片存储七牛云前的处理
        getImg: function (id) {
            let imgUploadList = []
            const self = this, type = 'goods_'
            // 图片blob 用于上传
            let imgFiles = document.getElementById(id).files  //多张图上传
            // 多张图上传
            for (let i = 0; i < imgFiles.length; i++) {
                imgUploadList.push({
                    key: '',
                    tempFilePath: window.URL.createObjectURL(imgFiles[i]),
                    uploadToken: '',
                    imgFile: imgFiles[i]
                })
            }
            qiniuUpload(imgUploadList, type, function (res) {
                self.imgList = self.imgList.concat(res)
            })
        },
        delImg: function (index) {
            this.imgList.splice(index, 1)
        },
        replaceImg: function (index) {
            let imgUploadList = []
            const self = this, type = 'goods_'
            let imgId = 'replaceImg' + index
            // 图片blob 用于上传
            let imgFile = document.getElementById(imgId).files[0]
            if (imgFile) {
                imgUploadList[0] = {
                    key: '',
                    tempFilePath: window.URL.createObjectURL(imgFile),
                    uploadToken: '',
                    imgFile: imgFile
                }
                qiniuUpload(imgUploadList, type, function (res) {
                    self.imgList.splice(index, 1, res[0])
                    // console.info(self.imgList)
                })
            }
        },
        // <----- 商品图片存储七牛云前的处理


        // 弹窗 添加分类
        showClassModal: function () {
            var text = '添加分类'
            $('#classModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('#classModalLabel').text(text)
            })
        },
        addClass: function () {
            // 添加分类数组
            let self = this
            if (this.classModalText != '') {
                let haveSameClass = this.classList.some(function (eData) {
                    return self.classModalText == eData
                })
                if (!haveSameClass) {
                    this.classList.push(this.classModalText)
                    this.paramList.push({
                        name: this.classModalText,
                        param: []
                    })
                    $('#classModal').modal('hide')
                } else {
                    alert('你添加了相同的分类了！')
                }
            } else {
                alert('输入不能为空！')
            }
        },

        // -----> class option的选择创建
        createClassList: function () {
            this.classSubmitList.push({
                select: '',
                // haveParamImg: false,
                param: [],
            })
            // console.info(this.classSubmitList)
        },
        delClassItem: function (index) {
            this.classSubmitList.splice(index, 1)
            for (let i in this.classSubmitList) {
                let classId = 'classId' + i
                document.getElementById(classId).value = this.classSubmitList[i].select
            }

            this.getTable()
        },
        // class获取选择的option
        selectClass: function (index) {
            let classId = 'classId' + index
            let classValue = document.getElementById(classId).value
            for (let i in this.classSubmitList) {
                // 不能选择相同类型的 选择了就警告 并且选项置空
                if (this.classSubmitList[i].select == classValue) {
                    document.getElementById(classId).value = ''
                    classValue = ''
                    this.classSubmitList[index].param = []
                    // 警告框展示隐藏
                    var alertId = '#alert' + index
                    $(alertId).addClass('inline-block')
                    setTimeout(function () {
                        $(alertId).addClass('none')
                        $(alertId).removeClass('inline-block')
                    }, 2000)
                }
            }
            this.classSubmitList[index].select = classValue
            this.classSubmitList[index].param = []
        },
        // <----- class option的创建选择

        // -----> param 的创建选择
        showParamModal: function (selectText, selectIndex) {
            let self = this
            this.seleceClassIndex = selectIndex
            this.tempParamModal = this.paramList.filter(function (eData) {
                return eData.name == selectText
            })[0]
            this.tempParamModal.param = this.tempParamModal.param.filter(function (eData) {
                // return (self.classSubmitList[self.seleceClassIndex].param.indexOf(eData) == -1)
                // let i = self.classSubmitList.every(function (eData2) {
                //     return (eData2.param == eData)
                // })
                // console.info(i)
                // 记得修改 ----- 
                return (!self.classSubmitList.every(function (eData2) {
                    return (eData2.param == eData)
                }))
            })
            console.info(this.tempParamModal)
        },
        createParamToParamList: function () {
            let self = this
            if (self.paramModalText != '') {
                let haveSameParam = this.tempParamModal.param.some(function (eData) {
                    return self.paramModalText == eData
                })
                if (!haveSameParam) {
                    this.tempParamModal.param.push(self.paramModalText)
                    for (let i in this.paramList) {
                        if (this.paramList[i].name == this.tempParamModal.name) {
                            this.paramList[i].param = this.tempParamModal.param
                        }
                    }
                    // $('#classModal').modal('hide')
                } else {
                    alert('你添加了相同的参数了！')
                }
            } else {
                alert('输入不能为空！')
            }
        },
        // <----- param 的创建选择

        // 添加参数的Modal
        addParam: function () {
            var check = document.getElementsByName('sizeCheckbox')
            let selectParamList = []
            for (let i in check) {
                if (check[i].checked) {
                    selectParamList.push(this.tempParamModal.param[i])
                    check[i].checked = false
                }
            }
            this.classSubmitList[this.seleceClassIndex].param = this.classSubmitList[this.seleceClassIndex].param.concat(selectParamList)
            $('#paramModal').modal('hide')
            // console.info(this.classSubmitList)

            this.getTable()
        },
        delParam: function (index, param) {
            this.classSubmitList[index].param = this.classSubmitList[index].param.filter(function (eData) {
                return (param != eData)
            })
            this.getTable()
        },

        getTable: function () {
            let tempList = this.classSubmitList.filter(function (eData) {
                return eData.param.length > 0
            })
            let len = tempList.length
            if (len > 0) {
                let y = []
                for (let i = 0; i < len; i++) {
                    y.push(tempList[i].param)
                }
                var models = y
                let paramGroup = digui(models)
                let temp = {}
                this.table = []
                for (let i in paramGroup) {
                    let arr = paramGroup[i].split(',')
                    // temp.push({})
                    for (let j in arr) {
                        // console.info(j)
                        let key = tempList[j].select
                        let value = arr[j]
                        temp[key] = value
                    }
                    this.table.push({
                        param: JSON.stringify(temp),
                        stock: '',
                        price: '',
                    })
                }
                // console.info(this.table)
            }
        },

        // 商品提交
        submitGoods: function (status) {
            this.goodsStatus = status
            if (this.imgList.length <= 0) {
                alert('请选择商品图片')
                return
            }
            if (this.goods_title == '') {
                alert('请填写商品标题')
                return
            }
            if (this.goods_desc == '') {
                alert('请填写商品标题')
                return
            }
            if (this.select_category_id == '') {
                alert('请选择商品类目')
                return
            }
            let price = ''
            if (this.priceTypeId == 0) {
                if (this.goods_price == '') {
                    alert('请填写商品价格')
                    return
                } else {
                    price = this.goods_price
                }
            } else if (this.priceTypeId == 1) {
                if (this.table.length <= 0) {
                    alert('请填写型号分类')
                    return
                } else {
                    let havePriceAndStock = this.table.every(function (eData) {
                        return eData.price != '' && eData.stock != ''
                    })
                    if (!havePriceAndStock) {
                        alert('请填写好型号和价格')
                    } else {
                        let self = this
                        price = function () {
                            var min = self.table[0].price;
                            var len = self.table.length;
                            for (let i = 1; i < len; i++) {
                                if (Number(self.table[i].price) < Number(min)) {
                                    min = self.table[i].price;
                                }
                            }
                            return min;
                        }()
                    }
                }
            }
            return
            if (this.length <= 0) {
                alert('请选择商品型号')
                return
            } else if (this.SortItem.length == 1) {
                alert('请选择商品型号第二个参数')
                return
            }
            for (let i in this.SortItem) {
                if (this.SortItem[i].size.length <= 0) {
                    let text = '请添加第' + (i == 0 ? '一' : '二') + '个规格的参数'
                    alert(text)
                    return
                }
            }
            let haveParamImg = this.SortItem.some(function (res) {
                if (res.haveParamImg) {
                    return true
                }
                return false
            })
            if (!haveParamImg) {
                alert('请选择商品型号图片')
                return
            }
            for (let i in this.SortItem) {
                if (this.SortItem[i].haveParamImg) {
                    haveParamImg = this.SortItem[i].size.every(function (res) {
                        if (res.img.length == '') {
                            return false
                        }
                        return true
                    })
                    if (!haveParamImg) {
                        alert('请给选中的商品型号添加完图片')
                        return
                    }
                }
            }
            let havePriceAndStock = this.sizeAndPrice.every(function (res) {
                if (res.price == '' || res.stock == '') {
                    return false
                }
                return true
            })
            if (!havePriceAndStock) {
                alert('请补充完价格库存量')
                return
            }
            if (this.goodsInfoImgList.length <= 0) {
                alert('请选择商品详情图片')
                return
            }

            // 开始上传 需要loading 图标 防误触

            let imgUploadIsOkNum = 0
            // 全部验证完毕 开始上传图片 有图片的地方分别是 1.imgList 2.SortItem>size>img 3.goodsInfoImgList
            if (this.imgList.length > 0) {
                let self = this, flag = 0
                for (let i in this.imgList) {
                    uploadImg(this.imgList[i].key, this.imgList[i].uploadToken, this.imgList[i].imgFile, function (res) {
                        // flag 图片上传完毕之后才提交
                        flag++
                        if (flag == self.imgList.length) {
                            // console.info('上传完毕')
                            imgUploadIsOkNum = imgUploadIsOkNum + 1
                        }
                    })
                }
            }
            for (let i in this.SortItem) {
                if (this.SortItem[i].haveParamImg) {
                    let self = this, flag = 0
                    for (let j in this.SortItem[i].size) {
                        uploadImg(this.SortItem[i].size[j].img[0].key, this.SortItem[i].size[j].img[0].uploadToken, this.SortItem[i].size[j].img[0].imgFile, function (res) {
                            // flag 图片上传完毕之后才提交
                            flag++
                            if (flag == self.SortItem[i].size.length) {
                                // console.info('上传完毕')
                                imgUploadIsOkNum = imgUploadIsOkNum + 1
                            }
                        })
                    }
                }
            }
            if (this.goodsInfoImgList.length > 0) {
                let self = this, flag = 0
                for (let i in this.goodsInfoImgList) {
                    uploadImg(this.goodsInfoImgList[i].key, this.goodsInfoImgList[i].uploadToken, this.goodsInfoImgList[i].imgFile, function (res) {
                        // flag 图片上传完毕之后才提交
                        flag++
                        if (flag == self.goodsInfoImgList.length) {
                            // console.info('上传完毕')
                            imgUploadIsOkNum = imgUploadIsOkNum + 1
                        }
                    })
                }
            }

            let scroll = setInterval(function () {
                if (imgUploadIsOkNum == 3) {
                    addGoods()
                    clearInterval(scroll)
                }
            }, 500)
        }
    }
})

$(document).ready(function () {
    // check_login()
    getCategory()
})

// 批量分类
function getCategory() {
    const url = api.getCategory
    let data = {}, async = true
    server(url, data, async, "post", function (res) {
        // console.info(res)
        addGoodsVM.category = res
    })
}

function addGoods() {
    // console.info(addGoodsVM.imgList)
    // console.info(addGoodsVM.goods_title)
    // console.info(addGoodsVM.goods_brand_id)
    // console.info(addGoodsVM.qcl_id)
    // console.info(addGoodsVM.category_parent_id_select)
    // console.info(addGoodsVM.category_id_select)
    // console.info(addGoodsVM.SortItem)
    // console.info(addGoodsVM.sizeAndPrice)
    // console.info(addGoodsVM.goodsInfoImgList)
    // console.info(addGoodsVM.state)

    const url = '../api/add_goods'
    let data = {}
    data.user_id = sessionStorage.getItem('user_id')
    data.imgList = addGoodsVM.imgList.map(function (res) {
        return res.key
    })
    data.goods_title = addGoodsVM.goods_title
    data.goods_desc = addGoodsVM.goods_desc
    data.goods_brand_id = addGoodsVM.goods_brand_id
    data.qcl_id = addGoodsVM.qcl_id
    if (addGoodsVM.integralSelect == 0) {
        data.type = addGoodsVM.typeValue
        data.integralValue = 0
    } else {
        data.type = 2
        data.integralValue = addGoodsVM.integralValue
    }
    // data.category_parent_id_select = addGoodsVM.category_parent_id_select
    data.category_id_select = addGoodsVM.category_id_select
    data.paramItem = addGoodsVM.SortItem
    for (let i in data.paramItem) {
        if (data.paramItem[i].haveParamImg) {
            for (let j in data.paramItem[i].size) {
                let tempImg = data.paramItem[i].size[j].img[0].key
                data.paramItem[i].size[j].img[0] = ''
                data.paramItem[i].size[j].img[0] = tempImg
            }
        }
    }
    data.paramAndPrice = addGoodsVM.sizeAndPrice
    data.price = data.paramAndPrice.sort(function (a, b) {
        return Number(a.price - b.price)
    })
    data.price = data.price[0].price
    data.goodsInfoImgList = addGoodsVM.goodsInfoImgList.map(function (res) {
        return res.key
    })
    data.state = addGoodsVM.state

    server(url, data, "post", function (res) {
        // console.info(res)
        if (res.text == '添加成功') {
            alert('添加成功')
            location.reload()
        }
    })

}

// 时间控件
// laydate.render({
//     elem: '#test5'
//     , type: 'datetime'
//     , calendar: true
// });

function digui(models) {
    // var models = [['BMW X1', 'BMW X3', 'BMW X5', 'BMW X6'], ['RED', 'BLUE', 'GREEN'], ['低配', '中配', '高配'], ['进口', '国产']];
    var mLen = models.length;
    var index = 0;

    var digui = function (arr1, arr2) {
        // console.log("enter digui",arr1,arr2);
        var res = [];
        arr1.forEach(function (m) {
            arr2.forEach(function (n) {
                res.push(m + "," + n);
            })
        });
        index++;
        if (index <= mLen - 1) {
            return digui(res, models[index])
        } else {
            return res;
        }
    };
    var resultArr = [];
    if (mLen >= 2) {
        resultArr = digui(models[index], models[++index]);
    } else {
        resultArr = models[0];
    }
    console.log(resultArr);
    return resultArr
}