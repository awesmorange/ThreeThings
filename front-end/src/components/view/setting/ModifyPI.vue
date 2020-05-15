<template>
    <div class="page">
        <h1 class="login-title">修改个人信息</h1>
        <div id="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="ruleForm.sex" v-for="(item, index) in sexData" :key="index">
                        <el-radio :label="index">{{item}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model.number="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="职业">
                    <el-select v-model="ruleForm.occupation" placeholder="请选择你的职业">
                        <el-option v-for="(item, index) in occData" :key="index"  :label="item"  :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教育背景">
                    <el-select v-model="ruleForm.education" placeholder="请选择教育背景">
                        <el-option v-for="(item, index) in eduData" :key="index"  :label="item"  :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { get, post } from '@/axios/api'
    export default {
        name: 'ModifyPI',
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName: '',
                    sex: '',
                    email: '',
                    occupation: '',
                    education: '',
                    desc: ''
                },
                sexData: [],
                occData: [],
                eduData: [],
                rules: {
                    name: [{ validator: checkName, trigger: 'blur' }]
                }
            };
        },
        created() {
            this.getdata(),
                this.getDetail()
        },
        methods: {
            getdata() {
                get("/apis/index").then(res => {
                    let mydata = res
                    console.log(mydata)
                    this.ruleForm.userName = mydata.name,
                        this.ruleForm.sex = mydata.sex,
                        this.ruleForm.email = mydata.email,
                        this.ruleForm.occupation = mydata.occupation,
                        this.ruleForm.education = mydata.edu,
                        this.ruleForm.desc = mydata.desc
                })
            },
            getDetail() {
                get("/apis/index/user/infoconfig").then(res => {
                    let mydata = res.data
                    this.sexData = mydata.sex
                    this.occData = mydata.occ
                    this.eduData = mydata.edu
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        post('/apis/index/index/editinfo', {
                            sex: this.ruleForm.sex,
                            email: this.ruleForm.email,
                            occ: this.ruleForm.occupation,
                            edu: this.ruleForm.education,
                            desc: this.ruleForm.desc
                        })
                            .then(res => {
                                let mydata = res
                                if (mydata.code == 200) {
                                    this.$message({
                                        message: mydata.msg,
                                        type: 'success'
                                    });
                                    this.$router.push('/ViewPI')
                                } else {
                                    this.$message({
                                        message: mydata.msg,
                                        type: 'error'
                                    });
                                }
                            })
                    } else {
                        console.log('error submit!!');
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