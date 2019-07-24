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

        let href = window.location.href
        let arr = href.split('/')
        let length = arr.length
        this.activeMenuTag = arr[length - 1]
        console.info(arr[length - 1])
    }
})

Vue.component('load-menu', {
    data: function () {
        return {
            menu: menuVM.menu,
            activeMenuTag: menuVM.activeMenuTag
        }
    },
    template: '<nav>' +
        '<ul class="nav">' +
        '<li v-for="item in menu" :class="(item.tag == activeMenuTag ? \'active \' : \'\')+\'\'+(item.subMenu.length > 0 ? \'noSelect\' : \'canSelect\')">' +
        '<a class="a-item" :href="(item.subMenu.length > 0 ? \'javascript:;\' : item.tag)" :click="this.activeMenuTag = item.tag">' +
        '<img class="menu-logo" :src="item.image"/>' +
        '<span class="a-span" :class="(item.subMenu.length > 0 ? \'\' : \'have-img\')">{{item.name}}</span>' +
        '</a>' +
        '<ul class="nav" v-if="item.subMenu.length > 0">' +
        '<li v-for="subItem in item.subMenu" class="canSelect" :class="(subItem.tag == activeMenuTag ? \'active \' : \'\')">' +
        '<a class="a-sub-item" :href="subItem.tag" :click="this.activeMenuTag = subItem.tag">' +
        '<span class="a-span">{{subItem.name}}</span>' +
        '</a>' +
        '</li></ul>' +
        '</li>' +
        '</ul></nav>'
})

new Vue({el: '#LoadMenu'})