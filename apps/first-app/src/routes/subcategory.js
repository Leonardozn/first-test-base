const SubcategoryController = require('../controllers/subcategory')

class SubcategoryRouter {
	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	subcategoryController

	constructor() {
		this.subcategoryController = SubcategoryController.getInstance()
	}

	static getInstance() {
		if (!this.instance) this.instance = new SubcategoryRouter()
		return this.instance
	}

	getRoutes() {
		return {
			modelPath: '/subcategory',
			paths: [
				{ requestMethod: 'post', path: '', controllerMethod: this.subcategoryController.add },
				{ requestMethod: 'get', path: '/:id', controllerMethod: this.subcategoryController.findOne },
				{ requestMethod: 'get', path: '', controllerMethod: this.subcategoryController.list },
				{ requestMethod: 'put', path: '/:id', controllerMethod: this.subcategoryController.update },
				{ requestMethod: 'delete', path: '/:id', controllerMethod: this.subcategoryController.remove }
			]
		}
	}
}

module.exports = SubcategoryRouter