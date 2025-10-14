const CategoryRepository = require('../repositories/category')
const CategoryInterfaces = require('../interfaces/category')
const HandleResponseHandler = require('../handlers/handleResponse')

class CategoryController {
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
	categoryInterface

	/**
	 * @private
	 */
	categoryRepository

	constructor() {
		this.handleResponseHandler = HandleResponseHandler.getInstance()
		this.responseBody = this.handleResponseHandler.getResponseBody()

		this.categoryInterface = CategoryInterfaces.getInstance()
		this.categoryRepository = CategoryRepository.getInstance()

		this.add = this.add.bind(this)
		this.findOne = this.findOne.bind(this)
		this.list = this.list.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
	}

	static getInstance() {
		if (!this.instance) this.instance = new CategoryController()
		return this.instance
	}

	async add(req, res) {
		try {
			const data = Array.isArray(req.body) ? req.body.map(el => this.categoryInterface.getCreateInterface().parse(el)) : this.categoryInterface.getCreateInterface().parse(req.body)
			const category = await this.categoryRepository.add(data)
			const response = this.handleResponseHandler.buildResponse(category)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async findOne(req, res) {
		try {
		const category = await this.categoryRepository.findOne(req.params.id)
		let response
	
			if (!category) {
				const error = new Error('Category not found.')
				error.name = 'NotFoundError'
				response = this.handleResponseHandler.buildResponse(error)
			} else {
				response = this.handleResponseHandler.buildResponse(category)
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
			if (req.query.query) query = this.categoryInterface.getQueryInterface().parse(req.query.query)
			if (req.query.virtuals) virtuals = this.categoryInterface.getVirtualsInterface().parse(req.query.virtuals)
			if (req.query.relations) relations = this.categoryInterface.getRelationsInterface().parse(req.query.relations)
			const size = req.query.size ? Number(req.query.size) : null
			const page = req.query.page ? Number(req.query.page) : null
	
			const category_list = await this.categoryRepository.list(query, virtuals, relations, size, page)
			const response = this.handleResponseHandler.buildResponse(category_list)
	
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
			this.categoryInterface.getUpdateInterface().parse(data)
			const category = await this.categoryRepository.update(req.params.id, data)
			const response = this.handleResponseHandler.buildResponse(category)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
	
	async remove(req, res) {
		try {
			const category = await this.categoryRepository.remove(req.params.id)
			const response = this.handleResponseHandler.buildResponse(category)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		} catch (error) {
			console.error(error)
			const response = this.handleResponseHandler.buildResponse(error)
	
			res.status(response[this.responseBody.STATUS]).json(response)
		}
	}
}

module.exports = CategoryController