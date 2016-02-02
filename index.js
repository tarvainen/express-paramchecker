const EventEmitter = require('events');
const util = require('util');

exports = module.exports = (function () {

	function ParamChecker (path) {
		EventEmitter.call(this);
		this.path = path || 'body';
	}

	util.inherits(ParamChecker, EventEmitter);

	ParamChecker.prototype.check = function () {
		var args = arguments;
		var that = this;

		return function (req, res, next) {
			var found = false;
			var obj = eval('req.' + that.path);

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
						console.log('Express-paramchecker "onerror" not defined');
						return false;
					}
					break;
				}
			}

			if (!found) {
				try {
					that.emit('success', req, res, next);
				} catch (err) {
					console.log('Express-paramchecker "onsuccess" not defined');
					return false;
				}
			}
		}
	}

	return new ParamChecker();

}).call(this);
