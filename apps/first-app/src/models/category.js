const { firstTestBaseMongodb } = require('@first-test-base/db-connections')
const Schema = firstTestBaseMongodb.Schema

class CategoryModel {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	categorySchema

	constructor() {
		this.categorySchema = new Schema({
			name: { type: String },
			description: { type: String },
			obj: {
				name: { type: String },
				number: { type: Number }
			},
			date: { type: Date }
		}, {
			collection: 'category'
		})
	}

	static getInstance() {
		if (!this.instance) this.instance = new CategoryModel()
		return this.instance
	}

	getModel() {
		return firstTestBaseMongodb.model('Category', this.categorySchema)
	}
}

module.exports = CategoryModel