const { types, DataValidator } = require('@first-test-base/data-validator')

class DataValidatorHelper {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	dataValidator

	/**
	 * @private
	 */
	types

	constructor() {
		this.dataValidator = DataValidator.getInstance()
		this.types = types
	}

	static getInstance() {
		if (!this.instance) this.instance = new DataValidatorHelper()
		return this.instance
	}

	validate(objInterface={}) {
		return this.dataValidator.validate(objInterface)
	}

	getTypes() {
		return this.types
	}
}

module.exports = DataValidatorHelper