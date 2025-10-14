const DataValidatorHandler = require('../handlers/dataValidator')
  
class CategoryInterfaces {
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
			description: { type: this.types.string, optional: true },
			obj: {
				type: this.types.object,
				structure: {
					name: { type: this.types.string, optional: true },
					number: { type: this.types.number, optional: true }
				},
				optional: true
			},
			date: { type: this.types.date, optional: true }
		})
  
		this.updateInterface = this.dataValidatorHandler.validate({
			name: { type: this.types.string, optional: true },
			description: { type: this.types.string, optional: true },
			obj: {
				type: this.types.object,
				structure: {
					name: { type: this.types.string, optional: true },
					number: { type: this.types.number, optional: true }
				},
				optional: true
			},
			date: { type: this.types.date, optional: true }
		})
  
		this.queryInterface = this.dataValidatorHandler.validate({
			_id: { type: this.types.objectId, optional: true, transform: true, allowAdvance: true },
			name: { type: this.types.string, optional: true, transform: true, allowAdvance: true },
			description: { type: this.types.string, optional: true, transform: true, allowAdvance: true },
			obj: {
				type: this.types.object,
				structure: {
					name: { type: this.types.string, optional: true, transform: true, allowAdvance: true },
					number: { type: this.types.number, optional: true, transform: true, allowAdvance: true }
				},
				optional: true
			},
			date: { type: this.types.date, optional: true, transform: true, allowAdvance: true }
		})
  
		this.virtualsInterface = this.dataValidatorHandler.validate({
			_id: { type: this.types.string, optional: true, isVirtual: true },
			name: { type: this.types.string, optional: true, isVirtual: true },
			description: { type: this.types.string, optional: true, isVirtual: true },
			obj: {
				type: this.types.object,
				structure: {
					name: { type: this.types.string, optional: true, isVirtual: true },
					number: { type: this.types.number, optional: true, isVirtual: true }
				},
				optional: true, canBeVirtual: true
			},
			date: { type: this.types.date, optional: true, isVirtual: true }
		})
  
		this.relationsInterface = this.dataValidatorHandler.validate({

		})
	}

	static getInstance() {
		if (!this.instance) this.instance = new CategoryInterfaces()
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

module.exports = CategoryInterfaces