const DataValidatorHelper = require('../helpers/dataValidator')

class DataValidatorHandler {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	dataValidatorHelper

	constructor() {
		this.dataValidatorHelper = DataValidatorHelper.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new DataValidatorHandler()
		return this.instance
	}

	validate(objInterface={}) {
		return this.dataValidatorHelper.validate(objInterface)
	}

	getTypes() {
		return this.dataValidatorHelper.getTypes()
	}
}

module.exports = DataValidatorHandler