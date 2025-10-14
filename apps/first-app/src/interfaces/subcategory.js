const DataValidatorHandler = require('../handlers/dataValidator')
  
class SubcategoryInterfaces {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	dataValidatorHandler

	/**
	 * @private
	 */
	createInterface

	/**
	 * @private
	 */
	updateInterface

	/**
	 * @private
	 */
	queryInterface

	/**
	 * @private
	 */
	virtualsInterface

	/**
	 * @private
	 */
	relationsInterface

	/**
	 * @private
	 */
	types

	constructor() {
		this.dataValidatorHandler = DataValidatorHandler.getInstance()
		this.types = this.dataValidatorHandler.getTypes()

		this.createInterface = this.dataValidatorHandler.validate({
			name: { type: this.types.string, optional: true },
			category: { type: this.types.objectId, optional: true }
		})
  
		this.updateInterface = this.dataValidatorHandler.validate({
			name: { type: this.types.string, optional: true },
			category: { type: this.types.objectId, optional: true }
		})
  
		this.queryInterface = this.dataValidatorHandler.validate({
			_id: { type: this.types.objectId, optional: true, transform: true, allowAdvance: true },
			name: { type: this.types.string, optional: true, transform: true, allowAdvance: true },
			category: { type: this.types.objectId, optional: true, transform: true }
		})
  
		this.virtualsInterface = this.dataValidatorHandler.validate({
			_id: { type: this.types.string, optional: true, isVirtual: true },
			name: { type: this.types.string, optional: true, isVirtual: true },
			category: { type: this.types.objectId, optional: true, isVirtual: true }
		})
  
		this.relationsInterface = this.dataValidatorHandler.validate({
			category: { type: this.types.string, optional: true, isVirtual: true }
		})
	}

	static getInstance() {
		if (!this.instance) this.instance = new SubcategoryInterfaces()
		return this.instance
	}
	
	getCreateInterface() {
		return this.createInterface
	}

	getUpdateInterface() {
		return this.updateInterface
	}

	getQueryInterface() {
		return this.queryInterface
	}

	getVirtualsInterface() {
		return this.virtualsInterface
	}

	getRelationsInterface() {
		return this.relationsInterface
	}
}

module.exports = SubcategoryInterfaces