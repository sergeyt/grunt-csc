module.exports = function(grunt){

	var csc = require('csc.js'),
		Q = require('q'),
		async = require('async'),
		path = require('path'),
		format = require('util').format,
		_ = require('lodash');

	var trim = ''.trim
		? function(s){ return s.trim(); }
		: function(s){ return s.replace(/^\s+|\s+$/g, ""); };

	function log(){
		var msg = format.apply(null, _.toArray(arguments));
		grunt.log.writeln('csc: ' + msg);
	}

	function createUnit(options, m){

		var mod = m;
		var defer = Q.defer();
		var units;
		var deps = []; // dep units

		mod.nologo = true;

		// prepend outdir
		if (options.outdir){
			mod.out = path.join(options.outdir, mod.out);
		}

		// TODO prepend basedir to src

		// convert module.deps to array
		function depsArray(){
			if (typeof mod.deps === 'string'){
				return mod.deps.split(/[,;]/).map(trim).filter(_.identity);
			}
			return (mod.deps || []).map(trim).filter(_.identity);
		}

		function compile(){
			log('compiling module %s', mod.name);

			// convert deps to refs
			mod.refs = deps.map(function(d){
				return d.module.out;
			});

			csc(mod, function(err, res){
				if (res){
					res.stdout && grunt.log.writeln(res.stdout);
					res.stderr && grunt.log.writeln(res.stderr);
				}
				if (err) {
					grunt.log.error(err);
					defer.reject(err);
				} else {
					defer.resolve(mod);
				}
			});
		}

		function run(list){
			log('running module %s', mod.name);

			units = list;

			// resolve dep units
			deps = depsArray().map(function(name){
				var d = _.find(units, function(u){ return u.name == name; });
				if (!d){
					return { name: name };
				}
				return d;
			});

			var depPromises = deps.map(function(d){
				if (!d.promise) {
					return Q.reject('unable to resolve module ' + d.name);
				}
				return d.promise;
			});

			// wait deps then compile
			Q.all(depPromises)
				.then(compile)
				.fail(function(err){
					defer.reject(err);
				});
		}

		return {
			module: mod,
			name: mod.name,
			promise: defer.promise,
			run: run
		};
	}

	function taskFn(u, units){
		var unit = u;
		return function(callback){
			unit.promise.then(function(){
				callback(null, unit.name);
			});
			unit.promise.fail(function(err){
				callback(err, null);
			});
			unit.run(units);
		};
	}

	grunt.registerMultiTask('csc', 'Compile c# assemblies', function(){

		var done = this.async();
		var options = this.options();
		var modules = this.data.modules || [];

		// build module units
		var units = modules.map(function(m){
			return createUnit(options, m);
		});

		// create async tasks
		var tasks = units.map(function(u){
			return taskFn(u, units);
		});

		async.parallel(tasks, function(){
			done();
		});
	});
}