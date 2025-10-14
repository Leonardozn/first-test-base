const HandleResponseHelper = require('../helpers/handleResponse')

class HandleResponseHandler {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	handleResponseHelper

	/**
	 * @private
	 */
	constructor() {
		this.handleResponseHelper = HandleResponseHelper.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new HandleResponseHandler()
		return this.instance
	}

	getResponseBody() {
		return this.handleResponseHelper.getResponseBody()
	}

	getExampleResponseFormat(status) {
		return this.handleResponseHelper.getExampleResponseFormat(status)
	}

	buildResponse(data) {
		return this.handleResponseHelper.buildResponse(data)
	}
}

module.exports = HandleResponseHandler