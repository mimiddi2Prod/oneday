import ("./utils/http.js")
var voiceVM = new Vue({
    el: '#voiceReminder',
    data: {

    },
    methods: {
        getWaitShip: function () {
            const url = api.getWaitShip, async = true
            let data = {}
            server(url, data, async, "post", function (res) {
                console.info(document.getElementById("audio"))
                if (res.number > 0) {
                    if(document.getElementById("audio").pause){
                        document.getElementById("audio").play()
                    }
                }else{
                    if(document.getElementById("audio").play){
                        document.getElementById("audio").pause()
                    }
                }
            })
        }
    },
})

$(document).ready(function () {
    document.getElementById("audio").pause()
    setInterval(function () {
        voiceVM.getWaitShip()
    },10000)
})

Vue.component('load-voice', {
    data: function () {
        return {}
    },
    template: '<audio id=\'audio\' autoplay="autoplay" loop="loop">\n' +
        '        <source id=\'source\' src="./mp3/bgmp3.mp3" type="audio/mp3"/>\n' +
        '        <!--<source src="song.ogg" type="audio/ogg" />-->\n' +
        '        <embed id=\'embed\' src="./mp3/bgmp3.mp3"/>\n' +
        '    </audio>'
})

new Vue({el: '#LoadVoice'})