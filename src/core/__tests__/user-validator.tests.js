import {UserValidator} from '../user-validator';

describe('UserValidator Tests', () => {

	it('empty', () => {
		const validator = new UserValidator({
			handle: null,
			name: null
		});

		const errors = validator.validate([]);

		assert.deepEqual(errors, ['invalid-handle', 'invalid-name']);
	});

	it('over max', () => {
		const validator = new UserValidator({
			handle: testUtils.stringLength(17),
			name: testUtils.stringLength(101)
		});

		const errors = validator.validate([]);

		assert.deepEqual(errors, ['invalid-handle', 'invalid-name']);
	});

	it('on the max', () => {
		const validator = new UserValidator({
			handle: testUtils.stringLength(16),
			name: testUtils.stringLength(100)
		});

		const errors = validator.validate([]);

		assert.deepEqual(errors, []);
	});

	describe('using existing users', () => {

		const existingUsers = [
			{
				handle: 'foo',
				name: 'Foo Bar'
			},
			{
				handle: 'jane',
				name: 'Mary Jane'
			}
		];

		it('duplicate', () => {
			const validator = new UserValidator({
				handle: 'foo',
				name: 'Foo Bar'
			});

			const errors = validator.validate(existingUsers);

			assert.deepEqual(errors, ['duplicate-handle']);
		});

		it('unique', () => {
			const validator = new UserValidator({
				handle: 'roko',
				name: 'Rob Kaiser'
			});

			const errors = validator.validate(existingUsers);

			assert.deepEqual(errors, []);
		});
	});
});