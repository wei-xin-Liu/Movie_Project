import React, { useState, useEffect } from 'react';
import {
	Input,
	DateInput,
	Button,
	Spinner,
	DatePicker,
} from '@nextui-org/react';
// import { CalendarDate, parseDate } from '@internationalized/date';
// import { now, parseAbsoluteToLocal } from '@internationalized/date';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
import DeleteAccountButton from './DeleteAccountButton.jsx';
import useUpdateUserInfo from '../../api/useUpdateUserInfo.jsx';
import axiosClient from '../../api/axiosSetUp.js';
import { useStateContext } from '../../context/ContextProvider.jsx';
import inFoSchema from '../../schema/inFoSchema.js';

const MemberForm = () => {
	const { user, token, setUser, setToken } = useStateContext();
	// console.log('User:', user);
	// console.log('Token:', token);

	const {
		mutate: updateUserInfo,
		isLoading,
		isError,
		isSuccess,
		generalError,
		successMessage,
	} = useUpdateUserInfo();

	// const getData = async (data) => {
	// 	const response = await axiosClient.get(
	// 		'/info',
	// 		{
	// 			timeout: 1000, // 1 second timeout
	// 		},
	// 		data
	// 	);
	// 	return response.data;
	// };

	// const { data: userData } = useQuery({
	// 	queryFn: getData,
	// 	queryKey: ['getUserData'],
	// });

	// useEffect(() => {
	// 	if (userData) {
	// 		setUser(userData);
	// 	}
	// }, [userData, setUser]);
	const { data: userData } = useUserData();
	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
		console.log('userData:', userData); //not defined
		// console.log(userData.name);
		console.log('userData:', token);
		console.log(user); //
		console.log(userData?.name);
	}, [userData, setUser]);

	useEffect(() => {
		if (token) {
			setToken(token);
		}
	}, [userData, setToken]);
	// console.log('user:', user.name);
	// console.log('token:', token);

	const MemberFormData = () => {
		const [showInput, setShowInput] = useState(false);
		const [showMore, setShowMore] = useState(false);

		const handleModifyButtonClick = () => {
			setShowInput(true);
		};
		const handleConfirmButtonClick = () => {
			setShowInput(false);
		};

		const handleToggleClick = () => {
			setShowMore((prevShowMore) => !prevShowMore);
		};

		const {
			register,
			handleSubmit,
			control,
			setError,
			clearErrors,
			reset, // Reset function to reset form state
			formState: { errors },
			trigger, // You can use this to manually trigger validation
		} = useForm({
			resolver: yupResolver(inFoSchema),
			// defaultValues: {
			// 	name: user.name || '',
			// 	email: user.email || '',
			// 	password: '',
			// 	password_confirmation: '',
			// },
			mode: 'onChange',
			reValidateMode: 'onTouched', // Revalidate on blur
		});

		const onSubmit = (data) => {
			updateUserInfo(data); // Call the mutation function with the form data
		};

		// useEffect(() => {
		//     if (generalError || successMessage) {
		//       // Set a timer to clear messages after 5 seconds
		//       const timer = setTimeout(() => {
		//         // Clear messages
		//         setGeneralError('');
		//         setSuccessMessage('');
		//       }, 5000); // 5000 milliseconds = 5 seconds

		//       // Cleanup the timer on component unmount
		//       return () => clearTimeout(timer);
		//     }
		//   }, [generalError, successMessage]); // Run effect when messages change

		return (
			<>
				<p>{userData.id}</p>
				<div id='memberInfo'>
					<form
						className='w-full ml-5 mx-auto'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='py-1'>
							<Input
								{...register('name')}
								type='text'
								label='Name'
								radius='sm'
								labelPlacement='outside'
								isDisabled={!showInput}
								defaultValue={user?.name}
								isInvalid={!!errors.name}
								color={errors.name ? 'danger' : 'default'}
								errorMessage={errors.name?.message}
								// classNames={{
								// 	label: '!text-sky-400/50', // Change this to your desired color
								// }}
							/>
						</div>
						<div className='py-1'>
							<Input
								{...register('email')}
								type='email'
								label='Email'
								radius='sm'
								labelPlacement='outside'
								isDisabled={!showInput}
								defaultValue={user?.email}
								isInvalid={!!errors.email}
								color={errors.email ? 'danger' : 'default'}
								errorMessage={errors.email?.message}
								// classNames={{ inputWrapper: 'bg-red-500/80' }}
							/>
						</div>
						{showInput && (
							<>
								<div className='py-1'>
									<Input
										{...register('password')}
										type='password'
										label='Password'
										radius='sm'
										labelPlacement='outside'
										isDisabled={!showInput}
										isInvalid={!!errors.password}
										color={errors.password ? 'danger' : 'default'}
										errorMessage={errors.password?.message}
										// classNames={{
										// 	label: '!text-sky-400/50', // Change this to your desired color
										// }}
									/>
								</div>
								<div className='py-1'>
									<Input
										{...register('password_confirmation')}
										type='password'
										label='Confirm Password'
										radius='sm'
										labelPlacement='outside'
										placeholder='Confirm your password'
										isDisabled={!showInput}
										isInvalid={!!errors.password_confirmation}
										color={errors.password_confirmation ? 'danger' : 'default'}
										errorMessage={errors.password_confirmation?.message}
										// classNames={{
										// 	label: '!text-sky-400/50', // Change this to your desired color
										// }}
									/>
								</div>
							</>
						)}
						{/* <label htmlFor='birth_Date'>Birth Date</label>
					<DatePicker
						id='birth_Date'
						{...register('birth_Date')}
						isInvalid={!!errors.birth_Date}
						errorMessage={errors.birth_Date?.message}
					/> */}
						{/* <Controller
						name='birth_Date'
						control={control}
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<DatePicker
								label='Birth date'
								className='max-w-[284px]'
								isInvalid={!!errors.birth_Date}
								errorMessage={errors.birth_Date?.message}
								onChange={(date) => {
									// Handle date format conversion
									onChange(date ? new Date(date).toISOString() : '');
								}}
								value={value ? new Date(value) : null} // Ensure value is a Date object
								ref={ref} // Pass ref for proper integration
							/>
						)}
					/> */}
						{generalError && (
							<div className='text-red-500 mb-4'>{generalError}</div>
						)}
						{successMessage && (
							<div className='text-green-500 mb-4'>{successMessage}</div>
						)}
						<div className='flex my-5'>
							<Button
								className='mr-3 w-32 text-center text-slate-100 bg-blue-500 rounded-sm'
								onPress={handleModifyButtonClick}
							>
								修改個人資料
							</Button>
							<Button
								type='submit'
								className='mr-3 w-32 text-center text-slate-100 bg-blue-500 rounded-sm'
								onPress={handleConfirmButtonClick}
							>
								確認
							</Button>
						</div>
					</form>
					<div>
						<div className='ml-6'>
							<p
								onClick={handleToggleClick}
								className='text-sm text-blue-500 cursor-pointer'
							>
								{showMore ? '隱藏更多功能' : '顯示更多功能'}
							</p>
						</div>
						{showMore && (
							<div className='ml-5 mt-3 '>
								<DeleteAccountButton />
							</div>
						)}
					</div>
				</div>
			</>
		);
	};

	const LoadingSpinner = () => {
		return (
			<div className='w-[80%] mx-auto'>
				<div className='flex items-center justify-center my-16'>
					<Spinner label='請稍後' color='primary' labelColor='primary' />
				</div>
			</div>
		);
	};
	const [showSecondComponent, setShowSecondComponent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSecondComponent(true);
		}, 1000); // 1 second delay

		return () => clearTimeout(timer); // Cleanup the timer on component unmount
	}, []);

	return (
		<div>{showSecondComponent ? <MemberFormData /> : <LoadingSpinner />}</div>
	);
};
export default MemberForm;
