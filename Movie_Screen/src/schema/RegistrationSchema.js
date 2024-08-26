import * as yup from 'yup';

const RegistrationSchema = yup.object().shape({
	name: yup.string().required('用戶名是必需的').max(55, '用戶名最多 55 個字符'),
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
	password_confirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], '密碼必須匹配')
		.required('確認密碼是必需的'),
});

export default RegistrationSchema;
