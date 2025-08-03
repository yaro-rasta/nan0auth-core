import TokenExpiryService from "./TokenExpiryService.js"

/**
 * Interface for user configuration options
 * @typedef {Object} UserInput
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [passwordHash]
 * @property {boolean} [verified]
 * @property {string | null} [verificationCode]
 * @property {string | null} [resetCode]
 * @property {string | null} [resetCodeAt]
 * @property {string} [role]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {Map<string, Date>} [tokens]
 */

/**
 * Represents a user in the authentication system
 */
class User {
	static TOKEN_LIFETIME = 1000 * 60 * 60
	/** @type {string} */
	name
	/** @type {string} */
	email
	/** @type {string} */
	passwordHash
	/** @type {boolean} */
	verified
	/** @type {string} */
	verificationCode
	/** @type {string} */
	resetCode
	/** @type {string} */
	resetCodeAt
	/** @type {string[]} */
	roles
	/** @type {Date} */
	createdAt
	/** @type {Date} */
	updatedAt
	/** @type {string} */
	isPublic
	/** @type {Map<string, Date>} */
	#tokens
	/** @type {TokenExpiryService} */
	tokenExpiryService
	/**
	 * Creates a new User instance
	 * @param {UserInput} input - User configuration options
	 */
	constructor(input = {}) {
		const {
			name = "",
			email = "",
			passwordHash = "",
			verified = false,
			verificationCode = "",
			resetCode = "",
			resetCodeAt = "",
			roles = [],
			createdAt = new Date(),
			updatedAt = new Date(),
			isPublic = false,
			tokens = new Map(),
			tokenLifetime = User.TOKEN_LIFETIME
		} = input
		this.name = String(name)
		this.email = String(email)
		this.passwordHash = String(passwordHash)
		this.verified = Boolean(verified)
		this.verificationCode = String(verificationCode)
		this.resetCode = String(resetCode)
		this.resetCodeAt = resetCodeAt ? new Date(resetCodeAt) : null
		this.roles = roles.map(String)
		this.createdAt = new Date(createdAt)
		this.updatedAt = new Date(updatedAt)
		this.isPublic = Boolean(isPublic)
		this.#tokens = tokens instanceof Map
			? tokens : new Map(Array.isArray(tokens)
				? tokens : Object.entries(tokens))
		for (const [token, time] of this.#tokens.entries()) {
			this.#tokens.set(token, new Date(time))
		}
		this.tokenExpiryService = new TokenExpiryService(tokenLifetime)
	}

	/**
	 * @param {string} role
	 * @returns {boolean} True if roles include the current role, otherwise false.
	 */
	is(role) {
		return this.roles.includes(role)
	}

	/**
	 * Converts user data to a plain object
	 * @returns {object} - User data as a plain object
	 */
	toObject() {
		return {
			...this,
			createdAt: this.createdAt.toISOString(),
			updatedAt: this.updatedAt.toISOString(),
		}
	}

	/**
	 * @param {string} token
	 * @returns {Date | undefined}
	 */
	getToken(token) {
		return this.#tokens.get(token)
	}

	/**
	 * @returns {Map<string, Date>}
	 */
	getTokens(validOnly = false) {
		if (validOnly) {
			return new Map(this.#tokens.entries().filter(
				([token, time]) => this.tokenExpiryService.isValid(time)
			))
		}
		return this.#tokens
	}

	/**
	 * Represents object as a string (debugger version).
	 * @returns {string}
	 */
	toString() {
		return [
			this.name,
			this.email ? `<${this.email}>` : 0,
			this.createdAt.toISOString().slice(0, 19).replace("T", " ")
		].filter(Boolean).join(" ")
	}

	/**
	 * Creates a new User instance from a raw object
	 * @param {object} input - Raw user data
	 * @returns {User} - User instance
	 */
	static from(input) {
		if (input instanceof User) return input
		return new User(input)
	}
}

export default User
