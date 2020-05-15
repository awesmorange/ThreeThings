<template>
  <div class="page">
    <h1 class="login-title">注册</h1>
    <div id="content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用愿景">
          <el-checkbox-group v-model="ruleForm.wish">
            <el-checkbox label="用作备忘录" name="wish"></el-checkbox>
            <el-checkbox label="分类待完成事件" name="wish"></el-checkbox>
            <el-checkbox label="记录学习 /工作数据" name="wish"></el-checkbox>
            <el-checkbox label="记录学习 /工作轨迹" name="wish"></el-checkbox>
            <el-checkbox label="良好的学习氛围" name="wish"></el-checkbox>
            <el-checkbox label="其他" name="wish"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="goLogin">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { get, post } from '@/axios/api'
  export default {
    name: 'Register',
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          password: '',
          checkPass: '',
          wish: []
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
            post('/apis/index/user/register', {
              name: this.ruleForm.userName,
              password: this.ruleForm.password,
              wish: this.ruleForm.wish
            })
              .then(res => {
                let mydata = res
                if (mydata.code == 200) {
                  this.$message({
                    message: mydata.msg,
                    type: 'success'
                  });
                  this.$router.push('/Login')
                } else {
                  console.log("error")
                  this.$message({
                    message: mydata.msg,
                    type: 'error'
                  });
                }
              })
          } else {
            console.log('请按正确方式提交信息!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goLogin() {
        this.$router.push('/Login')
      },
      goFirstPage() {
        this.$router.push('/FirstPage')
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