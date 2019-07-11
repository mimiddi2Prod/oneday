var authorizeVM = new Vue({
    el: '#authorize',
    data: {
		data:''
    },
    methods: {

    }
})

$(document).ready(function () {
     var url = location.href
     var num = url.indexOf('?')
     url = url.substr(num+1)
     var parameter = url.split('&')
	 let parameter1 = parameter[0].split('=')
     getAccessToken(parameter1[1])
    // window.location.href = 'http://tyt.com/game/gameover/?user_id=367&score=0'
    //window.open('http://tyt.com/game/gameover/?user_id=367&score=0')
})

function getAccessToken(code) {
    const url = '../api/get_access_token'
    let data = {}
    data.code = code
    server(url, data, true, "post", function (res) {
        console.info(res) 
		
		let href = 'http://test2.minidope.com/tyt?userID='+res.data.id
		window.location.href = href
		//window.open(href)
    })
}


