import User from "./User.js"
import Provider from "./Provider.js"
import TokenExpiryService from "./TokenExpiryService.js"

class Auth {
	static User = User
	static Provider = Provider
	static TokenExpiryService = TokenExpiryService
}

export {
	Auth,
	User,
	Provider,
	TokenExpiryService,
}

export default Auth
