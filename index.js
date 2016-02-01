exports = module.exports = (function () {

	function ParamChecker (opts) {
		this.setup(opts);
	}

	ParamChecker.prototype.setup = function (opts) {
		opts = opts || {};
		this.path = opts.path || 'body';
		this.status = opts.status || 400;
		this.error = opts.error || { msg: 'Parameters missing!', success: false };
	}

	ParamChecker.prototype.check = function () {
		var args = arguments;
		var that = this;

		return function (req, res, next) {
			var found = false;
			var obj = eval('req.' + that.path);

			if (!obj) {
				throw 'Required object ' + that.path + ' was not found from the request.';
				return false;
			}

			for (var i = 0; i < args.length; i++) {
				if (typeof obj[args[i]] == 'undefined') {
					res.status(that.status).send(that.error);
					found = true;
					break;
				}
			}

			if (!found) {
				next();
			}
		}
	}

	return new ParamChecker();
}).call(this);
