/**
 * Created by angus on 2017-2-10.
 */
$(function() {
    let date = new Date();
    let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let postStr = str + ',' + str;
    let webId = $('.dropdown').val();
    defaultAjax(webId, 'range', postStr, $('#getTime'));
    defaultAjax2(webId, 'range', postStr, $('#getTime'));

    $('#getTime').on('click', function() {
        let time = $('#startTime').val() + ',' + $('#endTime').val();
        $(this).addClass('loading');
        defaultAjax($('.dropdown').val(), 'range', time, $(this));
        defaultAjax2($('.dropdown').val(), 'range', time, $(this));
    });

    function defaultAjax(id, period, date, _) {
        $.ajax({
            type: 'post',
            url: '/device/api/devices',
            data: {
                id: id,
                period: period,
                date: date
            },
            dataType: 'json',
            success: function(result) {
                let xData = new Set(),
                    yData = new Set();
                if(result.data.length) {
                    result.data.forEach(item => {
                        if(item.label !== '未知') {
                            xData.add(item.segment.split('==')[1] ? item.segment.split('==')[1] : '未知');
                            yData.add(item.nb_visits);
                        }
                    });
                }
                if (!result.code) {
                    _.removeClass('loading');
                    var myChart = echarts.init(document.getElementById('main'));
                    option = {
                        color: ['#3398DB'],
                        title : {
                            text: '各手机品牌访问',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : [...xData],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'访问总量',
                                type:'bar',
                                barWidth: '60%',
                                data:[...yData]
                            }
                        ]
                    };
                    myChart.setOption(option);
                } else {
                    alert(result.message);
                }

            }
        });
    }

    function defaultAjax2(id, period, date, _) {
        $.ajax({
            type: 'post',
            url: '/device/api/dps',
            data: {
                id: id,
                period: period,
                date: date
            },
            dataType: 'json',
            success: function(result) {
                let xData = new Set(),
                    yData = new Set();
                if(result.data.length) {
                    result.data.forEach(item => {
                        if(item.label !== '未知') {
                            xData.add(item.segment.split('==')[1] ? item.segment.split('==')[1] : '未知');
                            yData.add(item.nb_visits);
                        }
                    });
                }
                if (!result.code) {
                    _.removeClass('loading');
                    var myChart = echarts.init(document.getElementById('main2'));
                    option = {
                        color: ['#3398DB'],
                        title : {
                            text: '分辨率访客数',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : [...xData],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'访问总量',
                                type:'bar',
                                barWidth: '60%',
                                data:[...yData]
                            }
                        ]
                    };
                    myChart.setOption(option);
                } else {
                    alert(result.message);
                }

            }
        });
    }

});