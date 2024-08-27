import React, { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import BlueRewardCard from './BlueRewardCard';
import PurpleRewardCard from './PurpleRewardCard';
import GoldRewardCard from './GoldRewardCard';

const MemberReward = () => {
	const LoadingSpinner = () => {
		return (
			<div className='w-[80%] mx-auto'>
				<div className='flex items-center justify-center my-5'>
					<Spinner label='請稍後' color='default' labelColor='default' />
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
		<div>
			{showSecondComponent ? (
				<div className='flex gap-3'>
					<BlueRewardCard />
					<PurpleRewardCard />
					<GoldRewardCard />
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
};

export default MemberReward;
