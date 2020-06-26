/**
 * Created by angus on 2017-2-8.
 */
$(function() {
    let date = new Date();
    let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let postStr = str + ',' + str;
    let webId = $('.dropdown').val();
    defaultAjax(webId, 'range', postStr, $('#getTime'));
    defaultAjax2(webId, 'range', postStr, $('#getTime'));

    $('#getTime').on('click', function() {
        $(this).addClass('loading');
        let time = $('#startTime').val() + ',' + $('#endTime').val();
        defaultAjax($('.dropdown').val(), 'range', time, $(this));
        defaultAjax2($('.dropdown').val(), 'range', time, $(this));
    });
    function defaultAjax(id, period, date, _) {
        $.ajax({
            type: 'get',
            url: '/software/api/software/'+ id + '/' + period +'/' + date,
            data: {
            },
            dataType: 'json',
            success: function(result) {
                let os = new Set(),
                    osArr = new Set();
                if(result.data.length) {
                    result.data.forEach(item => {
                        os.add(item.label);
                        osArr.add({
                            name: item.label,
                            value: item.nb_visits
                        });
                    });
                }
                if (!result.code) {
                    _.removeClass('loading');
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('main'));

                    // 指定图表的配置项和数据
                    option = {
                        title : {
                            text: '用户访问来源的系统统计',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: [...os]
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data: [...osArr],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                } else {
                    alert(result.message);
                }

            }
        });
    }
    function defaultAjax2(id, period, date, _) {
        $.ajax({
            type: 'get',
            url: '/software/api/getEngine/'+ id + '/' + period +'/' + date,
            data: {
            },
            dataType: 'json',
            success: function(result) {
                console.log(result);
                let xData = new Set(),
                    yData = new Set();
                if(result.data.length) {
                    result.data.forEach(item => {
                        xData.add(item.segment.split('==')[1] ? item.segment.split('==')[1] : '未知');
                        yData.add(item.sum_visit_length);
                    });
                }
                if (!result.code) {
                    _.removeClass('loading');
                    var myChart = echarts.init(document.getElementById('main2'));
                    option = {
                        color: ['#3398DB'],
                        title : {
                            text: '浏览器内核访问总量统计',
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