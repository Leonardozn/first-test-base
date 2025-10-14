const BuildPipeline = require('./buildPipeline')

class MongooseEntityQueries {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	buildPipeline

	constructor() {
		this.buildPipeline = BuildPipeline.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new MongooseEntityQueries()
		return this.instance
	}

	/**
	 * Save and return an object or an array of objects saved.
	 * @param { Object } Entity - The entity object.
	 * @param { Object|Object[] } data - The data to save (optional: Object or an array of objects).
	 * @returns { Object|Object[] } An object or an array of objects.
	 */
	async add(Entity, data) {
		if (!Array.isArray(data)) {
			const entity = new Entity(data)
			return await entity.save()
		} else {
			const entity_list = await Entity.insertMany(data)
			return entity_list
		}
	}
	
	/**
	 * Returns an object with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @returns { Object } An object.
	 */
	async findOne(Entity, id) {
		return await Entity.findOne({ _id: id })
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
	async list(Entity, query, virtuals, relations, size, page) {
		let pipelines = []
		const match = this.buildPipeline.match(query)
		pipelines.push({ $match: match })
	
		const relationsInfo = this.buildPipeline.lookUp(Entity, relations)
		if (relationsInfo.length) pipelines = pipelines.concat(relationsInfo)
		
		const project = this.buildPipeline.project(virtuals, relations)
		pipelines.push({ $project: project })
	
		const pagination = this.buildPipeline.pagination(size, page)
		if (pagination.size) pipelines.push(pagination.size)
		if (pagination.page) pipelines.push(pagination.page)
	
		const entity_list = await Entity.aggregate(pipelines)
		
		return entity_list
	}
	
	/**
	 * Update and return a record with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @param { Object } data - The data to update.
	 * @returns { Object } An object.
	 */
	async update(Entity, id, data) {
		return await Entity.findByIdAndUpdate(id, data, { new: true })
	}
	
	/**
	 * Remove a record with the sent id.
	 * @param { Object } Entity - The entity object.
	 * @param { ObjectId } id - The id of the record.
	 * @returns { ObjNumberect } The number of the records affected.
	 */
	async remove(Entity, id) {
		return await Entity.deleteOne({ _id: id })
	}
}

module.exports = MongooseEntityQueries