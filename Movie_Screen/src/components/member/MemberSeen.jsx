import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Spinner } from '@nextui-org/react';
import ExpandableCard from './ExpandableCard.jsx';
import {
	MostRecentOrderCard,
	UpcomingOrdersCard,
	PastOrdersCard,
} from '../member/FilteredOrderCard.jsx';

const MemberSeen = () => {
	const LoadingSpinner = () => {
		return (
			<div className='w-[80%] mx-auto'>
				<div className='flex items-center justify-center my-5'>
					<Spinner label='請稍後' color='default' labelColor='default' />
				</div>
			</div>
		);
	};

	const HistoryTicket = () => {
		const UnwatchedComponent = () => {
			return (
				<div className='flex gap-3'>
					<UpcomingOrdersCard />
				</div>
			);
		};
		const WatchedComponent = () => {
			return (
				<div className='flex gap-3'>
					<PastOrdersCard width='w-1/3' />
				</div>
			);
		};
		// const ExpiredComponent = () => <p className='text-2xl'>失效的內容</p>;

		const [selectedButton, setSelectedButton] = useState('unwatch');

		const renderComponent = () => {
			switch (selectedButton) {
				case 'unwatch':
					return <UnwatchedComponent />;
				case 'seen':
					return <WatchedComponent />;
				// case 'failure':
				// 	return <ExpiredComponent />;
				default:
					return null;
			}
		};

		const handleScrollToSection = (sectionId) => {
			const element = document.getElementById(sectionId);

			if (element) {
				// Check if the element is already in view
				const rect = element.getBoundingClientRect();
				const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

				if (!isInView) {
					element.scrollIntoView({ behavior: 'smooth', block: 'end' });
				}
			} else {
				console.warn(`Element with ID ${sectionId} not found.`);
			}
		};

		return (
			<div id='memberSeen'className='w-full ml-5 my-5'>
				<ButtonGroup radius='sm' className='my-3'>
					<Button
						className={`${
							selectedButton === 'unwatch' ? 'bg-[#0488c8]' : 'bg-[#415a77]/80'
						} w-24 h-[44px] text-zinc-100 text-[16px]`}
						onPress={() => {
							setSelectedButton('unwatch');
							handleScrollToSection('unwatch');
						}}
					>
						未觀賞
					</Button>
					<Button
						className={`${
							selectedButton === 'seen' ? 'bg-[#0488c8]' : 'bg-[#415a77]/80'
						} w-24 h-[44px] text-zinc-100 text-[16px]`}
						onPress={() => {
							setSelectedButton('seen');
							handleScrollToSection('seen');
						}}
					>
						已觀賞
					</Button>
					{/* <Button
						className={`${
							selectedButton === 'failure' ? 'bg-blue-700' : 'bg-blue-500'
						}`}
						onPress={() => {
							setSelectedButton('failure');
							handleScrollToSection('failure');
						}}
					>
						failure
					</Button> */}
				</ButtonGroup>
				<div id='unwatch' className='mt-4'>
					{selectedButton === 'unwatch' && renderComponent()}
				</div>
				<div id='seen' className='mt-4'>
					{selectedButton === 'seen' && renderComponent()}
				</div>
				{/* <div id='failure' className='mt-4'>
					{selectedButton === 'failure' && renderComponent()}
				</div> */}
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
