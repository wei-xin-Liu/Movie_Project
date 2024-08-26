import * as yup from 'yup';

const LogInSchema = yup.object().shape({
	email: yup.string().email('電子郵件地址無效').required('電子郵件是必需的'),
	password: yup
		.string()
		.required('密碼是必需的')
		.min(8, '密碼必須至少 8 個字符')
		.max(20, '密碼最多 20 個字符')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
			'密碼必須包含至少一個字母和一個數字，且只能包含字母和數字'
		),
});

export default LogInSchema;
