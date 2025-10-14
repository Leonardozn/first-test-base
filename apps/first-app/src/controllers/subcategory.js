const SubcategoryRepository = require('../repositories/subcategory')
const SubcategoryInterfaces = require('../interfaces/subcategory')
const HandleResponseHandler = require('../handlers/handleResponse')

class SubcategoryController {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	handleResponseHandler

	/**
	 * @private
	 */
	subcategoryInterface

	/**
	 * @private
	 */
	subcategoryRepository

	constructor() {
		this.handleResponseHandler = HandleResponseHandler.getInstance()
		this.responseBody = this.handleResponseHandler.getResponseBody()

		this.subcategoryInterface = SubcategoryInterfaces.getInstance()
		this.subcategoryRepository = SubcategoryRepository.getInstance()

		this.add = this.add.bind(this)
		this.findOne = this.findOne.bind(this)
		this.list = this.list.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
	}

	static getInstance() {
		if (!this.instance) this.instance = new SubcategoryController()
		return this.instance
	}

	async add(req, res) {
		try {
			const data = Array.isArray(req.body) ? req.body.map(el => this.subcategoryInterface.getCreateInterface().parse(el)) : this.subcategoryInterface.getCreateInterface().parse(req.body)
			const subcategory = await this.subcategoryRepository.add(data)
			const response = this.handleResponseHandler.buildResponse(subcategory)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async findOne(req, res) {
		try {
		const subcategory = await this.subcategoryRepository.findOne(req.params.id)
		let response
	
			if (!subcategory) {
				const error = new Error('Subcategory not found.')
				error.name = 'NotFoundError'
				response = this.handleResponseHandler.buildResponse(error)
			} else {
				response = this.handleResponseHandler.buildResponse(subcategory)
			}
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
			
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async list(req, res) {
		try {
			let query = {}
			let virtuals = {}
			let relations = {}
			if (req.query.query) query = this.subcategoryInterface.getQueryInterface().parse(req.query.query)
			if (req.query.virtuals) virtuals = this.subcategoryInterface.getVirtualsInterface().parse(req.query.virtuals)
			if (req.query.relations) relations = this.subcategoryInterface.getRelationsInterface().parse(req.query.relations)
			const size = req.query.size ? Number(req.query.size) : null
			const page = req.query.page ? Number(req.query.page) : null
	
			const subcategory_list = await this.subcategoryRepository.list(query, virtuals, relations, size, page)
			const response = this.handleResponseHandler.buildResponse(subcategory_list)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async update(req, res) {
		try {
			const data = req.body
			this.subcategoryInterface.getUpdateInterface().parse(data)
			const subcategory = await this.subcategoryRepository.update(req.params.id, data)
			const response = this.handleResponseHandler.buildResponse(subcategory)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async remove(req, res) {
		try {
			const subcategory = await this.subcategoryRepository.remove(req.params.id)
			const response = this.handleResponseHandler.buildResponse(subcategory)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
}

module.exports = SubcategoryController