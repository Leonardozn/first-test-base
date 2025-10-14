const { ResponseBody, HandleResponse } = require('@first-test-base/handle-response')

class HandleResponseHelper {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	handleResponse

	/**
	 * @private
	 */
	constructor() {
		this.handleResponse = new HandleResponse()
	}

	static getInstance() {
		if (!this.instance) this.instance = new HandleResponseHelper()
		return this.instance
	}

	getResponseBody() {
		return ResponseBody
	}

	getExampleResponseFormat(status) {
		return this.handleResponse.getExampleResponseFormat(status)
	}

	buildResponse(data) {
		return this.handleResponse.buildResponse(data)
	}
}

module.exports = HandleResponseHelper