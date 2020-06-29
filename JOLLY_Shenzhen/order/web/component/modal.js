/**
 * loading 转圈圈
 * //显示 $('#loading').modal('show');
 * //隐藏 $('#loading').modal('hide');
 */
Vue.component('my-loading', {
    data: function () {
        return {}
    },
    template: '<div class="modal fade" id="loading" tabindex="-1" role="dialog" aria-labelledby="myModalLoading" data-backdrop="static">\n' +
        '                <div class="modal-dialog" role="document">\n' +
        '                    <div class="d-flex justify-content-center">\n' +
        '                        <div class="spinner-border" role="status">\n' +
        '                            <span class="sr-only">Loading...</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>'
})

Vue.component('my-modal-1', {
    data: function () {
        return {}
    },
    template: '<div class="modal fade" id="modal_1" tabindex="-1" role="dialog" aria-labelledby="myModal1" data-backdrop="static">\n' +
        '  <div class="modal-dialog" role="document">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title"></h5>\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '          <span aria-hidden="true">&times;</span>\n' +
        '        </button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <p></p>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>\n' +
        '        <button type="button" class="btn btn-primary" id="modal_1_submit">确定</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>'
})

// 折扣
Vue.component('my-modal-discount', {
    data: function () {
        return {
            list: ['95 折', '9 折', '85 折', '8 折', '75 折', '7 折', '6 折', '5 折', '免单', '抹零']
        }
    },
    template: '<div class="modal fade" id="modal_2" tabindex="-1" role="dialog" aria-labelledby="myModal2" data-backdrop="static">\n' +
        '    <div class="modal-dialog" role="document">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title"></h5>\n' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                    <span aria-hidden="true">&times;</span>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '            <div class="modal-body row">\n' +
        '                <div class="input-group mb-3 w-100 align-items-center mx-5">\n' +
        '                    <input type="text" class="form-control text-right" placeholder=""\n' +
        '                           aria-label="Example text with button addon"\n' +
        '                           aria-describedby="button-addon1"\n' +
        '                           oninput="value=value.replace(/[^\\d.]/g,\'\')">\n' +
        '                    <div class="input-group-prepend text-center ml-2">\n' +
        '                        <span>%</span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="nav mx-5 flex-row">\n' +
        '                    <div class="text-center col-6 mb-2" v-for="item in list">\n' +
        '                        <button class="btn btn-info py-2 px-4 w-100"><h5>{{item}}</h5></button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>\n' +
        '                <button type="button" class="btn btn-primary" id="modal_2_submit">确定</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>'
})
Vue.component('get-discount', {
    data: function () {
        return {}
    },
    template: '<div class="position-fixed mt-5">\n' +
        '        <button class="btn btn-info" onclick="showModalDiscount()">折扣</button>\n' +
        '    </div>'
})
new Vue({el: '#GetDiscount'})

function showModalDiscount() {
    $('#modal_2').on('show.bs.modal', function (e) {
        let modal = $(this)
        modal.find('.modal-title').text('折扣')
        // modal.find('.modal-body').text('是否退出登录？')
    })
    $('#modal_2').on('hidden.bs.modal', function (e) {
        $('#modal_2_submit')[0].removeEventListener("click", submit1);
    })
    $('#modal_2').modal('show');
    $('#modal_2_submit')[0].addEventListener("click", submit1)
}

function submit1() {
    $('#modal_2').modal('hide');
    console.info(333)
    settleaccountsvm.getDiscountToCalculation(333444)
}

new Vue({el: '#MyModal'})