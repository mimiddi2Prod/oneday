// pages/my/address.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    // addressList: [{
    //   cityName: "广州市",
    //   countyName: "海珠区",
    //   detailInfo: "新港中路397号",
    //   nationalCode: "510000",
    //   postalCode: "510000",
    //   provinceName: "广东省",
    //   telNumber: "020-81167888",
    //   userName: "张三",
    //   isDefault: true
    // }, {
    //   cityName: "厦门市",
    //   countyName: "集美区",
    //   detailInfo: "金博水岸xxxx",
    //   nationalCode: "510000",
    //   postalCode: "510000",
    //   provinceName: "福建省",
    //   telNumber: "020-81167888",
    //   userName: "张三",
    //   isDefault: false
    // }],
    addressList: [],
    editAddress: {
      cityName: "",
      countyName: "",
      detailInfo: "",
      nationalCode: "",
      postalCode: "",
      provinceName: "",
      telNumber: "",
      userName: "",
    },
    editID: -1, //-1:新建地址 0~n:编辑地址的序号

    region: [],

    toAuthGetAddress: false,
    toSelectAddress: false,
    // 模态框
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    if (options.selectAddress) {
      this.setData({
        toSelectAddress: true
      })
    }

    this.getAddress()
  },

  getAddress: function() {
    var self = this
    server.api(api.getAddress, {
      user_id: app.globalData.user_id
    }, "post").then(function(res) {
      // console.info(res)
      if (res.length > 0) {
        var addressList = []
        for (var i in res) {
          addressList[i] = {
            id: res[i].id,
            cityName: res[i].city,
            countyName: res[i].area,
            detailInfo: res[i].road,
            provinceName: res[i].province,
            telNumber: res[i].tel,
            userName: res[i].receiver,
            isDefault: false
          }
          if (app.globalData.default_address) {
            if (addressList[i].id == app.globalData.default_address.id && app.globalData.default_address.isDefault) {
              addressList[i].isDefault = true
            }
          }else{
            app.globalData.default_address = addressList[0]
          }
        }
        self.setData({
          addressList: addressList
        })

        if (!app.globalData.default_address.isDefault){
          app.globalData.default_address = {}
          app.globalData.default_address.province = self.data.addressList[0].provinceName
          app.globalData.default_address.city = self.data.addressList[0].cityName
          app.globalData.default_address.area = self.data.addressList[0].countyName
          app.globalData.default_address.road = self.data.addressList[0].detailInfo
          app.globalData.default_address.tel = self.data.addressList[0].telNumber
          app.globalData.default_address.receiver = self.data.addressList[0].userName
          app.globalData.default_address.id = self.data.addressList[0].id
          app.globalData.default_address.isDefault = false
        }
      }else{
        app.globalData.default_address = null
        self.setData({
          addressList: []
        })
      }

      // console.info(self.data.addressList)
      // if (self.data.addressList.length > 0) {
      //   app.globalData.default_address = {}
      //   app.globalData.default_address.province = self.data.addressList[0].provinceName
      //   app.globalData.default_address.city = self.data.addressList[0].cityName
      //   app.globalData.default_address.area = self.data.addressList[0].countyName
      //   app.globalData.default_address.road = self.data.addressList[0].detailInfo
      //   app.globalData.default_address.tel = self.data.addressList[0].telNumber
      //   app.globalData.default_address.receiver = self.data.addressList[0].userName
      //   app.globalData.default_address.id = self.data.addressList[0].id
      //   app.globalData.default_address.isDefault = false
      // } else {
      //   app.globalData.default_address = null
      // }

      wx.hideLoading()
      // console.info(app.globalData.default_address)
    })
  },

  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  getWxAddress() {
    var self = this
    wx.chooseAddress({
      success: function(res) {
        if (res.errMsg === "chooseAddress:ok") {
          wx.showLoading({
            title: '',
          })
          server.api(api.addAddress, {
            city: res.cityName,
            area: res.countyName,
            road: res.detailInfo,
            province: res.provinceName,
            tel: res.telNumber,
            receiver: res.userName,
            user_id: app.globalData.user_id
          }, "post").then(function(res) {
            if (res.text == "添加地址成功") {
              self.getAddress()
            }
          })
        }
      },
      fail: function(res) {
        if (res.errMsg === "chooseAddress:fail auth deny") {
          self.setData({
            toAuthGetAddress: true
          })
        }
      }
    })
  },

  showModal: function(e) {
    this.setData({
      showModal: !this.data.showModal
    })
    if (this.data.showModal) {
      if (e.target.dataset.index == -1) {
        this.data.editAddress = {
          cityName: "",
          countyName: "",
          detailInfo: "",
          nationalCode: "",
          postalCode: "",
          provinceName: "",
          telNumber: "",
          userName: "",
        }
        this.data.region = []
        this.data.editID = -1
      } else {
        this.data.editAddress = this.data.addressList[e.target.dataset.index]
        this.data.region[0] = this.data.addressList[e.target.dataset.index].provinceName
        this.data.region[1] = this.data.addressList[e.target.dataset.index].cityName
        this.data.region[2] = this.data.addressList[e.target.dataset.index].countyName
        this.data.editID = e.target.dataset.index
        // console.info(this.data.editAddress)
      }
      this.setData(this.data)
    }

  },

  delAddress: function(e) {
    var self = this
    // console.info(app.globalData.default_address)
    wx.showModal({
      title: '删除',
      content: '是否删除此收货地址？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除地址...',
          })
          server.api(api.delAddress, {
            address_id: self.data.addressList[e.target.dataset.index].id,
            user_id: app.globalData.user_id
          }, "post").then(function(res) {
            // console.info(res)
            if (res.text == "删除成功") {
              // console.info(self.data.addressList)
              // console.info(app.globalData.default_address)
              // 如果选中的是默认地址 那么把user表address_id设置为NULL
              if (app.globalData.default_address) {
                if (self.data.addressList[e.target.dataset.index].id == app.globalData.default_address.id && app.globalData.default_address.isDefault) {
                  server.api(api.updateDefaultAddress, {
                    user_id: app.globalData.user_id,
                    address_id: 0
                  }, "post").then(function(res) {
                    // console.info(res)
                    if (res.text == "默认地址置空") {
                      app.globalData.default_address = null
                      self.getAddress()
                    }
                  })
                } else {
                  if (self.data.addressList[e.target.dataset.index].id == app.globalData.default_address.id){
                    app.globalData.default_address = null
                  }
                  self.getAddress()
                }
              } else {
                self.getAddress()
              }

            }
          })
        }
      }
    })
  },

  saveAddress: function(e) {
    var self = this
    let editAddress = {
      city: "",
      area: "",
      road: "",
      province: "",
      tel: "",
      receiver: "",
      user_id: app.globalData.user_id
    }
    editAddress.road = e.detail.value.detailInfo
    editAddress.province = e.detail.value.region[0]
    editAddress.city = e.detail.value.region[1]
    editAddress.area = e.detail.value.region[2]
    editAddress.tel = e.detail.value.telNumber
    editAddress.receiver = e.detail.value.userName

    if (this.data.editID == -1) {
      // this.data.addressList.push(editAddress)
      server.api(api.addAddress, editAddress, "post").then(function(res) {
        if (res.text == "添加地址成功") {
          self.data.showModal = false
          self.setData(self.data)
          self.getAddress()
        }
      })
    } else {
      // this.data.addressList[this.data.editID].detailInfo = editAddress.detailInfo
      // this.data.addressList[this.data.editID].provinceName = editAddress.provinceName
      // this.data.addressList[this.data.editID].cityName = editAddress.cityName
      // this.data.addressList[this.data.editID].countyName = editAddress.countyName
      // this.data.addressList[this.data.editID].telNumber = editAddress.telNumber
      // this.data.addressList[this.data.editID].userName = editAddress.userName
      // 编辑地址
      editAddress.address_id = this.data.addressList[this.data.editID].id
      // console.info(editAddress)
      // return
      server.api(api.updateAddress, editAddress, "post").then(function(res) {
        // console.info(res)
        if (res.text == "更新地址成功") {
          self.data.showModal = false
          self.setData(self.data)
          self.getAddress()
        }
      })
    }

  },

  setDefault: function(e) {
    // for (var i in this.data.addressList) {
    //   this.data.addressList[i].isDefault = false
    // }
    // this.data.addressList[e.target.dataset.index].isDefault = true
    // this.setData(this.data)
    var self = this
    wx.showLoading({
      title: '',
    })
    // console.info(this.data.addressList[e.target.dataset.index].id)
    server.api(api.updateDefaultAddress, {
      user_id: app.globalData.user_id,
      address_id: this.data.addressList[e.target.dataset.index].id
    }, "post").then(function(res) {
      if (res.text == "更改默认地址成功") {
        // console.info(res)
        app.globalData.default_address = res.default_address
        // console.info(app.globalData.default_address)
        self.getAddress()
      }
    })
  },

  selectAddress: function(e) {
    if (this.data.toSelectAddress) {
      app.globalData.selectAddress = this.data.addressList[e.currentTarget.dataset.index]
      wx.navigateBack({
        delta: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.address'] == false) {
          // console.info("用户拒绝过授权")
          self.data.toAuthGetAddress = true
        } else {
          self.data.toAuthGetAddress = false
        }
        self.setData(self.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})