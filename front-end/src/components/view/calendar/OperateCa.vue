<template>
    <div id="page">
        <!-- 日历表显示部分 -->
        <div class="calendar">
            <FullCalendar defaultView="dayGridMonth" locale="zh-cn" timeZone="local" firstDay="1"
                weekNumberCalculation="ISO" editable="true" droppable="true" displayEventEnd="true"
                :eventTimeFormat="evnetTime" :header="header" :plugins="calendarPlugins" :events="calendarEvents"
                @dateClick="handleDateClick" @eventClick="handleEventClick" @eventDrop="calendarEventDrop"
                @datesRender="handleDatesRender" weekNumbers="true" />       
        </div>
        <!-- 新增、修改弹窗 -->
        <el-dialog :title="optTitle" :visible.sync="dialogFormVisible">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" @click="delEvent" v-if="form.id" style="float: left;">删 除</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEvent">确 定</el-button>
            </div>
        </el-dialog>
       
    </div>
    
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
    import '@fullcalendar/core/main.css';
    import '@fullcalendar/daygrid/main.css';
    import '@fullcalendar/timegrid/main.css';
    import { post, get } from '@/axios/api'
    export default {
        name: 'OperateCa',
        components: {
            FullCalendar
        },
        data() {
            return {
                calendarPlugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ],
                header: {
                    left: 'today prevYear prev',
                    center: 'title',
                    right: 'next nextYear dayGridMonth,timeGridWeek,timeGridDay'
                },
                evnetTime: {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                },
                calendarEvents: [],
                calendarEventDrop: info => {
                    this.dropEvent(info);
                },
                handleDatesRender: arg => {
                    this.getEventsList(arg.view)
                },
                dialogFormVisible: false,
                form: {
                    title: null,
                    start: null,
                    end: null
                },
                optTitle: '添加事件',
            }
        },
        mounted() {

        },
        created() {

        },
        methods: {
            getEventsList(info) {
                let params = {
                    start: info.activeStart,
                    end: info.activeEnd
                };
                get('/apis/index/task/index', params)
                    .then((res) => {
                        this.calendarEvents = res.data;
                    });
            },
            handleDateClick(arg) {
                this.dialogFormVisible = true;
                this.optTitle = '新增事件';
                this.form.title = '',
                    this.form.id = '',
                    this.form.start = arg.date,
                    this.form.end = arg.date;
            },
            handleEventClick(info) {
                info.el.style.borderColor = 'red';
                this.dialogFormVisible = true;
                this.optTitle = '修改事件';
                this.form = {
                    id: info.event.id,
                    title: info.event.title,
                    start: info.event.start,
                    end: info.event.end || info.event.start,
                };
            },
            saveEvent() {
                post('/apis/index/task/add', this.form)
                    .then((res) => {
                        if (this.form.id === undefined || this.form.id == '') { //新增
                            this.form.id = res.data;
                            this.calendarEvents.push(this.form);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        } else { //修改
                            this.calendarEvents.forEach((item, index, arr) => {
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
                        }
                        this.dialogFormVisible = false;
                    });
            },
            //删除事件
            delEvent() {
                post('/apis/index/task/del', { id: this.form.id })
                    .then((res) => {
                        this.calendarEvents.forEach((item, index, arr) => {
                            if (item.id == this.form.id) {
                                arr.splice(index, 1);
                            }
                        });
                        this.dialogFormVisible = false;
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    });
            },
            //拖动事件
            dropEvent(info) {
                this.form = {
                    id: info.event.id,
                    title: info.event.title,
                    start: info.event.start,
                    end: info.event.end
                };
                this.saveEvent();
            }
        }
    }
</script>
<style>
    .calendar {
        margin: 10px;
        text-align: center;
        background: #fff;
        padding: 10px;
    }
</style>