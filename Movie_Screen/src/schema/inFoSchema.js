import * as yup from 'yup';

const inFoSchema = yup.object().shape({
	name: yup.string().max(55, '用戶名最多 55 個字符'),
	email: yup
		.string()
		.email('電子郵件地址無效')
		.max(255, '電子郵件最多 255 個字符'),

	password: yup
		.string()
		.nullable()
		.test('password-validation', '密碼無效', function (value) {
			if (!value) return true; // 如果密碼為空或為 null，視為有效

			if (value.length < 8) {
				return this.createError({
					message: '密碼必須至少 8 個字符',
				});
			}
			if (value.length > 20) {
				return this.createError({
					message: '密碼最多 20 個字符',
				});
			}
			if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
				return this.createError({
					message: '密碼必須包含至少一個字母和一個數字，且只能包含字母和數字',
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
					.required('確認密碼是必需的')
					.oneOf([yup.ref('password')], '密碼必須匹配'),
			otherwise: (schema) => schema.nullable(),
		}),

	// birth_Date: yup.date().required('出生日期是必需的'),
});

export default inFoSchema;
