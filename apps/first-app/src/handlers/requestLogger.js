const RequestLoggerHelper = require('../helpers/requestLogger')

class RequestLoggerHandler {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	requestLoggerHelper

	/**
	 * @private
	 */
	constructor() {
		this.requestLoggerHelper = RequestLoggerHelper.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new RequestLoggerHandler()
		return this.instance
	}

	getModes() {
		return this.requestLoggerHelper.getModes()
	}

	getLogger(mode) {
		return this.requestLoggerHelper.getLogger(mode)
	}
}

module.exports = RequestLoggerHandler