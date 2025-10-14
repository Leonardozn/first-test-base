const { HttpStatus, ErrorNames } = require('@first-test-base/handle-errors')
const ResponseBody = {
	SUCCESS: 'success',
	MESSAGE: 'message',
	STATUS: 'statusCode',
	CONTENT: 'content'
}

/**
 * @typedef { Object } ResponseOk
 * @property { true } success   - Indicates success.
 * @property { string } message - Success message.
 * @property { number } status  - HTTP status code (2xx/3xx).
 * @property { Object } content - Payload when the operation succeeds.
 */

/**
 * @typedef { Object } ResponseError
 * @property { false } success  - Indicates failure.
 * @property { string } message - Corresponding error message.
 * @property { number } status  - HTTP status code (4xx/5xx).
 * @property { null } content   - No content when the operation fails.
 */

class HandleResponse {
	/**
	 * Builds a standardized example response for success or error.
	 * @param { number } status
	 * @returns { ResponseOk | ResponseError }
	 */
	getExampleResponseFormat(status) {
		if (status >= 400) {
			return {
				[ResponseBody.SUCCESS]: false,
				[ResponseBody.MESSAGE]: 'Corresponding error message.',
				[ResponseBody.STATUS]: status,
				[ResponseBody.CONTENT]: null
			}
		}
  
		return {
			[ResponseBody.SUCCESS]: true,
			[ResponseBody.MESSAGE]: 'Success!',
			[ResponseBody.STATUS]: status,
			[ResponseBody.CONTENT]: {}
		}
	}
  
	/**
	 * Builds a standardized response from either a payload or an Error.
	 * - If `data` is an Error, returns a ResponseError with message, status, and content derived from the error.
	 * - Otherwise, returns a ResponseOk with the given payload as `content`.
	 *
	 * @param { Error|Object } data - Error to serialize or payload to wrap in a success response.
	 * @returns { ResponseOk | ResponseError } Standardized response object.
	 */
	buildResponse(data) {
		if (data instanceof Error) {
			const statusCode = this.getStatusCode(data)
			const errorMessage = this.getErrorMessage(data)
			const errorContent = this.getErrorContent(data)

			return {
				[ResponseBody.SUCCESS]: false,
				[ResponseBody.MESSAGE]: errorMessage,
				statusCode,
				[ResponseBody.CONTENT]: errorContent
			}
		}
  
		return {
			[ResponseBody.SUCCESS]: true,
			[ResponseBody.MESSAGE]: 'Success!',
			[ResponseBody.STATUS]: HttpStatus.OK,
			[ResponseBody.CONTENT]: data
		}
	}
  
	/**
	 * @private
	 */
	getErrorContent(error) {
		if (error.isAxiosError) return error.response ? error.response.data : null

		if (error.name === ErrorNames.ZOD_ERROR) {
			const errors = []
			for (const item of error.errors) errors.push(this.findFirstDeepestObject(item))
			if (errors.length === 1) return errors[0]
			return errors
		}

		return null
	}
  
	/**
	 * @private
	 */
	getErrorMessage(error) {
		if (error.message) {
			if (error.name === ErrorNames.ZOD_ERROR) {
				const messages = error.errors.map(el => el.message)
				if (messages.length === 1) return messages[0]
				return messages
			}

			return error.message
		}
  
		return 'An error occurred'
	}
  
	/**
	 * @private
	 */
	getStatusCode(error) {
		if (error.isAxiosError) {
			return error.response && error.response.status ? error.response.status : HttpStatus.BAD_GATEWAY
		}
  
		if (error.status) return error.status
		if (error.name === ErrorNames.ZOD_ERROR) return HttpStatus.BAD_REQUEST
		return HttpStatus.INTERNAL_SERVER
	}

	/**
	 * @private
	 */
	findFirstDeepestObject(input) {
		const isPlainObject = (v) => Object.prototype.toString.call(v) === '[object Object]'
		const visited = new WeakSet()

		let bestNode = null
		let bestDepth = -1

		const walk = (value, depth) => {
			if (value === null || typeof value !== 'object') return

			if (visited.has(value)) return
			visited.add(value)

			if (isPlainObject(value)) {
				if (depth > bestDepth) {
					bestDepth = depth
					bestNode = value
				}

				for (const v of Object.values(value)) walk(v, depth + 1)
				return
			}

			if (Array.isArray(value)) {
				for (let i = 0; i < value.length; i++) walk(value[i], depth + 1)
			} else {
				for (const v of Object.values(value)) walk(v, depth + 1)
			}
		}

		walk(input, 0)
		return bestNode
	}
}

module.exports = {
	ResponseBody,
	HandleResponse
}