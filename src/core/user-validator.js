import validator from 'validator';

class UserValidator {

	constructor(user) {
		this._user = user;
	}

	validate(existingUsers) {

		const errors = [];

		if (!this._user.handle || !validator.isLength(this._user.handle, 1, 16)) {
			errors.push('invalid-handle');
		}

		if (!this._user.name || !validator.isLength(this._user.name, 1, 100)) {
			errors.push('invalid-name');
		}

		let existingHandles = existingUsers.map(user => user.handle);
		if (this._user.handle && validator.isIn(this._user.handle, existingHandles)) {
			errors.push('duplicate-handle');
		}

		return errors;
	}
}

export {UserValidator}