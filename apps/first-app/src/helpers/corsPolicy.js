CorsPolicy = require('@first-test-base/cors-policy')

class CorsPolicyHelper {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	corsPolicy

	/**
	 * @private
	 */
	constructor() {
		this.corsPolicy = new CorsPolicy()
	}

	static getInstance() {
		if (!this.instance) this.instance = new CorsPolicyHelper()
		return this.instance
	}

	getPolicy() {
		return this.corsPolicy.getPolicy()
	}
}

module.exports = CorsPolicyHelper