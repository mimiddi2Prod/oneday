var menuVM = new Vue({
    el: '#menu',
    data: {},
    methods: {},
    created: {
        // this.getMenu()
    },
})

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button class="container" v-on:click="count++">You clicked me {{ count }} times.</button>'
})

new Vue({el: '#components-demo'})

function getMenu() {
    let url = '../api/get_menu', async = false
    server(url, data = {}, async, "post", function (res) {
        console.info(res)
    })
}

cr