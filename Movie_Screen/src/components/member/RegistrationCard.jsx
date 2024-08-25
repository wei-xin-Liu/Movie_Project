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
import RegistrationForm from './RegistrationForm';
import { IconXboxX } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link
import { IconMovie } from '@tabler/icons-react';
import LogInCard from './LogInCard';

const RegistrationCard = () => {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(true);
	const [showLogInCard, setShowLogInCard] = useState(false);

	const openModal = () => {
		setIsModalVisible(true);
		setIsAnimating(true);
		// setTimeout(() => setIsAnimating(true), 10); // Slight delay to trigger animation
	};
	const closeModal = () => {
		setIsAnimating(false);
		setTimeout(() => setIsModalVisible(false), 300); // Delay to match animation duration
	};

	return (
		<div>
			{isModalVisible && !showLogInCard && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div
						className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm'
						onClick={closeModal}
					></div>

					<div
						className={`fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
							isAnimating ? 'top-1/4 -translate-y-1/4' : 'top-0'
						}`}
					>
						<Card className='sm:w-[450px] max-h-screen'>
							<CardHeader className='flex items-center justify-between h-15 gap-3 bg-indigo-600'>
								<IconMovie
									className='mr-3 text-white w-[40px] h-[40px]'
									stroke={1.75}
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
								<button
									onClick={() => setShowLogInCard(true)}
									className='text-blue-600 text-sm'
								>
									<span className='text-zinc-400 no-underline'>
										已經是會員?
									</span>
									{'   '} 點我登入
								</button>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
			{showLogInCard && <LogInCard />}
		</div>
	);
};
export default RegistrationCard;
