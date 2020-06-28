function Axios(url, method = "get", data = {}) {
    return new Promise(async function (resolve, reject) {
        let call = null
        method == "get" ? await axios.get(url).then(function (res) {
            call = res
        }).catch(function (err) {
            reject(err)
        }) : await axios.post(url, data).then(function (res) {
            call = res
        }).catch(function (err) {
            reject(err)
        })
        if (call.data.errcode == 0) {
            resolve(call.data.data)
        } else {
            alert(call.data.errmsg)
            window.location.href = "/"
        }
    })
}