<template>
    <div id="page">
        <h1>数据统计</h1>
        <div id="up" class="left">
            <h3>早起情况一览图</h3>
        </div>
        <div id="bed" class="right">
            <h3>晚睡情况一览图</h3>
        </div>
        <div id="timing" class="left">
            <h3>专注时长情况一览图</h3>
        </div>
        <div id="star" class="right">
            <h3>自我评价情况一览图</h3>
        </div>
        <!-- <div id="redar" class="left">
            <h3>所有数据情况</h3>
        </div> -->
        <div id="sum">
            <h3>自我总结</h3>
            <el-collapse>
                <el-collapse-item v-for="(item,index) in timelist" :key="item.id" :title="item.day" :name="index">
                    <div><span class="el-icon-s-claim">专注事件</span> : {{item.title}}</div>
                    <div>总结 : {{item.desc}}</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
    import { get, post } from '@/axios/api'
    import { Line, Column, Radar } from '@antv/g2plot';
    import { Chart } from '@antv/g2';
    import { formatM } from '@/utils/date'
    export default {
        name: 'Data',
        data() {
            return {
                timelist: [],
                upCount: [],
                bedCount: [],
                todayCount: [],
                eventCount: [],
                starCount: []
            }
        },
        created() {
            this.getUpBedData();
            this.getTimingData();
            this.drawRedar();
        },
        methods: {
            getUpBedData() {
                get('/index/index/signlist')
                    .then((res) => {
                        let mydata = res.data.sort(res.data.day)
                        // 保留签到的时间点
                        for (var i = 0; i < mydata.length; i++) {
                            mydata[i].time = (mydata[i].time).substring(11, 19);
                            mydata[i].hour = parseInt((mydata[i].time).substring(0, 2));
                        }
                        // 将早起和晚睡信息分开处理
                        var uptemp = []
                        var bedtemp = []
                        var u = 0
                        var b = 0
                        for (var i = 0; i < mydata.length; i++) {
                            if (mydata[i].type == 1) {
                                uptemp[u++] = mydata[i]
                            } else if (mydata[i].type == 2) {
                                bedtemp[b++] = mydata[i]
                            }
                        }
                        // 将数据传入画图方法
                        this.drawUp(uptemp)
                        this.drawBed(bedtemp)
                        // 数组存值
                        this.upCount = { item: '早起打卡次数', value: uptemp.length }
                        this.bedCount = { item: '晚睡打卡次数', value: bedtemp.length }
                    });
            },
            getTimingData() {
                get('/index/index/timelist')
                    .then((res) => {
                        var mydata = res.data.sort(res.data.day)
                        var sum = 0
                        //console.log(mydata)
                        for (var i = 0; i < mydata.length; i++) {
                            if (mydata[i].score == '') {
                                mydata[i].score = 0
                            } else {
                                mydata[i].score = parseInt(mydata[i].score);
                                sum += mydata[i].score
                            }

                            if (mydata[i].duration == '') {
                                mydata[i].dur = 0
                            } else {
                                mydata[i].dur = formatM(mydata[i].duration)
                            }
                        }
                        this.timelist = this.findSum(mydata)
                        this.drawTiming(mydata)
                        this.drawStar(mydata)
                        this.starCount = { item: '专注平均分', value: (sum / mydata.length) }
                    });
            },
            findSum(mydata) {
                var timelist = []
                var n = 0
                for (var i = 0; i < mydata.length; i++) {
                    if (mydata[i].desc == '') {

                    } else {
                        timelist[n++] = mydata[i]
                    }
                }
                return timelist;
            },
            drawUp(data) {
                // 抓取容器
                let chart = new Chart({
                    container: 'up',
                    height: 350,
                    width: 450,
                    padding: [30, 30, 70, 30],//上,左,下,右
                });
                //console.log(data)
                // 将数据传入表格
                chart.data(data);
                // 设置辅助线
                chart.tooltip({
                    showCrosshairs: true, // 展示 Tooltip 辅助线
                    shared: true,
                });
                // .line() 折线图  .position('day*hour') 设置横纵坐标
                // .tooltip('day*time') 设置提示信息
                chart.line().position('day*hour').tooltip('day*time').shape('smooth');
                // 将表格渲染到页面
                chart.render();
            },
            drawBed(data) {
                let chart = new Chart({
                    container: 'bed',
                    height: 350,
                    width: 450,
                    padding: [30, 30, 70, 30],//上,左,下,右
                });

                chart.data(data);

                chart.tooltip({
                    showCrosshairs: true, // 展示 Tooltip 辅助线
                    shared: true,
                });

                chart.line().position('day*hour').tooltip('day*time').shape('smooth');;
                chart.render();
            },
            drawTiming(data) {
                const columnPlot = new Column('timing', {
                    forceFit: true,
                    data,
                    padding: 'auto',
                    data,
                    xField: 'title',
                    yField: 'dur',
                    meta: {
                        title: {
                            alias: '事件',
                        },
                        dur: {
                            alias: '(分钟)',
                        },
                    },
                    label: {
                        visible: true,
                        style: {
                            fill: 'gray',
                            fontSize: 12,
                            fontWeight: 600,
                            opacity: 0.6,
                        }
                    },
                    columnStyle: {
                        fill: '#9BCD9B',
                    }
                });
                columnPlot.render();
            },
            drawStar(data) {
                const columnPlot = new Column('star', {
                    forceFit: true,
                    data,
                    padding: 'auto',
                    data,
                    xField: 'title',
                    yField: 'score',
                    meta: {
                        title: {
                            alias: '事件',
                        },
                        score: {
                            alias: '(分)',
                        },
                    },
                    label: {
                        visible: true,
                        style: {
                            fill: 'gray',
                            fontSize: 12,
                            fontWeight: 600,
                            opacity: 0.6,
                        }
                    },
                    columnStyle: {
                        fill: '#CDB5CD',
                    }
                });
                columnPlot.render();
            },
            // drawRedar() {
            //     let data = []
            //     data.push(this.upCount)
            //     data.push(this.bedCount)
            //     const radarPlot = new Radar('redar', {
            //         data,
            //         angleField: 'item',
            //         radiusField: 'score',
            //         radiusAxis: {
            //             grid: {
            //                 alternateColor: ['rgba(0, 0, 0, 0.04)', null],
            //             },
            //         },
            //         area: {
            //             visible: false,
            //         },
            //         point: {
            //             visible: true,
            //         },
            //     });
            //     radarPlot.render();
            // }
        },
        mounted() {
        }
    }
</script>
<style>
    #page {
        display: block;
    }

    #timing,
    #star,
    #redar{
        height: 400px;
        width: 450px;
        margin-bottom: 70px;
    }

    #sum {
        margin-top: 1050px;
    }

    .left {
        float: left;
        margin: 35px;
        display: block;
    }

    .right {
        float: right;
        margin: 35px;
        display: block;
    }
</style>