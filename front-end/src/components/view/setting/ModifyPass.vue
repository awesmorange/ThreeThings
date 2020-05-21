<template>
  <div class="page">
    <h1 class="login-title">修改密码</h1>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原始密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { delKey } from '@/utils/store'
  import { get, post } from '@/axios/api'
  export default {
    name: 'ModifyPass',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原始密码'));
        } 
        else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } 
        else {
          if (this.ruleForm.newpassword !== '') {
            this.$refs.ruleForm.validateField('repassword');
          }
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          newpassword: '',
          repassword: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          repassword: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            post('/index/index/repass', {
              password: this.ruleForm.password,
              newpassword: this.ruleForm.newpassword,
              repassword: this.ruleForm.repassword
            })
              .then(res => {
                this.$message({
                  message: res.msg,
                  type: res.code == 200 ? 'success' : 'error'
                });
                if (res.code == 200) {
                  this.$router.push('/FirstPage')
                }
              })
          } else {
            this.$message({
              message: '请按正确方式提交信息',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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