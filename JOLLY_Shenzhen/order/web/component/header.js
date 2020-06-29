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

Vue.component('get-backspace', {
    data: function () {
        return {}
    },
    template: '<div class="ml-2 nav align-items-center" style="line-height: 50px" onclick="history.go(-1)">\n' +
        '        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-short" fill="currentColor"\n' +
        '             xmlns="http://www.w3.org/2000/svg">\n' +
        '            <path fill-rule="evenodd"\n' +
        '                  d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>\n' +
        '            <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>\n' +
        '        </svg>\n' +
        '        返回\n' +
        '    </div>'
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