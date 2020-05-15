import { nowTime, formatTime } from '@/utils/date'

// 文字转语音
export function speak(text) {
	var v = new SpeechSynthesisUtterance();
	v.text = text;
	//中文
	v.lang = 'zh';
	v.rate = 0.7;
	speechSynthesis.speak(v);
}

// 播报当日事件
export function speakToday(mydata) {
	var now = nowTime()
	var whichDay = now.day
	var whichTime = now.time
	var nowDayTime = whichDay + " " + whichTime
	console.log(nowDayTime)

	speak('当前时间' + nowDayTime + ',今天的事件有')
	for (var i = 0; i < mydata.length; i++) {
		var inDT = formatTime(mydata[i].start)
		var inDay = inDT.day
		var inTime = inDT.time
		if (inDay == whichDay) {
			var text =inTime + '开始' + mydata[i].title + ','
			speak(text)
		}
	}
}

// 播报当前事件
export function speakNow(mydata) {
	var now = nowTime()
	var whichDay = now.day
	var whichTime = now.time
	var nowDayTime = whichDay + " " + whichTime
	console.log(nowDayTime)
	for (var i = 0; i < mydata.length; i++) {
		var inDT = formatTime(mydata[i].start)
		var inDay = inDT.day
		var inTime = inDT.time
		if (inDay == whichDay && inTime == whichTime) {
			var t = '您在' + inTime + '安排日程' + mydata[i].title + '!'
			var address = mydata[i].address
			var step = mydata[i].step
			var detail = ''
			if (address != '' && step != '') {
				detail = '在' + address + '执行,执行步骤:' + step
			} else if (address != '' && step == '') {
				detail = '执行步骤:' + step
			} else if (address == '' && step != '') {
				detail = '在' + address + '执行'
			}
			var text = t + detail
			speak('三件事提示您,' + text)			
			var msg = {text:text,display:true}
			console.log("voice now msg : "+msg)
			return msg
		}
	}
}
