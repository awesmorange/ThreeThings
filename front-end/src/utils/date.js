/* 获取当前时间
/* Sat May 02 2020 10:35:27 GMT+0800 (中国标准时间)
/* 格式为YYYY-MM-DD hh:mm  */
export function nowTime() {
  var date = new Date();
  console.log(date)
  // 日期
  var mon = (date.getMonth() + 1) < 10 ? "-0" + (date.getMonth() + 1) : "-" + (date.getMonth() + 1)
  var day = date.getDate() < 10 ? "-0" + date.getDate() : "-" + date.getDate()
  var whichDay = date.getFullYear() + mon + day
  // 钟点
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  var mini = date.getMinutes() < 10 ? ":0" + date.getMinutes() : ":" + date.getMinutes()
  //var secd = date.getSeconds() < 10 ? ":0" + date.getSeconds() : ":" + date.getSeconds()
  var whichTime = hour + mini

  var nowTime = { day: whichDay, time: whichTime }
  //console.log(nowTime)
  return nowTime;
}

//2020-04-07T16:00:00.000Z日期格式为 YYYY-MM-DD hh:mm
export function formatTime(date) {
  var h = parseInt(date.substring(11, 13)) + 8
  var d = parseInt(date.substring(8, 10))
  var day = d < 10 ? "0" + d : d

  var hour;
  if (h < 10) {
    hour = "0" + h
  } else if (h >= 24) {
    hour = (h - 24) < 10 ? "0" + (h - 24) : (h - 24)
    day = (d + 1) < 10 ? "0" + (d + 1) : (d + 1)
  } else {
    hour = h
  }
  var inDay = date.substring(0, 8) + day
  var inTime = hour + date.substring(13, 16)

  var nowTime = { day: inDay, time: inTime }
  return nowTime;

}

//将计时hh:mm:ss格式转为分钟
export function formatM(dur) {
  var minutes = (parseInt(dur.substring(0, 2)) * 3600
    + parseInt(dur.substring(3, 5)) * 60
    + parseInt(dur.substring(6, 8))) / 60
  minutes = parseInt(parseFloat(minutes).toFixed(2))
  return minutes;
}

//将计时hh:mm:ss格式转为秒
export function formatS(dur) {
  var secd = parseInt((dur.substring(0, 2)) * 3600)
    + parseInt((dur.substring(3, 5)) * 60)
    + parseInt(dur.substring(6, 8))
  return secd;
}