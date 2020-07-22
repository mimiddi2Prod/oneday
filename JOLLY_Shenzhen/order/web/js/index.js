var loginvm = new Vue({
    el: "#login",
    data: {
        publicKey: "",
        username: "",
        password: "",
        isClick: false,
        loginErr: null
    },
    methods: {
        signIn: function () {
            if (!this.username || !this.password) {
                this.loginErr = !this.username ? "请输入账号" : "请输入密码"
                this.isClick = true
                return false
            }
            const username = this.username
            const password = (function () {
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(loginvm.publicKey)
                return encrypt.encrypt(loginvm.password)
            })()

            $('#loading').modal('show')
            Axios(api.signIn, "post", {
                username: username,
                password: password
            }).then(function (res) {
                if (res == "sign in success") {
                    window.location.href = "home"
                } else {
                    loginvm.loginErr = res
                }
                setTimeout(()=>{
                    $('#loading').modal('hide')
                },500)
            })
        },
    },
    mounted: function () {
        (function getPublicKey() {
            Axios(api.getPublicKey).then(function (res) {
                loginvm.publicKey = res.key
            })
        })()
    }
})

