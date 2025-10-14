const { RequestLogger, modes } = require('@first-test-base/request-logger')

class RequestLoggerHelper {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	modes

	/**
	 * @private
	 */
	requestLogger

	/**
	 * @private
	 */
	constructor() {
		this.modes = modes
		this.requestLogger = new RequestLogger()
	}

	static getInstance() {
		if (!this.instance) this.instance = new RequestLoggerHelper()
		return this.instance
	}

	getModes() {
		return this.modes
	}

	getLogger(mode) {
		return this.requestLogger.getLogger(mode)
	}
}

module.exports = RequestLoggerHelper