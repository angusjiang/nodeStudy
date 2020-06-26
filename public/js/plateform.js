/**
 * Created by angus on 2017-2-8.
 */
$(function() {
    let date = new Date();
    let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let postStr = str + ',' + str;
    let webId = $('.dropdown').val();
    defaultAjax(webId, 'range', postStr, $('#getTime'));
    $('#getTime').on('click', function() {
        let time = $('#startTime').val() + ',' + $('#endTime').val();
        $(this).addClass('loading');
        defaultAjax($('.dropdown').val(), 'range', time, $(this));
    });
    function defaultAjax(id, period, date, _) {
        $.ajax({
            type: 'post',
            url: '/platform/api/getPlatforms',
            data: {
                id: id,
                period: period,
                date: date
            },
            dataType: 'json',
            success: function(result) {
                let getArr = result.data;
                let plateform = new Set(),
                    brower = new Set();

                getArr.forEach(item => {
                    let tem = item.label.split('/')[0].replace(/(^\s*)|(\s*$)/g, '');
                    let temp =item.label.split('/')[2] ? item.label.split('/')[2].replace(/(^\s*)|(\s*$)/g, '') : '未知';
                    plateform.add(tem);
                    brower.add(temp);
                });
                var PF = [...plateform];
                var BW = [...brower];

                class GetObj {
                    constructor() {
                    }
                    getval(name) {
                        let count = 0;
                        for(let i = 0; i < getArr.length; i++) {
                            if(new RegExp(name,'g').test(getArr[i].label)) {
                                count += getArr[i].nb_visits;
                            }
                        }
                        return count;
                    }
                }
                let getv = new GetObj();

                //用户显示平台是桌面还是的移动端的内环圆数据
                let platformArr = [];
                for(let i = 0; i < PF.length; i++) {
                    if(i == 1) {
                        platformArr.push({
                            value: getv.getval(PF[i]),
                            name: PF[i],
                            selected: true
                        });
                    } else {
                        platformArr.push({
                            value: getv.getval(PF[i]),
                            name: PF[i]
                        });
                    }
                }

                //用户显示浏览器人数的的外环圆数据
                let browerArr = [];
                for(let i = 0; i < BW.length; i++) {
                    browerArr.push({
                        value: getv.getval(BW[i]),
                        name: BW[i]
                    });
                }
                if (!result.code) {
                    _.removeClass('loading');
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('main'));

                    // 指定图表的配置项和数据
                    var option = {
                        title : {
                            text: '终端和浏览器在某段时间内的访问比例统计',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: PF.concat(BW)
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],

                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: platformArr
                            },
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['40%', '55%'],
                                data: browerArr
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

});