# ThreeThings
基于vue.js的时间管理工具

开发环境：win10、Chrome、nodejs、vue-cli、mysql
开发工具：VSCode

前端：front-end

1.安装python环境

2.Node.js安装配置
2.1 从官网下载Windows 64位安装(.msi)
	https://nodejs.org/en/download/
2.2 点击安装并配置PATH环境变量
2.3 检测Node.js版本：node --version

3.npm安装
命令：npm install -g npm

4.淘宝NPM 镜像
命令：npm  install  -g  cnpm  --registry=https://registry.npm.taobao.org

5.前端项目初始化
安装vue-cli：cnpm install vue-cli -g      //全局安装 vue-cli
查看vue-cli是否成功：vue list
选定目录新建项目：vue init webpack front-end
安装依赖：npm install
运行：npm run dev
浏览器访问url：localhost:8080

解读项目目录
/build	项目构建(webpack)相关代码
/config	配置目录，包括端口号等。我们初学可以使用默认的。
/node_modules	npm 加载的项目依赖模块
/src	
这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
	assets: 放置一些图片，如logo等。
	components: 目录里面放了一个组件文件，可以不用。
	App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。
	main.js: 项目的核心文件。
/static	静态资源目录，如图片、字体等。
/test	初始测试目录，可删除
.xxxx文件	这些是一些配置文件，包括语法配置，git配置等。
index.html	首页入口文件，你可以添加一些 meta 信息或统计代码啥的。
package.json	项目配置文件。
README.md	项目的说明文档，markdown 格式

前端依赖：	
			element element-ui
			@antv/data-set @antv/g2
			@fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid
			@fullcalendar/interaction @fullcalendar/vue vue-fullcalendar
			axios vue-axios

安装依赖命令：cd front-end
			npm install  element element-ui
				@antv/data-set @antv/g2
				@fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid
				@fullcalendar/interaction @fullcalendar/vue vue-fullcalendar
				axios vue-axios -s 
