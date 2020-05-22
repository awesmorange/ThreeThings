<template>
  <div id="page">
    <div class="container">
      <h1>{{title}}</h1>
      <el-button type="primary" round @click="addMoment">上传动态<i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <router-link to="/AllMoments">
        <el-button type="success" round>朋友圈儿</el-button>
      </router-link>
      <el-divider></el-divider>
      <div class="block">
        <!-- 动态展示区域 -->
        <el-timeline>
          <el-timeline-item v-for="(item,index) in momentList" :key="item.id" placement="top" color="CadetBlue">
            <el-row>
              <el-col :span="24">
                <div id="title-left">
                  <div class="el-icon-user" id="icon"></div>
                  <span class="big">{{item.name}}</span>
                  <span class="small">{{item.day}}</span>
                </div>
                <div id="title-right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="editMoment(index)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle @click="delMo(item.id)"></el-button>
                </div>
              </el-col>
              <el-col :span="24">
                <el-card>
                  <div id="content">
                    <p class="middle">{{ item.content }}</p>
                    <div class="block">
                      <el-image style="width: 20%; height: 20%" v-if="item.image" :src="item.image">
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span> </div>
                      </el-image>
                    </div>
                    </el-image>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 上传、修改动态内容 -->
      <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
        <el-form :model="form" method="post" enctype="multipart/form-data" id="uploadForm">
          <el-form-item label="动态内容" label-width="80px">
            <el-input type="textarea" row="6" v-model="form.content" auto-complete="off" placeholder="请输入事件名称">
            </el-input>
          </el-form-item>
          <input type="file" name="image" ref="imgInput"  @change="upload($event)">
        </el-form>
        <br>
        *仅支持jpg、png格式，上传成功后才能成功添加到动态哟~
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveMoment">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import { post, get } from '@/axios/api'
  export default {
    name: 'MyMoments',
    data() {
      return {
        title: '我的圈儿',
        imgurl: '',
        srcList: [],
        // 对话框
        dialogAddVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          content: '',
          id: '',
          imgurl: ''
        },
        addTitle: '上传动态',
        momentList: []
      }
    },
    created() {
      this.getMosList()
    },
    methods: {
      upload(e){
        let uploadForm=document.getElementById("uploadForm");
        var files = e.target.files[0];
        let formData = new FormData(uploadForm); 
        formData.append('image', files);
        this.$axios.post('/index/user/uploadImg', formData)
          .then((res) => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == 200 ? 'success' : 'error'
            });
            if(res.data.code == 200) this.form.imgurl = res.data.data
          });
      },
      getMosList(info) {
        get('/index/moment/index')
          .then((res) => {
            this.momentList = res.data.reverse();
          });
      },
      saveMoment() { //增加、修改
        post('/index/moment/add', this.form)
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            if (!this.form.id) { //新增
              this.form.id = res.data;
              this.momentList.unshift(this.form)
            } else { //修改 
              for (let i = 0; i < this.momentList.length; i++) {
                if (this.momentList[i].id == this.form.id) {
                  this.momentList[i].content = this.form.content
                }
              }
            }
            this.dialogAddVisible = false;
          });
      },
      editMoment(index) {
        let item = this.momentList[index]
        console.log(item)
        this.dialogAddVisible = true;
        this.addTitle = '修改动态';
        this.form.content = item.content;
        this.form.id = item.id
      },
      delMo(id) {
        post('/index/moment/del', { id: id })
          .then((res) => {
            this.momentList.forEach((item, index, arr) => {
              if (item.id == id) {
                arr.splice(index, 1);
              }
            });
            this.dialogAddVisible = false;
            this.$message({
              message: res.msg,
              type: 'success'
            });
          });
      },
      // 对话框响应
      addMoment() {
        this.dialogAddVisible = true;
        this.addTitle = '上传动态';
        this.form.content = '';
        this.form.id = ''
      }
    }
  }
</script>

<style>
  #title-left {
    float: left;
    margin-left: 10px;
    margin-bottom: 15px;
  }

  #title-right {
    float: right;
    margin-right: 50px;
    margin-bottom: 15px;
  }

  #icon {
    font-size: 25px;
    margin-right: 16px;
  }

  .big {
    font-size: 20px;
  }

  .middle {
    font-size: 16px;
    color: dimgrey;
  }

  .small {
    font-size: 12px;
    color: darkgray;
  }

  #content {
    margin-top: 0px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }
</style>