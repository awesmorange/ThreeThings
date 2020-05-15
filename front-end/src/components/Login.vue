<template>
  <div class="page">
    <h1 class="login-title">登录</h1>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="goRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { post } from '@/axios/api'
  import { setKey } from '@/utils/store'

  export default {
    name: 'Login',
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          callback();
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          userName: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            post('/apis/index/user/login', {
              name: this.ruleForm.userName,
              password: this.ruleForm.password
            })
              .then(mydata => {
                this.$message({
                  message: mydata.msg,
                  type: 'success'
                });
                // 1.vuex
                this.$store.commit('setToken', mydata.data);
                // 2.设置token值
                setKey('token', mydata.data)
                // 3.跳转到首页
                this.$router.push('/FirstPage')
              }).catch()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goRegister() {
        this.$router.push('/Register')
      }
    },
    computed: {
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