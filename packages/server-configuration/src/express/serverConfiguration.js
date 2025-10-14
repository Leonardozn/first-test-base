const express = require('express')

class serverConfiguration {
	/**
	* @private
	*/
	app
	router

	constructor() {
		this.app = express()
	}

	setListenSettings(port, host) {
		this.app.listen(port, host, () => {
			console.log(`Run in port ${port}`)
		})
	}

	setSingleSetting(settings) {
		this.app.use(settings)
	}

	setRequestBodyOptions(options) {
		this.app.use(express.json(options))
	}

	setRoutes(settings) {
		this.router = express.Router()
		const mainPath = settings.mainPath || ''
		const routes = settings.routes
    
		for (const route in routes) {
			for (const el of routes[route].paths) {
				this.router[el.requestMethod](`${routes[route].modelPath}${el.path}`, el.controllerMethod)
			}
		}

		this.app.use(mainPath, this.router)
	}
}

module.exports = serverConfiguration