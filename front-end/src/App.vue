<template>
  <div id="app">
    <div>
      <el-container>
        <el-header>
          三件事时间管理工具
        </el-header>
        <el-main>
          <commonheader v-if='this.$route.meta.header'></commonheader>
          <div id="container">
            <router-view />
          </div>
        </el-main>
        <el-footer>Copyright @ wlan.orange</el-footer>
      </el-container>
    </div>

  </div>
</template>

<script>
  import Header from '@/components/view/common/Header'
  import { get } from '@/axios/api'
  import { speakNow } from '@/utils/voice'
  export default {
    name: 'App',
    data() {
      return {
        list: []
      }
    },
    components: {
      commonheader: Header
    },
    created(){
      this.getList()
    },
    methods: {
      getList() {
        get('/apis/index/task/index')
          .then((res) => {
            var mydata = res.data
            this.list = mydata
          });
      },
      alarm(list) {
        console.log(list)
        var msg = speakNow(list)
        console.log("app msg : " + msg)
        if (msg != undefined) {
          var text = msg.text
          var display = msg.display
          if (display == true && display != undefined) {
            console.log(msg)
            const h = this.$createElement;
            this.$notify({
              title: '三件事提示您',
              message: h('i', { style: 'color: red' }, text),
              position: 'top-left',
              duration: 0,
              type: 'warning'
            });
          }
        }else{
          console.log("当前没有事件提醒")
        }
      }
    },
    mounted() {
      setInterval(() => {
        this.alarm(this.list);
      }, 20000)
    }
  }
</script>

<style>
  .el-header,
  .el-footer {
    background-color: #606266;
    color: rgb(228, 222, 222);
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

</style>