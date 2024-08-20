import React, { useState } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import MemberInfo from './MemberInfo.jsx';
import MemberReward from './MemberReward.jsx';
import MemberSeen from './MemberSeen.jsx';

const MemberData = () => {
	const [selectedPart, setSelectedPart] = useState('info');
	const handleScrollToSection = (sectionId) => {
		setTimeout(() => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}, 1100); // 1-second delay
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
		<div className='w-[80%] mx-auto my-5'>
			<ButtonGroup radius='sm' size='lg' className='my-5 mt-10'>
				<Button
					className={`${
						selectedPart === 'info' ? 'bg-blue-700' : 'bg-blue-500'
					}`}
					onPress={() => {
						setSelectedPart('info');
						handleScrollToSection('info-section');
					}}
				>
					個人資料
				</Button>
				<Button
					className={`${
						selectedPart === 'reward' ? 'bg-blue-700' : 'bg-blue-500'
					}`}
					onPress={() => {
						setSelectedPart('reward');
						handleScrollToSection('reward-section');
					}}
				>
					紅利點數
				</Button>
				<Button
					className={`${
						selectedPart === 'seen' ? 'bg-blue-700' : 'bg-blue-500'
					}`}
					onPress={() => {
						setSelectedPart('seen');
						handleScrollToSection('seen-section');
					}}
				>
					觀影記錄
				</Button>
			</ButtonGroup>
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
