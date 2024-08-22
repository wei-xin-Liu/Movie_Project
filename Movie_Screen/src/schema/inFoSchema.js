import * as yup from 'yup';

const inFoSchema = yup.object().shape({
	name: yup.string().max(55, 'Username must be at most 55 characters'),
	email: yup
		.string()
		.email('Invalid email address')
		.max(255, 'Email must be at most 255 characters'),

	password: yup
		.string()
		.nullable()
		.test('password-validation', 'Invalid password', function (value) {
			if (!value) return true; // If password is empty or null, consider it valid

			if (value.length < 8) {
				return this.createError({
					message: 'Password must be at least 8 characters',
				});
			}
			if (value.length > 20) {
				return this.createError({
					message: 'Password must be at most 20 characters',
				});
			}
			if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
				return this.createError({
					message:
						'Password must include at least one letter and one number, and can only contain letters and numbers',
				});
			}
			return true;
		}),
	password_confirmation: yup
		.string()
		.nullable()
		.when('password', {
			is: (password) => password && password.length > 0,
			then: (schema) =>
				schema
					.required('Confirm password is required')
					.oneOf([yup.ref('password')], 'Passwords must match'),
			otherwise: (schema) => schema.nullable(),
		}),

	// birth_Date: yup.date().required('Birth date is required'),
});

export default inFoSchema;
