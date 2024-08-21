import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	Input,
	Button,
} from '@nextui-org/react';
import hamburger from '../../img/hamburger.jpg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RegistrationForm from './RegistrationForm';
import { IconXboxX } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link

const RegistrationCard = () => {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);

	const openModal = () => {
		setIsModalVisible(true);
		setTimeout(() => setIsAnimating(true), 10); // Slight delay to trigger animation
	};
	const closeModal = () => {
		setIsAnimating(false);
		setIsModalVisible(false); // Delay to allow animation to complete
	};
	return (
		<div>
			<button
				onClick={openModal}
				className='px-4 py-2 bg-indigo-600 text-white rounded'
			>
				Show Card
			</button>

			{isModalVisible && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					{/* Backdrop */}
					<div
						className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm'
						onClick={closeModal}
					></div>

					{/* Modal/Card */}
					<div
						className={`fixed top-0  left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
							isAnimating ? 'top-1/2 -translate-y-1/2' : 'top-0'
						}`}
					>
						<Card className='sm:w-[450px]  max-h-screen'>
							<CardHeader className='flex items-center justify-between h-15 gap-3 bg-indigo-600'>
								<Image
									alt='nextui logo'
									height={40}
									radius='sm'
									src={hamburger}
									width={40}
								/>
								<div className='flex flex-col'>
									<p className='text-white'>會員註冊</p>
								</div>
								<IconXboxX
									stroke={1}
									className='cursor-pointer text-white'
									onClick={closeModal}
								/>
							</CardHeader>
							<Divider />
							<CardBody>
								<RegistrationForm />
							</CardBody>
							<Divider />
							<CardFooter className='flex justify-end'>
								<RouterLink to='/signin' className='text-blue-600 '>
									<span className='text-zinc-400 no-underline	'>
										Already registered?
									</span>
									{'   '} Sign in Here
								</RouterLink>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
};

export default RegistrationCard;
