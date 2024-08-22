import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Spinner } from '@nextui-org/react';
import ExpandableCard from './ExpandableCard.jsx';

const MemberSeen = () => {
	const LoadingSpinner = () => {
		return (
			<div className='w-[80%] mx-auto'>
				<div className='flex items-center justify-center my-5'>
					<Spinner label='請稍後' color='primary' labelColor='primary' />
				</div>
			</div>
		);
	};

	const HistoryTicket = () => {
		const UnwatchedComponent = () => {
			return (
				<div className='flex gap-3'>
					<ExpandableCard width='w-1/3' />
					<ExpandableCard width='w-1/3' />
					<ExpandableCard width='w-1/3' />
				</div>
			);
		};
		const WatchedComponent = () => <p className='text-2xl'>已觀賞的內容</p>;
		const ExpiredComponent = () => <p className='text-2xl'>失效的內容</p>;

		const [selectedButton, setSelectedButton] = useState('unwatch');

		const renderComponent = () => {
			switch (selectedButton) {
				case 'unwatch':
					return <UnwatchedComponent />;
				case 'seen':
					return <WatchedComponent />;
				case 'failure':
					return <ExpiredComponent />;
				default:
					return null;
			}
		};

		const handleScrollToSection = (sectionId) => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		};

		return (
			<div className='w-full ml-5 my-5'>
				<ButtonGroup radius='sm' className='my-3'>
					<Button
						className={`${
							selectedButton === 'unwatch' ? 'bg-blue-700' : 'bg-blue-500'
						}`}
						onPress={() => {
							setSelectedButton('unwatch');
							handleScrollToSection('unwatch');
						}}
					>
						unwatch
					</Button>
					<Button
						className={`${
							selectedButton === 'seen' ? 'bg-blue-700' : 'bg-blue-500'
						}`}
						onPress={() => {
							setSelectedButton('seen');
							handleScrollToSection('seen');
						}}
					>
						seen
					</Button>
					<Button
						className={`${
							selectedButton === 'failure' ? 'bg-blue-700' : 'bg-blue-500'
						}`}
						onPress={() => {
							setSelectedButton('failure');
							handleScrollToSection('failure');
						}}
					>
						failure
					</Button>
				</ButtonGroup>
				<div id='unwatch' className='mt-4'>
					{selectedButton === 'unwatch' && renderComponent()}
				</div>
				<div id='seen' className='mt-4'>
					{selectedButton === 'seen' && renderComponent()}
				</div>
				<div id='failure' className='mt-4'>
					{selectedButton === 'failure' && renderComponent()}
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
		<div>{showSecondComponent ? <HistoryTicket /> : <LoadingSpinner />}</div>
	);
};

export default MemberSeen;
