module.exports = (grunt) ->
	grunt.initConfig
		csc:
			options:
				basedir: '.',
				outdir: 'bin'
			all:
				modules: [
					{
						name: 'mod1',
						out: 'mod1.dll',
						src: './mod1/*.cs'
					},
					{
						name: 'mod2',
						out: 'mod2.dll',
						src: './mod2/*.cs',
						deps: ['mod1']
					},
					{
						name: 'mod3',
						out: 'mod3.dll',
						src: './mod3/*.cs',
						deps: 'mod1, mod2, '
					},
					{
						name: 'mod4',
						out: 'mod4.dll',
						src: './mod4/*.cs',
						deps: ['mod2', 'mod3']
					},
					{
						name: 'mod5',
						out: 'mod5.dll',
						src: './mod5/*.cs',
						deps: 'mod1'
					},
					{
						name: 'main',
						out: 'main.exe',
						src: './main/*.cs',
						deps: 'mod1,mod4,mod5'
					}
				]

		grunt.loadTasks '../tasks'
		grunt.registerTask 'default', ['csc']
