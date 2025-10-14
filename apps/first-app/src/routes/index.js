const SubcategoryRouter = require('./subcategory')
const CategoryRouter = require('./category')
const HealthRouter = require('./health')

class Routes {	/**
	 * @private
   */
	subcategoryRouter

	/**
	 * @private
   */
	categoryRouter


	/**
	 * @private
	 * @static
	 */
	instance

	/**
	 * @private
	 */
	healthRouter

	constructor() {
		this.healthRouter = HealthRouter.getInstance().getRoutes()
		this.categoryRouter = CategoryRouter.getInstance().getRoutes()
		this.subcategoryRouter = SubcategoryRouter.getInstance().getRoutes()
	}

	static getInstance() {
		if (!this.instance) this.instance = new Routes()
		return this.instance
	}

	getRoutes() {
		return {
			subcategoryRouter: this.subcategoryRouter,
			categoryRouter: this.categoryRouter,
			healthRouter: this.healthRouter
		}
	}
}

module.exports = Routes