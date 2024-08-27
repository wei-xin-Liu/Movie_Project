import React, { useState } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import MemberInfo from './MemberInfo.jsx';
import MemberReward from './MemberReward.jsx';
import MemberSeen from './MemberSeen.jsx';

const MemberData = () => {
	const [selectedPart, setSelectedPart] = useState('info');
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

	const showComponent = () => {
		switch (selectedPart) {
			case 'info':
				return <MemberInfo />;
			case 'reward':
				return <MemberReward />;
			case 'seen':
				return <MemberSeen />;
			default:
				return null;
		}
	};
	return (
		<div className='w-[75%] mx-auto my-5'>
			<div className=' mt-0 border-b-1 border-[#002855]/80'>
				<ButtonGroup radius='sm' size='lg' className='my-5 mt-10'>
					<Button
						id='memberInfo'
						className={`text-foreground/60  px-4 py-2 text-lg tracking-[0.1em] border-b-2 border-[#415a77] cursor-pointer bg-transparent ${
							selectedPart === 'info'
								? 'text-[#415a77] border-b-[5px] border-[#415a77]/80'
								: ''
						}`}
						onPress={() => {
							setSelectedPart('info');
							handleScrollToSection('info-section');
						}}
					>
						個人資料
					</Button>
					<Button
						className={` text-foreground/60 px-4 py-2 text-lg tracking-[0.1em] border-b-2 border-[#415a77] cursor-pointer bg-transparent ${
							selectedPart === 'seen'
								? 'text-[#415a77] border-b-[5px] border-[#415a77]/80'
								: ''
						}`}
						onPress={() => {
							setSelectedPart('seen');
							handleScrollToSection('seen-section');
						}}
					>
						觀影記錄
					</Button>
					<Button
						id='MemberReward'
						className={` text-foreground/60 px-4 py-2 text-lg tracking-[0.1em] border-b-2 border-[#415a77] cursor-pointer bg-transparent ${
							selectedPart === 'reward'
								? 'text-[#415a77] border-b-[5px] border-[#415a77]/80'
								: ''
						}`}
						onPress={() => {
							setSelectedPart('reward');
							handleScrollToSection('reward-section');
						}}
					>
						會員權益
					</Button>
				</ButtonGroup>
			</div>
			{/* <hr className='mt-0 border-b-1 border-[#002855] ' /> */}
			<div id='info-section' className='mt-4'>
				{selectedPart === 'info' && showComponent()}
			</div>
			<div id='reward-section' className='mt-4'>
				{selectedPart === 'reward' && showComponent()}
			</div>
			<div id='seen-section' className='mt-4'>
				{selectedPart === 'seen' && showComponent()}
			</div>
		</div>
	);
};

export default MemberData;
