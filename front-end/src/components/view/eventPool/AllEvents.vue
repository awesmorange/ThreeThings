<template>
    <div id="page">
        <div class="eventPool">
            <!-- 显示事件窗口 -->
            <el-table
                :data="eventList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column label="开始日期" width="170">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">
                            {{dateFormat(scope.row.start)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="事件名称" width="190">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>截止日期: {{dateFormat(scope.row.end)}}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.title }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="事件类型" width="130">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="执行地点" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-location-information"></i>
                        <span style="margin-left: 10px">{{ scope.row.address }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="事件步骤" width="250">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.step }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="right">
                    <template slot="header" slot-scope="scope">
                        <el-button size="mini" type="success" @click="addEvent">添加</el-button>
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加事件对话窗口 -->
        <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
            <el-form :model="form">
                <el-form-item label="事件名称" label-width="80px">
                    <el-input v-model="form.title" auto-complete="off" placeholder="请输入事件名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEvent">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑事件对话窗口 -->
        <el-dialog :title="editTitle" :visible.sync="dialogEditVisible">
            <el-form :model="form">
                <el-form-item label="事件名称" label-width="80px">
                    <el-input v-model="form.title" auto-complete="off" placeholder="请输入事件名称"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" label-width="80px">
                    <el-date-picker v-model="form.start" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" label-width="80px">
                    <el-date-picker v-model="form.end" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="执行地点" label-width="80px">
                    <el-input v-model="form.address" placeholder="选择地点"></el-input>
                </el-form-item>
                <el-form-item label="事件类型" label-width="80px">
                    <el-select v-model="form.type" placeholder="选择类型">
                        <el-option label="两分钟内可以完成"  value="两分钟内可以完成"></el-option>
                        <el-option label="单步事件"  value="单步事件"></el-option>
                        <el-option label="异步事件"  value="异步事件"></el-option>
                        <el-option label="参考资料"  value="参考资料"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事件步骤" label-width="80px">
                    <el-input v-model="form.step" type="textarea" row="6" placeholder="填入步骤，步骤之间用英文分号隔开"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEvent()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import { post, get } from '@/axios/api'
    import { speakToday } from '@/utils/voice'
    import { formatTime } from '@/utils/date'
    export default {
        name: 'AllEvents',
        data() {
            return {
                eventList: [],
                search: '',
                // 对话框
                dialogAddVisible: false,
                dialogEditVisible: false,
                form: {
                    title: '',
                    start: '',
                    end: '',
                    type: '',
                    address: '',
                    isCompeleted: ''
                },
                addTitle: '添加事件',
                editTitle: '编辑事件',
            }
        },
        created() {
            this.getEventsList();
        },
        methods: {
            // 获取信息
            getEventsList(info) {
                get('/index/task/index')
                    .then((res) => {
                        var mydata = res.data.reverse()
                        this.eventList = mydata;
                        // 播报今日事件
                        speakToday(mydata)
                    });
            },
            // 对话框响应
            addEvent() {
                this.dialogAddVisible = true;
                this.addTitle = '新增事件';
                this.form.title = '';
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.dialogEditVisible = true;
                this.addTitle = '编辑事件';
                this.form = row;
            },
            saveEvent() {
                post('/index/task/add', this.form)
                    .then((res) => {
                        if (this.form.id === undefined || this.form.id == '') { //新增
                            this.form.id = res.data;
                            this.eventList.push(this.form);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.dialogAddVisible = false;
                        } else { //修改
                            this.eventList.forEach((item, index, arr) => {
                                if (item.id == this.form.id) {
                                    arr[index].title = this.form.title
                                    arr[index].start = this.form.start
                                    arr[index].end = this.form.end
                                }
                            });
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.dialogEditVisible = false;
                        }
                    });
            },
            handleDelete(index, row) {
                console.log(index, row);
                post('/index/task/del', { id: row.id })
                    .then((res) => {
                        this.eventList.forEach((item, index, arr) => {
                            if (item.id == row.id) {
                                arr.splice(index, 1);
                            }
                        });
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    });
            },
            // 2020-04-07T16:00:00.000Z日期格式为 YYYY-MM-DD hh:mm
            dateFormat(date) {
                if(date == ''){
                    return ''
                }
                var d = formatTime(date)
                var time = d.day +" "+ d.time
                return time
            }
        }
    }
</script>