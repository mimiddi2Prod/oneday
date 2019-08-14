var vm = new Vue({
    el: '#login',
    data: {
        username: '',
        password: '',
    },
    methods: {
        submit: function () {
            if (!this.username) {
                alert('请填写账号')
                return false
            }
            if (!this.password) {
                alert('请填写密码')
                return false
            }
            const password = encryptKey(this.password)
            login(this.username, password)
        }
    }
})
var key = ''
$(document).ready(function () {
    // cookie test
    // document.cookie = "username=biill;expires=Sun, 31 Dec 2017 12:00:00 UTC;path=/"
    // var x = document.cookie
    // console.info(x)
    getPublic()
})

$(document).keypress(function (e) {
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if (eCode == 13) {
        // alert('您按了回车键')
        vm.submit()
    }
});

function getPublic() {
    const url = '../api/get_public'
    let data = {}, async = false
    server(url, data, async, "post", function (res) {
            // console.info(res)
            if (res.key) {
                key = res.key
            }
        }
    )
}

function encryptKey(str) {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(key)
    const encryptKey = encrypt.encrypt(str)
    return encryptKey
}

function login(username, password) {
    window.location.href = './home';
    // const url = '../api/login'
    // let data = {}
    // data.username = username
    // data.password = password
    // server(url, data, "post", function (res) {
    //     if (res.text == "login is success") {
    //         sessionStorage.setItem("user_id", res.id);
    //         sessionStorage.setItem("str", res.str);
    //
    //         // window.location.href = './html/main.html';
    //         window.location.href = './main';
    //     } else {
    //         alert(res.text)
    //     }
    // })
}