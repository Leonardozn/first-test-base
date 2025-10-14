const Prototypes = require('@first-test-base/prototypes')

class PrototypesHelper {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	prototypes

	/**
	 * @private
	 */
	constructor() {
		this.prototypes = new Prototypes()
	}

	static getInstance() {
		if (!this.instance) this.instance = new PrototypesHelper()
		return this.instance
	}

	setCapitalize() {
		this.prototypes.setCapitalize()
	}
}

module.exports = PrototypesHelper