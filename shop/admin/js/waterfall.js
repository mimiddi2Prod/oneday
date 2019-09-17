var waterfallVM = new Vue({
    el: '#waterfall',
    data: {
        // watList: [{
        //     name: '在埃及与宿敌DIO的死斗之后过了11年。1999年，空条承太郎为了与祖父乔瑟夫·乔斯达的私生子东方仗助见面，而来到了日本M县S市杜王町。但，仗助却持有与承太郎相同的特殊能力“替身”。之后，以承太郎的来访为开端，仿佛被吸引一般，新的“替身使”们开始行动。“这座城镇存在着什么……”为了守护养育了自己的杜王町，仗助挺身而出——。',
        //     desc: '非常酷的话',
        //     img: '/images/logo.png',
        //     order: 1,
        //     status: 0, //0:点击开启， 1:点击禁用
        // }, {
        //     name: '学生百搭披风潮流超人同款加长加厚',
        //     desc: '非主流限定',
        //     img: '/images/logo.png',
        //     order: 1,
        //     status: 1, //0:点击开启， 1:点击禁用
        // }],
        watList: [],
        navList: ['瀑布流', '专题精选', '待展示商品'],
        navId: 0,
        last_id: 0,

        // stateList: ['开启', '关闭'],
        // stateId: 0,

        pageList: [], // 分页栏
    },
    methods: {
        // 跳转添加瀑布流需要
        changePage: function (e) {
            var href = './' + e + '.html'
            $("#container").load(href);
            sessionStorage.setItem("href", href);
        },
        // 删除按钮弹窗
        delItem: function (index) {
            const body = this.watList[index].name
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('删除')
                modal.find('.modal-body span').text('是否删除 "' + body + '" 删除后不可恢复')
            })
        },
        // 状态按钮
        changeStatus: function (itemId, type) {
            // console.info(itemId)
            // console.info(type)
            changeWaterFallState(itemId, type)
        },
        getPage: function (index) {
            this.last_id = index
            getWaterFall()
        },
        changeNav: function (index) {
            this.navId = index
            this.last_id = 0
            getWaterFall()
        },
        updateSort: function (id, sort) {
            updateWaterFallSort(id, sort)
        }
    }
})

$(document).ready(function () {
    getWaterFall()
})

function getWaterFall() {
    waterfallVM.pageList = []
    waterfallVM.watList = []
    const url = api.getWaterfall, async = true
    let data = {}
    data.last_id = waterfallVM.last_id
    data.type = waterfallVM.navId
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.number > 0) {
            res.list.map(function (fn) {
                fn.create_time = formatTime(new Date(fn.create_time))
                return fn
            })
            waterfallVM.watList = res.list

            // 分页栏
            for (let i = 0; i < res.number / 5; i++) {
                waterfallVM.pageList.push(i + 1)
            }
        }
    })
}

function changeWaterFallState(itemId, type) {
    const url = api.updateWaterfall, async = true
    let data = {}
    data.id = itemId
    data.type = type
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.text == "更改成功") {
            location.reload()
        }
    })
}

function updateWaterFallSort(id, sort) {
    const url = api.updateWaterfallSort, async = true
    let data = {}
    data.id = id
    data.sort = sort
    server(url, data, async, "post", function (res) {
        console.info(res)
        if (res.code == 0) {
            // location.reload()
            getWaterFall()
        }
    })
}