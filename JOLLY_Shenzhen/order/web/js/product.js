var productvm = new Vue({
    el: "#product",
    data: {
        category: [],
        cursor_id: 0,
        editProduct: {},
    },
    methods: {
        // 通过接口获取分类和商品
        _getCategoryAndProduct() {
            let self = this
            Axios(api.getCategoryAndProduct, "POST", {type: "edit"}).then(res => {
                // console.info(res)
                if (res.state == 0) {
                    self.category = res.data.list
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        showEditProductModal(product) {
            this.editProduct = Object.assign({}, product, {"category_id": this.category[this.cursor_id].id})
            let self = this
            $('#modal_edit_goods').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text("商品编辑");
            })
            $('#modal_edit_goods').on('hidden.bs.modal', function (e) {
                $('#modal_edit_goods_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_edit_goods').modal('show');
            $('#modal_edit_goods_submit')[0].addEventListener("click", this._hideModal);
        },
        submitProduct() {
            $('#loading').modal('show')
            let self = this, {id, name, price, stock, category_id, status} = this.editProduct
            price = Math.round(Number(price) * 100) / 100
            Axios(api.setProduct, "POST", {product: {id, name, price, stock, category_id, status}}).then(res => {
                if (res.state == 0) {
                    self.category = res.data.list
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        _hideModal() {
            // $('#modal_anti_checkout').modal('hide');
            $('#modal_edit_goods').modal('hide');
            $('#loading').modal('hide')
        },
    },
    mounted: function () {
        $('#loading').modal('show')
        this._getCategoryAndProduct()

    },
    created: function () {

    }
})