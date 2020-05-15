<template>
  <div class="page">
    <h1 class="login-title">查看个人信息</h1>
    <div id="content">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="ruleForm.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="ruleForm.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="ruleForm.occupation" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教育背景">
          <el-input v-model="ruleForm.education" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="ruleForm.desc" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goModifyPI">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { get } from '@/axios/api'
  export default {
    name: 'ViewPI',
    data() {
      return {
        ruleForm: {
          userName: '',
          sex: '',
          email: '',
          occupation: '',
          education: '',
          desc: ''
        },
      };
    },
    created() {
      this.getdata();
    },
    methods: {
      getdata() {
        get("/apis/index").then(res => {
          let mydata = res
          console.log(res)
          if(mydata.sex == 1){
            this.ruleForm.sex = '男'
          }else if(mydata.sex == 2){
            this.ruleForm.sex = '女'
          }else{
            this.ruleForm.sex = ''
          }
          this.ruleForm.userName = mydata.name,
            
            this.ruleForm.email = mydata.email,
            this.ruleForm.occupation = mydata.occupation,
            this.ruleForm.education = mydata.edu,
            this.ruleForm.desc = mydata.desc
        })
      },
      goModifyPI() {
        this.$router.push('/ModifyPI')
      }
    }
  }
</script>

<style>
  .login-title {
    font: 26px "Helvetica Neue";
    letter-spacing: 5px;
    text-align: center;
    font-weight: bold;
  }
</style>