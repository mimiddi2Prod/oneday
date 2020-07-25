var membervm = new Vue({
    el: "#member",
    data: {
        phone_number: "",
        member: {},
        increment_balance: '',
        handsel_balance: '',
    },
    methods: {
        // 通过接口获取分类和商品
        getMember() {
            $('#loading').modal('show')
            let self = this
            Axios(api.getMember, "POST", {"phone_number": self.phone_number}).then(res => {
                setTimeout(() => {
                    self._hideModal()
                }, 500)
                if (res.code == 0) {
                    self.member = res.data
                } else {
                    self.member = {}
                    setTimeout(() => {
                        $('#modal_1').on('show.bs.modal', function (e) {
                            let modal = $(this)
                            modal.find('.modal-title').text('提示')
                            modal.find('.modal-body').text(res.errmsg)
                        })
                        $('#modal_1').on('hidden.bs.modal', function (e) {
                            $('#modal_1_submit')[0].removeEventListener("click", self._hideModal);
                        })
                        $('#modal_1').modal('show');
                        $('#modal_1_submit')[0].addEventListener("click", self._hideModal)
                    }, 1000)
                }
            })
        },
        submit() {
            let self = this, data = {
                increment_balance: Number(this.increment_balance),
                handsel_balance: Number(this.handsel_balance)
            }
            if (!data.increment_balance) {
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('请输入正确的金额')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", self._hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", self._hideModal)
                return
            }
            $('#loading').modal('show')
            data.increment_balance = Math.round(data.increment_balance * 100) / 100
            data.handsel_balance = Math.round(data.handsel_balance * 100) / 100
            data = Object.assign(data, {"phone_number": this.member.phone_number})
            Axios(api.setMember, "POST", data).then(res => {
                if (res.code == 0) {
                    self.member = res.data
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        // showEditProductModal(product) {
        //     this.editProduct = Object.assign({}, product, {"category_id": this.category[this.cursor_id].id})
        //     let self = this
        //     $('#modal_edit_goods').on('show.bs.modal', function (e) {
        //         let modal = $(this)
        //         modal.find('.modal-title').text("商品编辑");
        //     })
        //     $('#modal_edit_goods').on('hidden.bs.modal', function (e) {
        //         $('#modal_edit_goods_submit')[0].removeEventListener("click", this._hideModal);
        //     })
        //     $('#modal_edit_goods').modal('show');
        //     $('#modal_edit_goods_submit')[0].addEventListener("click", this._hideModal);
        // },
        // submitProduct() {
        //     $('#loading').modal('show')
        //     let self = this, {id, name, price, stock, category_id, status} = this.editProduct
        //     price = Math.round(Number(price) * 100) / 100
        //     Axios(api.setProduct, "POST", {product: {id, name, price, stock, category_id, status}}).then(res => {
        //         if (res.state == 0) {
        //             self.category = res.data.list
        //         }
        //         setTimeout(() => {
        //             self._hideModal()
        //         }, 500)
        //     })
        // },
        _hideModal() {
            $('#modal_edit_goods').modal('hide');
            $('#modal_1').modal('hide');
            $('#loading').modal('hide')
        },
    },
    mounted: function () {

    },
    created: function () {

    }
})