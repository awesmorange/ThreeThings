<template>
    <div id="page">
        <div id="first">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'FirstPage',
        data() {
            return {
                title: '欢迎来到三件事时间管理工具首页'
            };
        }
    }
</script>
<style>
    #first {
        padding-top: 150px;
        padding-bottom: 150px;
    }
</style>