import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
} from '@nextui-org/react';
import LogInForm from '../components/member/LogInForm';
import { IconXboxX } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link
import { IconMovie } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LogInPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(true);
	const [showRegistrationCard, setShowRegistrationCard] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleBackClick = () => {
		if (
			location.state?.from &&
			!['/login', '/register'].includes(location.state.from.pathname)
		) {
			navigate(-1);
		} else {
			navigate(0); // or some other safe fallback route
		}
	};

	const openModal = () => {
		setIsModalVisible(true);
		setIsAnimating(true);
		// setTimeout(() => setIsAnimating(true), 2); // Slight delay to trigger animation
	};
	const closeModal = () => {
		setIsAnimating(false);
		setTimeout(() => setIsModalVisible(false), 300); // Delay to match animation duration
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
			{/* <button
				onClick={openModal}
				className='px-4 py-2 bg-[#415a77]/80 text-white rounded'
			>
				Show Card
			</button> */}

			<div className='fixed inset-0 z-50 flex items-center justify-center transition-all duration-500'>
				{/* Backdrop */}
				<div
					className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm'
					// onClick={closeModal}
				></div>

				{/* Modal/Card */}
				<div
					id='signin-card'
					className={`fixed top-[8%] left-1/2 transform -translate-x-1/2 transition-all duration-500`}
				>
					<Card className='sm:w-[450px]  max-h-screen'>
						<CardHeader className='flex items-center justify-between h-15 gap-3 bg-[#415a77]/80'>
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
								onClick={handleBackClick}
							/>
						</CardHeader>
						<Divider />
						<CardBody>
							<LogInForm />
						</CardBody>
						<Divider />
						<CardFooter className='flex justify-end'>
							<RouterLink to='/register' className='text-blue-600 text-sm '>
								<span className='text-zinc-400 no-underline	'>
									還沒成為會員?{' '}
								</span>
								{'   '} 點我註冊會員
							</RouterLink>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
