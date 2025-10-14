const mongoose = require('mongoose')
const envVars = require('@first-test-base/env-variables')
const credentials = `mongodb://${envVars.FIRST_TEST_BASE_DATABASE_USERNAME}:${envVars.FIRST_TEST_BASE_DATABASE_PASSWORD}@${envVars.FIRST_TEST_BASE_DATABASE_HOST}:${envVars.FIRST_TEST_BASE_DATABASE_PORT}/${envVars.FIRST_TEST_BASE_DATABASE_NAME}`
const options = {
	authSource: 'admin',
	serverSelectionTimeoutMS: 30000,
	socketTimeoutMS: 45000
}

const connectWithRetry = async () => {
	while (true) {
		try {
			mongoose.set('strictQuery', true)
			await mongoose.connect(credentials, options)
			break
		} catch (error) {
			console.error(`\x1b[31m❌ Mongodb (${envVars.FIRST_TEST_BASE_DATABASE_NAME}) connection error: ${error.message}`)
			console.log(`🔄 Retrying in 5 seconds...`)
			await new Promise((resolve) => setTimeout(resolve, 5000))
		}
	}
}

// Automatic creation of collection
mongoose.set('autoCreate', JSON.parse(envVars.FIRST_TEST_BASE_DATABASE_AUTO_CREATE))

// Connection events
mongoose.connection.on('connected', () => console.log(`\x1b[32m🟢 MongoDB (${envVars.FIRST_TEST_BASE_DATABASE_NAME}) connection established.`))
mongoose.connection.on('disconnected', () => console.warn(`\x1b[33m🟡 MongoDB (${envVars.FIRST_TEST_BASE_DATABASE_NAME}) connection lost.`))

// Start connect
connectWithRetry()

module.exports = mongoose