/**
 * Main file for Auth provider classes
 */

/**
 * Base authentication provider interface
 * @abstract
 */
class AuthProvider {
  /**
   * Exchange authorization code for access token
   * @abstract
   * @param {string} code - Authorization code
   * @returns {Promise<{token: string}>} Access token object
   */
  async getAccessToken(code) {
    throw new Error('Method getAccessToken must be implemented')
  }

  /**
   * Create provider instance from input
   * @abstract
   * @param {AuthProvider|any} provider - Provider instance or configuration
   * @returns {AuthProvider} Provider instance
   */
  static from(provider) {
    if (provider instanceof this) return provider
    return new this(provider)
  }
}

/**
 * Google authentication provider
 */
class GoogleAuthProvider extends AuthProvider {
  /** @type {string} */
  #token
  
  constructor() {
    super()
    this.#token = ""
  }

  /**
   * Exchange Google authorization code for access token
   * @param {string} code - Google authorization code
   * @returns {Promise<{token: string}>} Access token
   */
  async getAccessToken(code) {
    // Simulate exchange code for token
    return { token: this.#token || code }
  }

  static from(provider) {
    if (provider instanceof GoogleAuthProvider) return provider
    return new GoogleAuthProvider(provider)
  }
}

/**
 * Facebook authentication provider
 */
class FacebookAuthProvider extends AuthProvider {
  /** @type {string} */
  #token
  
  constructor() {
    super()
    this.#token = ""
  }

  /**
   * Validate Facebook access token
   * @param {string} accessToken - Facebook access token
   * @returns {Promise<{token: string}>} Validated token
   */
  async getAccessToken(accessToken) {
    // Simulate exchange
    return { token: accessToken }
  }

  static from(provider) {
    if (provider instanceof FacebookAuthProvider) return provider
    return new FacebookAuthProvider(provider)
  }
}

/**
 * LinkedIn authentication provider
 */
class LinkedInAuthProvider extends AuthProvider {
  /** @type {string} */
  #token
  
  constructor(token) {
    super()
    this.#token = token
  }

  /**
   * Validate LinkedIn access token
   * @param {string} accessToken - LinkedIn access token
   * @returns {Promise<{token: string}>} Validated token
   */
  async getAccessToken(accessToken) {
    // Simulate exchange
    return { token: accessToken }
  }

  static from(provider) {
    if (provider instanceof LinkedInAuthProvider) return provider
    return new LinkedInAuthProvider(provider)
  }
}

export {
  AuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  LinkedInAuthProvider,
}