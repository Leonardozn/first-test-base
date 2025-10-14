const { firstTestBaseMongodb } = require('@first-test-base/db-connections')
const Schema = firstTestBaseMongodb.Schema

class SubcategoryModel {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	subcategorySchema

	constructor() {
		this.subcategorySchema = new Schema({
			name: { type: String },
			category: { type: Schema.Types.ObjectId, ref: 'Category' }
		}, {
			collection: 'subcategory'
		})
	}

	static getInstance() {
		if (!this.instance) this.instance = new SubcategoryModel()
		return this.instance
	}

	getModel() {
		return firstTestBaseMongodb.model('Subcategory', this.subcategorySchema)
	}
}

module.exports = SubcategoryModel