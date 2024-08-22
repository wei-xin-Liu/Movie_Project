import * as yup from 'yup';

const LogInSchema = yup.object().shape({
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
});

export default LogInSchema;
