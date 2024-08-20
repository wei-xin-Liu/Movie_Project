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
import RegistrationForm from './RegistrationForm';

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
							<CardHeader className='flex h-15 gap-3 bg-indigo-600'>
								<Image
									alt='nextui logo'
									height={40}
									radius='sm'
									src={hamburger}
									width={40}
								/>
								<div className='flex flex-col'>
									<p className='text-md'>NextUI</p>
									<p className='text-small text-default-500'>nextui.org</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody>
								<RegistrationForm />
							</CardBody>
							<Divider />
							<CardFooter>
								<Link underline='focus' href='http://localhost:5173/'>
									already registered?
								</Link>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
};

export default RegistrationCard;
