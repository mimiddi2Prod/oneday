var indexVM = new Vue({
    el: '#index',
    data: {
		data:''
	},
    methods: {}
})

$(document).ready(function () {
    //getCode()
	getAccessToken()
})

function getCode() {
    const url = '../api/get_code'
    let data = {}
    server(url, data, true, "post", function (res) {
		
        if (res.data.appid) {
            let rootUrl = 'https://open.weixin.qq.com'
            let redirect_uri = encodeURI(res.data.url)
            let path = '/connect/oauth2/authorize?appid=' + res.data.appid + '&redirect_uri=' + redirect_uri +
                '&response_type=code&scope=' + res.data.scope + '&state=STATE#wechat_redirect'
//indexVM.data = rootUrl + path
          //  window.open(rootUrl + path)
		  window.location.href = rootUrl + path
        }
    })
}

function getAccessToken() {
    const url = '../api/test_get_accessToken'
    let data = {}
    server(url, data, true, "post", function (res) {
		console.info(res)
    })
}