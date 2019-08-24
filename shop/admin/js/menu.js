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
            let url = api.getMenu, data = {}, async = false
            server(url, data, async, "post", function (res) {
                console.info(res)
                self.menu = res.menu
            })
        },
    },
    created: function () {
        this.getMenu()
        let href = window.location.href
        let arr = href.split('/')
        let tag = arr[arr.length - 1]
        if (tag == 'addGoods' || tag == 'editGoods' || tag == 'reviewGoods') {
            tag = 'goods'
        }
        if(tag == 'addBrand' || tag == 'editBrand'){
            tag = 'brand'
        }
        if(tag == 'addRecommend' || tag == 'editRecommend'){
            tag = 'recommend'
        }
        if(tag == 'orderDetail'){
            tag = 'order'
        }
        this.activeMenuTag = tag
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
        '<div class="a-item" v-if="item.subMenu.length <= 0" v-on:click="window.location.href = item.tag">' +
        '<img class="menu-logo" :src="item.image"/>' +
        '<span class="a-span" :class="(item.subMenu.length > 0 ? \'\' : \'have-img\')">{{item.name}}</span>' +
        '</div>' +
        '<div class="a-item" v-if="item.subMenu.length > 0">' +
        '<img class="menu-logo" :src="item.image"/>' +
        '<span class="a-span" :class="(item.subMenu.length > 0 ? \'\' : \'have-img\')">{{item.name}}</span>' +
        '</div>' +
        '<ul class="nav" v-if="item.subMenu.length > 0">' +
        '<li v-for="subItem in item.subMenu" class="canSelect" v-on:click="window.location.href = subItem.tag" :class="(subItem.tag == activeMenuTag ? \'active \' : \'\')">' +
        '<div class="a-sub-item">' +
        '<span class="a-span">{{subItem.name}}</span>' +
        '</div>' +
        '</li></ul>' +
        '</li>' +
        '</ul></nav>'
})

new Vue({el: '#LoadMenu'})