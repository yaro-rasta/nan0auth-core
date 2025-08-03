import { suite, describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	LinkedInAuthProvider
} from './Provider.js'

suite('Provider', () => {
	describe('GoogleAuthProvider', () => {
		it('should create instance', () => {
			const provider = new GoogleAuthProvider()
			assert.ok(provider instanceof GoogleAuthProvider)
		})

		it('should exchange code for token', async () => {
			const provider = new GoogleAuthProvider()
			const result = await provider.getAccessToken('test-auth-code-123')
			assert.equal(result.token, 'test-auth-code-123')
		})

		it('should return existing instance from from()', () => {
			const existing = new GoogleAuthProvider()
			const fromInstance = GoogleAuthProvider.from(existing)
			assert.equal(fromInstance, existing)
		})

		it('should create new instance from from() with non-provider input', () => {
			const provider = GoogleAuthProvider.from({})
			assert.ok(provider instanceof GoogleAuthProvider)
		})
	})

	describe('FacebookAuthProvider', () => {
		it('should create instance', () => {
			const provider = new FacebookAuthProvider()
			assert.ok(provider instanceof FacebookAuthProvider)
		})

		it('should validate access token', async () => {
			const provider = new FacebookAuthProvider()
			const result = await provider.getAccessToken('fb-access-token-456')
			assert.equal(result.token, 'fb-access-token-456')
		})

		it('should return existing instance from from()', () => {
			const existing = new FacebookAuthProvider()
			const fromInstance = FacebookAuthProvider.from(existing)
			assert.equal(fromInstance, existing)
		})

		it('should create new instance from from() with non-provider input', () => {
			const provider = FacebookAuthProvider.from({})
			assert.ok(provider instanceof FacebookAuthProvider)
		})
	})

	describe('LinkedInAuthProvider', () => {
		it('should create instance with token', () => {
			const provider = new LinkedInAuthProvider('initial-token')
			assert.ok(provider instanceof LinkedInAuthProvider)
			assert.equal(provider.constructor.name, 'LinkedInAuthProvider')
		})

		it('should validate access token', async () => {
			const provider = new LinkedInAuthProvider()
			const result = await provider.getAccessToken('linkedin-access-token-789')
			assert.equal(result.token, 'linkedin-access-token-789')
		})

		it('should return existing instance from from()', () => {
			const existing = new LinkedInAuthProvider()
			const fromInstance = LinkedInAuthProvider.from(existing)
			assert.equal(fromInstance, existing)
		})

		it('should create new instance from from() with non-provider input', () => {
			const provider = LinkedInAuthProvider.from({})
			assert.ok(provider instanceof LinkedInAuthProvider)
		})
	})
})
