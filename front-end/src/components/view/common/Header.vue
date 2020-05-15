<template>
    <div>
        <el-menu :default-active="currentIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1" @click="goCalendar">日历表</el-menu-item>
            <el-menu-item index="2" @click="goEventPool">事件池</el-menu-item>
            <el-submenu index="3">
                <template slot="title">签到</template>
                <el-menu-item index="3-1" @click="getUp">早起签到</el-menu-item>
                <el-menu-item index="3-2" @click="bed">晚睡签到</el-menu-item>
            </el-submenu>
            <el-menu-item index="4" @click="goTiming">专注计时</el-menu-item>
            <el-menu-item index="5" @click="goData">数据统计</el-menu-item>
            <el-menu-item index="6" @click="goAllMoments">圈儿</el-menu-item>
            <el-submenu index="7">
                <template slot="title">设置</template>
                <router-link to="/ViewPI">
                    <el-menu-item index="7-1">个人信息</el-menu-item>
                </router-link>
                <router-link to="/ModifyPass">
                    <el-menu-item index="7-2">密码</el-menu-item>
                </router-link>
                <el-menu-item index="7-3" @click="goLogin">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import { delKey } from '@/utils/store'
    import { post } from '@/axios/api'
    export default {
        name: 'Header',
        data() {
            return {
                currentIndex: '7',
            };
        },
        created() {
            this.selected()
        },
        methods: {
            handleSelect(key, keyPath) {
                var index = parseInt(key.substring(0, 1))
                this.currentIndex = index.toString()
                console.log(this.currentIndex)
            },
            selected() {
                let path = this.$route.path;
                console.log("当前位置 : "+path)
                var index = 1
                if (path == '/OperateCa') {
                    index = 1
                    this.currentIndex = index.toString()
                } else if (path == '/AllEvents') {
                    index = 2
                    this.currentIndex = index.toString()
                } else if (path == '/Timing') {
                    index = 4
                    this.currentIndex = index.toString()
                } else if (path == '/Data') {
                    index = 5
                    this.currentIndex = index.toString()
                } else if (path == '/AllMoments') {
                    index = 6
                    this.currentIndex = index.toString()
                } else if (path == '/ViewPI' || path == '/ModifyPI' || path == '/ModifyPass') {
                    index = 7
                    this.currentIndex = index.toString()
                }
            },
            goCalendar() {
                this.$router.push('/OperateCa')
            },
            goEventPool() {
                this.$router.push('/AllEvents')
            },
            getUp() {
                post('/apis/index/index/sign', { type: 1, time: this.time })
                    .then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.$alert("早起打卡成功，现在是" + res.data)
                    });

            },
            bed() {
                post('/apis/index/index/sign', { type: 2, time: this.time })
                    .then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.$alert("晚睡打卡成功，现在是" + res.data)
                    });

            },
            goTiming() {
                this.$router.push('/Timing')
            },
            goData() {
                this.$router.push('/Data')
            },
            goAllMoments() {
                this.$router.push('/AllMoments')
            },
            goLogin() {
                //1 登录
                this.$router.push('/Login')
                //2 删token
                delKey('token')
                //3 vuex 
                this.$store.commit('setToken', '');
            },
            // getPath() {
            //     let path = this.$route.path;
            //     console.log(path)
            // }
        }
    }
</script>
<style>
</style>