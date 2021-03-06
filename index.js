const EventEmitter = require('events');
const util = require('util');

exports = module.exports = (function () {

	function ParamChecker () {
		EventEmitter.call(this);
		this.path = 'body';
		this.debug = true;
	}

	util.inherits(ParamChecker, EventEmitter);

	ParamChecker.prototype.log = function (log) {
		if (this.debug) {
			return console.log;
		}

		return function () {};
	}

	ParamChecker.prototype.check = function (args, opts) {
		var that = this;

		return function (req, res, next) {
			var found = false;
			var obj = req[that.path];

			if (!obj) {
				console.log('Express-paramchecker object "' + that.path + '" was not found!');
				return false;
			}

			for (var i = 0; i < args.length; i++) {
				if (typeof obj[args[i]] == 'undefined') {
					found = true;
					try {
						that.emit('error', req, res, next);
					} catch (err) {
						that.log('Express-paramchecker "onerror" not defined');
						return false;
					}
					break;
				} else {
					opts = opts || {};
					if (opts.replace) {
						obj[args[i]] = opts.replace(obj[args[i]]);
					}
				}
			}

			if (!found) {
				try {
					that.emit('success', req, res, next);
				} catch (err) {
					that.log('Express-paramchecker "onsuccess" not defined.');
					that.log(err);
					return false;
				}
			}
		}
	}

	return new ParamChecker();

}).call(this);
