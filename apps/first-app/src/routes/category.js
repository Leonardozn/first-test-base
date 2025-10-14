const CategoryController = require('../controllers/category')

class CategoryRouter {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	categoryController

	constructor() {
		this.categoryController = CategoryController.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new CategoryRouter()
		return this.instance
	}

	getRoutes() {
		return {
			modelPath: '/category',
			paths: [
				{ requestMethod: 'post', path: '', controllerMethod: this.categoryController.add },
				{ requestMethod: 'get', path: '/:id', controllerMethod: this.categoryController.findOne },
				{ requestMethod: 'get', path: '', controllerMethod: this.categoryController.list },
				{ requestMethod: 'put', path: '/:id', controllerMethod: this.categoryController.update },
				{ requestMethod: 'delete', path: '/:id', controllerMethod: this.categoryController.remove }
			]
		}
	}
}

module.exports = CategoryRouter