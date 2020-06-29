/**
 * 根据cookie的key获取对应的value
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    // console.info(decodedCookie)
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * 时间格式化
 * */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 图表绘制
 * datasets:
 * fill:是否填充下沉区域
 * pointBackgroundColor:坐标点颜色
 * pointBorderColor:坐标点边框颜色
 * tension:贝塞尔曲线张力（0无贝塞尔曲线)
 * borderColor:线条描边颜色。
 *
 * options:{
 *     aspectRatio:画布纵横比 1为正方形
 *     responsive:浏览器窗口大小改变时，图形比例不变
 *     maintainAspectRatio:调整大小时，请保持原始画布的宽高比。
 *     scales.yAxes.ticks.beginAtZero:是否强制从0开始画y轴坐标
 *     scales.yAxes.ticks.stepSize:刻度差
 *     title.display:是否显示标题
 *     title.text:标题文本
 *     tooltips.mode:x轴坐标上的数据都显示
 *     tooltips.intersect:不需要悬浮在坐标点上也能显示当前x轴上的数据
 *     tooltips.enabled:是否展示提醒工具，即坐标数据
 * }
 */
function MakeChart(id, title, type = "line", xLabels = [], ...yData) {
    let ctx = document.getElementById(id).getContext('2d')
    const Style = ["#5FAB78", "#EAA228"]
    let datasets = yData.map(function (value, index) {
        return type == "line" ? {
            label: value.title,
            data: value.data,
            fillColor: "rgba(220,220,220,0.2)",
            fill: false,
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            tension: 0,
            pointBackgroundColor: Style[index],
            pointBorderColor: Style[index],
            borderColor: Style[index],
            // backgroundColor: Style[index],
        } : type == "bar" ? {
            label: value.title,
            data: value.data,
            backgroundColor: Style[index],
            borderWidth: 1,
            borderColor: "#000",
            borderSkipped: "bottom",
        } : null
    })
    return new Chart(ctx, {
        type: type,
        data: {
            labels: xLabels,
            datasets: datasets
        },
        options: {
            // aspectRatio: 4,
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        // stepSize:2
                    }
                }]
            },
            title: {
                display: true,
                text: title
            },
            tooltips: {
                mode: 'index',
                intersect: true, // onComplete绘制数值 这边应该为true
                enabled: true
            },
            onClick: function (e) {
                let self = this
                /**
                 * el：单个点
                 * els：x坐标轴上所有点
                 * dataset：在事件点下查找元素，然后返回该数据集中的所有元素。内部用于“数据集”模式突出显示。
                 * meta(index)：查找与当前索引匹配的数据集并返回该元数据。返回的数据具有用于构造图表的所有元数据。
                 * data元数据的属性将包含有关每个点，矩形等的信息，具体取决于图表类型。
                 */
                let el = self.getElementAtEvent(e)
                // let els = self.getElementsAtEvent(e)
                // let dataset = this.getDatasetAtEvent(e)
                // console.info(el, els, dataset)
                el.length ? el.map(function (value) {
                    let meta = self.getDatasetMeta(value._datasetIndex)
                    console.info('第' + value._datasetIndex + '项元素,', meta.controller._config.label + ":",
                        "x轴:" + value._xScale.ticks[value._index] + ",", "y轴:" + meta.controller._data[value._index])
                }) : console.info('没有点击到')
            },
            animation: {
                // 动画进行中
                // onProgress: function(animation) {
                //     console.info(1,animation)
                // },
                // 动画进行结束 在坐标点上绘制数值
                onComplete: function (animation) {
                    let self = this
                    let ctx = self.chart.ctx;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = "#777777"; // render in correct colour
                    ctx.font = 'bold 12px "Helvetica Neue", Helvetica, Arial, sans-serif';
                    datasets.forEach(function (value, index) {
                        let meta = self.getDatasetMeta(index)
                        !meta.hidden ? meta.data.forEach(function (value, index) {
                            ctx.fillText(meta.controller._data[index], value._model.x, value._model.y - 2);
                        }) : null
                    })
                }
            }
        }
    })
}