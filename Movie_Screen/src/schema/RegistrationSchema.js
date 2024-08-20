import * as yup from 'yup';

const RegistrationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Username is required')
		.max(55, 'Username must be at most 55 characters'),
	email: yup
		.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(20, 'Password must be at most 20 characters')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
			'Password must include at least one letter and one number, and can only contain letters and numbers'
		),
	password_confirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
});

export default RegistrationSchema;
