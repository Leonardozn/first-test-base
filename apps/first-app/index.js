PrototypesHandler = require('./src/handlers/prototypes')
const prototypes = PrototypesHandler.getInstance()
prototypes.setCapitalize()

const serverConfiguration = require('./src/handlers/serverConfiguration')

const Routes = require('./src/routes')
const routes = Routes.getInstance().getRoutes()

const CorsPolicyHandler = require('./src/handlers/corsPolicy')
const corsPolicy = CorsPolicyHandler.getInstance()

const RequestLoggerHandler = require('./src/handlers/requestLogger')
const requestLogger = RequestLoggerHandler.getInstance()
const modes = requestLogger.getModes()

const envVarsHandler = require('./src/handlers/envVariables')

const port = envVarsHandler.FIRST_APP_PORT
const host = envVarsHandler.FIRST_APP_HOST
const server = new serverConfiguration()

server.setSingleSetting(corsPolicy.getPolicy())

server.setRequestBodyOptions({ limit: '10mb' })

server.setSingleSetting(requestLogger.getLogger(modes.DEV))

server.setRoutes({
	mainPath: envVarsHandler.FIRST_APP_PATH,
	routes
})

server.setListenSettings(port, host)

module.exports = server