/**
 * Grunt配置文件
 *
 * @author zhangbiying
 * @date 2017-01-03
 */
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*/!* 文件合并 *!/
		concat: {
			// 将所有插件js合并成一个plugin.js
			dist: {
				src: ['web/public/javascript/common/plugin/!*.js'],
				dest: 'web/public/javascript/common/plugin.js',
			}
		},*/

		/* js压缩 */
		uglify: {
			dist: {
				src: [
					'js/myJs/*.js'/*,
					'web/public/javascript/common/plugin.js',
					'web/public/javascript/common/util.js'*/
				],
				dest: 'js/common.min.js',
				options: {
					banner: '/*! 页面公共类 <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				}
			}
		},

		/*/!* less插件配置 *!/
		less: {
			main: {
				expand: true,
				src: ['web/public/style/less/app.less'],
				dest: '',
				ext: '.css'
			},
			dev: {
				options: {
					compress: true,
					yuicompress: false
				}
			}
		},*/

		/*/!* css压缩插件 *!/
		cssmin: {
			target: {
				files: [{
					expand: true,
					src: ['web/public/style/less/app.css'],
					dest: '',
					ext: '.min.css'
				}]
			}
		},*/

		/* jshint插件的配置信息(js语法规整校验插件) */
		jshint: {
			build: [
				'Gruntfils.js',
				// web端
				'js/myJs/*.js'
			],
			options: {
				globals: {
					jQuery: true,
					console: true
				},
				esnext: true, // 允许ES6规范
				loopfunc: true // 允许循环中定义函数
			}
		},

		/* watch插件的配置信息（监控 js & less 文件，如修改则自动执行任务） */
		watch: {
			// 用于监听所有js文件修改，修改后进行jshint测试
			jshint: {
				files: [
					'Gruntfils.js',
					// web端
					'js/myJs/*.js'
				],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			// 用于监听公共js文件修改，修改后直接打包压缩
			commonJs: {
				files: [
					'js/myJs/*.js'
				],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		}
	});

	// 加载任务插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认被执行的任务列表
	grunt.registerTask('default', ['jshint', 'uglify', 'watch' ]);
};














