/**
 * header 退出登录等
 * @type {*|string}
 */
Vue.component('get-header', {
    data: function () {
        return {}
    },
    template: '<header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">\n' +
        '          <button type="button" class="btn btn-primary ml-md-auto" onclick="signOut()">X</button>\n' +
        '      </header>'
})

new Vue({el: '#GetHeader'})

function signOut() {
    $('#modal_1').on('show.bs.modal', function (e) {
        let modal = $(this)
        modal.find('.modal-title').text('提示')
        modal.find('.modal-body').text('是否退出登录？')
    })
    $('#modal_1').on('hidden.bs.modal', function (e) {
        $('#modal_1_submit')[0].removeEventListener("click", submit);
    })
    $('#modal_1').modal('show');
    $('#modal_1_submit')[0].addEventListener("click", submit)
}

function submit() {
    $('#modal_1').modal('hide');
    Axios(api.signOut, "post", {}).then(function (res) {
        if (res == "sign out success") {
            window.location.href = "/"
        } else {
            loginvm.loginErr = res
        }
    })
}