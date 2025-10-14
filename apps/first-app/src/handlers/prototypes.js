const PrototypesHelper = require('../helpers/prototypes')

class PrototypesHandler {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	prototypesHelper

	/**
	 * @private
	 */
	constructor() {
		this.prototypesHelper = PrototypesHelper.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new PrototypesHandler()
		return this.instance
	}

	setCapitalize() {
		this.prototypesHelper.setCapitalize()
	}
}

module.exports = PrototypesHandler