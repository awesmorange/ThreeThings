<template>
    <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item index="/OperateCa">日历表</el-menu-item>
            <el-menu-item index="/AllEvents">事件池</el-menu-item>
            <el-submenu index="3">
                <template slot="title">签到</template>
                <el-menu-item @click="getUp">早起签到</el-menu-item>
                <el-menu-item @click="bed">晚睡签到</el-menu-item>
            </el-submenu>
            <el-menu-item index="/Timing">专注计时</el-menu-item>
            <el-menu-item index="/Data">数据统计</el-menu-item>
            <el-menu-item index="/AllMoments">圈儿</el-menu-item>
            <el-submenu index="7">
                <template slot="title">设置</template>
                <el-menu-item index="/ViewPI">个人信息</el-menu-item>
                <el-menu-item index="/ModifyPass">密码</el-menu-item>
                <el-menu-item @click="goLogin">退出登录</el-menu-item>
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
            };
        },
        methods: {
            getUp() {
                post('/index/index/sign', { type: 1, time: this.time })
                    .then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.$alert("早起打卡成功，现在是" + res.data)
                    });

            },
            bed() {
                post('/index/index/sign', { type: 2, time: this.time })
                    .then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.$alert("晚睡打卡成功，现在是" + res.data)
                    });

            },
            goLogin() {
                //1 登录
                this.$router.push('/Login')
                //2 删token
                delKey('token')
                //3 vuex 
                this.$store.commit('setToken', '');
            }
        }
    }
</script>
<style>
</style>