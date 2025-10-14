CorsPolicyHelper = require('../helpers/corsPolicy')

class CorsPolicyHandler {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	corsPolicyHelper

	/**
	 * @private
	 */
	constructor() {
		this.corsPolicyHelper = new CorsPolicyHelper()
	}

	static getInstance() {
		if (!this.instance) this.instance = new CorsPolicyHandler()
		return this.instance
	}

	getPolicy() {
		return this.corsPolicyHelper.getPolicy()
	}
}

module.exports = CorsPolicyHandler