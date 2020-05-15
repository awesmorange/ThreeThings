<template>
    <div id="page">
        <div class="clock">
            <div class="circle">
                <div class="time">
                    <span>{{str}}</span>
                </div>
                <div class="bt">
                    <el-button id="stop" type="primary" round @click="stop">暂停</el-button>
                    <el-button id="start" type="success" round @click="start">开始</el-button>
                    <el-button id="reset" type="danger" round @click="reminder()">停止</el-button>
                </div>
            </div>
        </div>

        <el-dialog :title="reminderTitle" :visible.sync="dialogVisible">
            <el-form :model="form">
                <el-form-item label="专注名称" label-width="80px">
                    <el-input v-model="form.title" auto-complete="off" placeholder="请输入事件名称"></el-input>
                </el-form-item>
                <el-form-item label="计时时长" label-width="80px">
                    <el-input v-model="form.time" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专注程度" label-width="80px">
                    <el-rate v-model="form.value" show-text></el-rate>
                </el-form-item>
                <el-form-item label="总结" label-width="80px">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.summary">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTiming">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { post } from '@/axios/api'
    import {formatS} from '@/utils/date'
    export default {
        name: 'Timing',
        data() {
            return {
                h: 0,//定义时，分，秒，毫秒并初始化为0；
                m: 0,
                ms: 0,
                s: 0,
                stimer: null,
                str: '00:00:00',
                mytime: '',
                // 对话框信息
                dialogVisible: false,
                form: {
                    title: '',
                    value: 0,
                    summary: ''
                },
                reminderTitle: '提示',
            }
        },
        methods: {
            timer() {   //定义计时函数
                this.ms = this.ms + 50;         //毫秒
                if (this.ms >= 1000) {
                    this.ms = 0; this.s = this.s + 1;         //秒
                }
                if (this.s >= 60) {
                    this.s = 0; this.m = this.m + 1;        //分钟
                }
                if (this.m >= 60) {
                    this.m = 0; this.h = this.h + 1;        //小时
                }
                this.str = this.toDub(this.h) + ":" + this.toDub(this.m) + ":" + this.toDub(this.s) + ""/*+this.toDubms(this.ms)+"毫秒"*/;
            },

            reset() {  //重置
                this.h = 0;
                this.m = 0;
                this.ms = 0;
                this.s = 0;
                this.str = "00:00:00";
                this.stimer = null
            },

            start() {  //开始 1000 = 1s
                this.stimer = setInterval(this.timer, 50);
            },

            stop() {  //暂停
                clearInterval(this.stimer);
            },

            toDub(n) {  //补0操作
                if (n < 10) { return "0" + n; }
                else { return "" + n; }
            },

            toDubms(n) {  //给毫秒补0操作
                if (n < 10) { return "00" + n; }
                else { return "0" + n; }
            },
            // 对话框响应
            reminder() {
                let time = formatS(this.str)
                console.log(time)
                if (time > 180) {
                    this.dialogVisible = true;
                    this.reminderTitle = '恭喜你完成此次专注计时!';
                    this.form.time = this.str;
                    stop();
                }
                else {
                    this.$message({
                        message: '时间太短啦,继续专注才可以计入时长哟！',
                        type: 'error'
                    });
                }
            },
            // 保存计时信息
            saveTiming() {
                this.dialogVisible = false;
                this.stop()
                post('/apis/index/index/timeadd', 
                {
                    title: this.form.title,
                    duration:this.form.time,
                    score:this.form.value,
                    desc:this.form.summary
                }
                )
                    .then((res) => { 
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.reset();
                    });
               
            }
        }
    }
</script>
<style scoped>
    .clock {
        text-align: center;
        width: 60%;
        margin: 60px auto;
        font-size: 80px;
        float: center;
        ;
    }

    .circle {
        width: 400px;
        height: 300px;
        padding-top: 100px;
        border-radius: 200px;
        background: #ADD8E6;
    }

    .time {
        margin-top: 0px;
    }
</style>