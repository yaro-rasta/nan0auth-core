import { suite, describe, it } from "node:test"
import assert from "node:assert/strict"
import User from "./User.js"

suite("User", () => {
	describe("Security", () => {
		it("should not provide any token in toObject()", () => {
			const user = new User({
				name: "someone",
				tokens: [
					["first", Date.now()],
					["second", Date.now()],
					["old", "1983-08-31T16:20:00"],
				]
			})
			const data = user.toObject()
			assert.equal(data.name, "someone")
			assert.equal(data.tokens, undefined)
		})
	})

	describe("Constructor", () => {
		it("should initialize with default values", () => {
			const user = new User()
			assert.equal(user.name, "")
			assert.equal(user.email, "")
			assert.equal(user.passwordHash, "")
			assert.equal(user.verified, false)
			assert.equal(user.verificationCode, "")
			assert.equal(user.resetCode, "")
			assert.equal(user.resetCodeAt, null)
			assert.deepEqual(user.roles, [])
			assert.ok(user.createdAt instanceof Date)
			assert.ok(user.updatedAt instanceof Date)
			assert.equal(user.isPublic, false)
		})

		it("should convert input values to proper types", () => {
			const user = new User({
				name: 123,
				email: 456,
				passwordHash: true,
				verified: "true",
				verificationCode: 789,
				resetCode: 101112,
				resetCodeAt: "2023-01-01",
				roles: ["admin", 123],
				isPublic: 1
			})
			assert.equal(user.name, "123")
			assert.equal(user.email, "456")
			assert.equal(user.passwordHash, "true")
			assert.equal(user.verified, true)
			assert.equal(user.verificationCode, "789")
			assert.equal(user.resetCode, "101112")
			assert.ok(user.resetCodeAt instanceof Date)
			assert.deepEqual(user.roles, ["admin", "123"])
			assert.equal(user.isPublic, true)
		})
	})

	describe("Methods", () => {
		it("is() should check roles", () => {
			const user = new User({ roles: ["admin", "editor"] })
			assert.equal(user.is("admin"), true)
			assert.equal(user.is("editor"), true)
			assert.equal(user.is("viewer"), false)
		})

		it("toString() should return name and email", () => {
			const user = new User({ name: "Test User", email: "test@example.com" })
			assert.ok(user.toString().startsWith("Test User <test@example.com>"))
		})

		it("from() should return existing User instance", () => {
			const user = new User()
			assert.equal(User.from(user), user)
		})
	})

	describe("Tokens", () => {
		it("should convert token timestamps to Date objects", () => {
			const tokens = new Map([
				["token1", "2023-01-01"],
				["token2", Date.now()]
			])
			const user = new User({ tokens })
			for (const [, date] of user.getTokens()) {
				assert.ok(date instanceof Date)
			}
		})

		it("should accept tokens as array or object", () => {
			const arrayUser = new User({ tokens: [["token1", "2023-01-01"]] })
			const objectUser = new User({ tokens: { token1: "2023-01-01" } })
			assert.ok(arrayUser.getToken("token1") instanceof Date)
			assert.ok(objectUser.getToken("token1") instanceof Date)
		})
	})
})
