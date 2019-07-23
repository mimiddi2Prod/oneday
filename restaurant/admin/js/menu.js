import ("./utils/http.js")
var menuVM = new Vue({
    el: '#menu',
    data: {
        menu: [],
        activeMenuTag: ''
    },
    methods: {
        getMenu: function () {
            let self = this
            let url = '../api/get_menu', data = {}, async = false
            server(url, data, async, "post", function (res) {
                console.info(res)
                self.menu = res.menu
                if (self.activeMenuTag.length <= 0) {
                    self.activeMenuTag = self.menu[0].tag
                }
            })
        }
    },
    created: function () {
        this.getMenu()
    }
})

Vue.component('load-menu', {
    data: function () {
        return {
            menu: menuVM.menu,
            activeMenuTag: menuVM.activeMenuTag
        }
    },
    template: '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
        '<ul class="nav sidebar-nav">' +
        '<block>' +
        '<li :class="(item.subMenu.length > 0 ? \'canSelect\' : \'noSelect\')" :class="(item.tag == activeMenuTag ? \'active\' : \'\')" id="home" v-for="item in menu"><a :href="item.tag"><img :src="item.image"/><span class="have-img">{{item.name}}</span></a></li>' +
        '</block>' +
        '</ul>' +
        '</nav>'
})

new Vue({el: '#LoadMenu'})