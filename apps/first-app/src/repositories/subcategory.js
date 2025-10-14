const { MongooseEntityQueries } = require('@first-test-base/entity-queries')
const SubcategoryModel = require('../models/subcategory')

class SubcategoryRepository {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	model

	/**
	 * @private
	 */
	mongooseEntityQueries

	constructor() {
		this.model = SubcategoryModel.getInstance().getModel()
		this.mongooseEntityQueries = MongooseEntityQueries.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new SubcategoryRepository()
		return this.instance
	}

	/**
	 * Save and return an object or an array of objects saved.
	 * @param { Object } Entity - The entity object.
	 * @param { Object|Object[] } data - The data to save (optional: Object or an array of objects).
	 * @returns { Object|Object[] } An object or an array of objects.
	 */
	async add(data) {
		return await this.mongooseEntityQueries.add(this.model, data)
	}

	/**
	 * Returns an object with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @returns { Object } An object.
	 */
	async findOne(id) {
		return await this.mongooseEntityQueries.findOne(this.model, id)
	}

	/**
	 * Returns an array of objects.
	 * @param { Object } Entity - The entity object.
	 * @param { Object } query - An object with the query to search.
	 * @param { Object } virtuals - An object with the unique fields in each record.
	 * @param { Object } relations - An object indicating the relations about which information is wanted.
	 * @param { Number } size - The amount of records.
	 * @param { Number } page - The batch with an amount of records.
	 * @returns { Object[] } An array of objects.
	 */
	async list(query, virtuals, relations, size, page) {
		return await this.mongooseEntityQueries.list(this.model, query, virtuals, relations, size, page)
	}

	/**
	 * Update and return a record with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @param { Object } data - The data to update.
	 * @returns { Object } An object.
	 */
	async update(id, data) {
		return await this.mongooseEntityQueries.update(this.model, id, data)
	}

	/**
	 * Remove a record with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @returns { ObjNumberect } The number of the records affected.
	 */
	async remove(id) {
		return await this.mongooseEntityQueries.remove(this.model, id)
	}
}

module.exports = SubcategoryRepository