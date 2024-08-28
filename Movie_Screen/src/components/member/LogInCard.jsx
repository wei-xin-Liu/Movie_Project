import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
} from '@nextui-org/react';
import LogInForm from './LogInForm';
import { IconXboxX } from '@tabler/icons-react';
import { IconMovie } from '@tabler/icons-react';
import RegistrationCard from './RegistrationCard';

const LogInCard = () => {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(true);
	const [showRegistrationCard, setShowRegistrationCard] = useState(false);

	const openModal = () => {
		setIsModalVisible(true);
		setIsAnimating(true);
		// setTimeout(() => setIsAnimating(true), 2); // Slight delay to trigger animation
	};
	const closeModal = () => {
		setIsAnimating(false);
		setTimeout(() => setIsModalVisible(false), 500); // Delay to match animation duration
	};

	useEffect(() => {
		// This effect ensures the card is hidden if clicked outside
		const handleClickOutside = (event) => {
			const cardElement = document.getElementById('signin-card');
			if (cardElement && !cardElement.contains(event.target)) {
				closeModal();
			}
		};

		// Attach event listener to document
		document.addEventListener('mousedown', handleClickOutside);

		// Clean up the event listener on component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div>
			{isModalVisible && !showRegistrationCard && (
				<div className='fixed inset-0 z-50 flex items-center justify-center transition-all duration-500'>
					<div
						className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm'
						onClick={closeModal}
					></div>

					<div
						id='signin-card'
						className={`fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
							isAnimating ? 'top-1/4 -translate-y-1/4' : 'top-0'
						}`}
					>
						<Card className='sm:w-[450px] max-h-screen'>
							<CardHeader className='flex items-center justify-between h-15 gap-3 bg-[#1d3461]/95'>
								<IconMovie
									className='mr-3 text-white w-[40px] h-[40px]'
									stroke={1.75}
								/>
								<div className='flex flex-col justify-between'>
									<p className='text-white text-center'>會員登入</p>
								</div>
								<IconXboxX
									stroke={1}
									className='cursor-pointer text-white'
									onClick={closeModal}
								/>
							</CardHeader>
							<Divider />
							<CardBody>
								<LogInForm closeModal={closeModal} />
							</CardBody>
							<Divider />
							<CardFooter className='flex justify-end'>
								<button
									onClick={() => setShowRegistrationCard(true)}
									className='text-blue-500 text-sm'
								>
									<span className='text-zinc-400 no-underline text-sm'>
										還沒成為會員?{' '}
									</span>
									{'   '} 點我註冊會員
								</button>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
			{showRegistrationCard && <RegistrationCard />}
		</div>
	);
};

export default LogInCard;
