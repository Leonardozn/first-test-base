const { z } = require('zod')
const { ObjectId } = require('bson')
const { DateTime } = require('luxon')
const { Operators } = require('@first-test-base/entity-queries')

const types = {
	string: 'string',
	number: 'number',
	boolean: 'boolean',
	date: 'date',
	datetime: 'datetime',
	objectId: 'objectId',
	object: 'object',
	array: 'array'
}

class DataValidator {
	/**
	 * @private
	 * @static
	 */
	instance

	static getInstance() {
		if (!this.instance) this.instance = new DataValidator()
		return this.instance
	}

	/**
	 * @private
	 */
	configValidation(obj) {
		let attribute
		let definite = false

		if (obj.isVirtual) {
			attribute = z.string().refine(val => Number(val) === 1, { message: "Virtuals only allow '1' as value." })
			attribute = attribute.transform(val => Number(val))
			return attribute
		}

		if (obj.type === types.string) {
			attribute = z.string()
			if (obj.min) attribute = z.string().min(obj.min)
			if (obj.max) attribute = z.string().max(obj.max)
			if (obj.uuid) attribute = z.string().uuid(obj.uuid)
			definite = true
		}
  
		if (obj.type === types.number) {
			attribute = z.preprocess(
				(val) => (typeof val === "string" ? Number(val) : val),
				z.number()
			)

			if (obj.min) attribute = z.number().min(obj.min)
			if (obj.max) attribute = z.number().max(obj.max)
			if (obj.transform) attribute = attribute.transform(val => Number(val))
			definite = true
		}

		if (obj.type === types.boolean) {
			attribute = z.preprocess(
				(val) => {
					if (typeof val === "string") {
						if (val.toLowerCase() === "true" || val === '1') return true
						if (val.toLowerCase() === "false" || val === '0') return false
					}
					return val
				},
				z.boolean()
			)

			if (obj.transform) attribute = attribute.transform(val => Boolean(val))
			definite = true
		}

		if (obj.type === types.date) {
			attribute = z.string().date()
			if (obj.transform) attribute = attribute.transform(val => DateTime.fromISO(val).toJSDate())
			definite = true
		}

		if (obj.type === types.datetime) {
			attribute = z.string().datetime()
			if (obj.transform) attribute = attribute.transform(val => DateTime.fromISO(val).toJSDate())
			definite = true
		}

		if (obj.type === types.objectId) {
			attribute = z.string().refine(val => ObjectId.isValid(val), { message: "The value is not a valid ObjectId." })
			if (obj.transform) attribute = attribute.transform(val => new ObjectId(val))
			definite = true
		}

		if (definite && obj.allowed && obj.allowed.length) {
			attribute = attribute.superRefine((val, ctx) => {
				if (obj.allowed.includes(val)) {
					ctx.addIssue({
						message: `${ctx.path[0]} only allow ${obj.allowed.join()} as a ${obj.allowed.length > 1 ? 'values' : 'value'}.`
					})
				}
			})
		}

		if (!definite) throw new Error(`Unsupported type: ${obj.type}`)
		if (obj.optional) attribute = attribute.optional()

		return attribute
	}

	/**
	 * @private
	 */
	allowAdvanceQuery(obj) {
		const operators = Operators.allowedOperators()
		const options = {}
		let optionNested = {}
		let item

		for (const op of operators) {
			if (op.allowedTypes.includes(obj.type)) {
				if (op.isArray) {
					options[op.name] = z.array(this.configValidation(obj))
					if (op.size) options[op.name] = options[op.name].length(op.size)
				} else if (op.multiple) {
					const simpleValidation = this.configValidation(obj)
					const simpleArray = z.array(simpleValidation)
					const objectsToValidate = operators.filter(el => !el.multiple && el.allowedTypes.includes(obj.type))
					const allowedObjects = []

					for (let i=objectsToValidate.length-1; i>=0; i--) {
						item = objectsToValidate[i]
						optionNested = {}

						if (item.isArray) {
							optionNested[item.name] = z.array(this.configValidation(obj))
							if (item.size) optionNested[item.name] = optionNested[item.name].length(item.size)
							allowedObjects.push(z.object(optionNested))
						} else {
							allowedObjects.push(z.object({ [item.name]: simpleValidation }))
						}
					}
				
					options[op.name] = z.union([simpleValidation, simpleArray, z.union(allowedObjects), z.array(z.union(allowedObjects))])
				} else {
					options[op.name] = this.configValidation(obj)
				}

				options[op.name] = options[op.name].optional()
			}
		}
	
		return z.object(options).strict()
	}

	/**
	 * Returns an object scheme to validate the entry data.
	 * @param { Object } objInterface - The object with the valid data types for the entry data.
	 * @returns { Object } An object scheme.
	 */
	validate(objInterface) {
		const parseValue = (obj, key) => {
			let attribute

			if (obj.type === types.object) {
				if (!obj.structure) throw new Error(`'${key}' attribute must have a structure.`)
				attribute = this.validate(obj.structure)
				return attribute
			} else if (obj.type === types.array) {
				if (!obj.contentType) throw new Error(`'${key}' attribute must have a contentType.`)

				if (obj.contentType === types.object) {
					if (!obj.structure) throw new Error(`'${key}' attribute must have a structure.`)
					attribute = this.validate(obj.structure)
				} else if(types[obj.contentType.type]) {
					attribute = this.configValidation(obj.contentType)
				} else if (types[obj.contentType]) {
					attribute = this.configValidation({ type: obj.contentType })
				}

				if (!attribute) throw new Error(`Unsupported contentType: ${obj.contentType}`)

				return z.array(attribute)
			} else {
				attribute = this.configValidation(obj)
				return attribute
			}
		}

		let schema = {}

		for (const key in objInterface) {
			if (!objInterface[key].type) throw new Error(`'${key}' attribute must have a type.`)
			const validations = [parseValue(objInterface[key], key)]
			if (objInterface[key].allowAdvance) validations.push(this.allowAdvanceQuery(objInterface[key]))
			if (objInterface[key].canBeVirtual) validations.push(this.configValidation({ type: types.number, allowed: ['1'] }))

			schema[key] = z.union(validations)

			if (objInterface[key].optional) schema[key] = schema[key].optional()
		}

		return z.object(schema).strict()
	}
}

module.exports = {
	types,
	DataValidator
}