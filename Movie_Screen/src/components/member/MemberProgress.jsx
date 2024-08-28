import React, { useEffect, useState } from 'react';
import useUserData from '../../api/useUserData.jsx';
import { Progress } from '@nextui-org/react';
import { jwtDecode } from 'jwt-decode';

const MemberProgress = () => {
	const { data: userData, error, isLoading } = useUserData();
	const [memberTitle, setMemberTitle] = useState('');
	const [name, setName] = useState('');
	const [progressColors, setProgressColors] = useState('');
	const [progressValue, setProgressValue] = useState(0);
	const [pointsLabel, setPointsLabel] = useState('');
	const [progressText, setProgressText] = useState('');

	useEffect(() => {
		if (userData?.token) {
			const decodedToken = jwtDecode(userData.token);
			const membershipLevel = decodedToken.membership_level;
			const points = decodedToken.membership_point;
			const name = decodedToken.name;
			console.log(decodedToken);

			// Determine the membership title and colors based on the membership level
			if (membershipLevel === '金金會員') {
				setMemberTitle('金金會員');
				setProgressColors('bg-[#fad643]'); // Gold
			} else if (membershipLevel === '紫紫會員') {
				setMemberTitle('紫紫會員');
				setProgressColors(
					'bg-gradient-to-r from-[#7b2cbf] from-90% to-[#fad643]'
				); // Purple to Gold
			} else {
				setMemberTitle('藍藍會員');
				setProgressColors(
					'bg-gradient-to-r from-[#2196f3] from-90% to-[#7b2cbf]'
				); // Blue to Purple
			}

			setName(name);
			// Calculate progress value based on points
			let progress, label;
			let remainingPoints = 0;
			let currentLevel = '';
			let nextLevel = '';

			if (points <= 500) {
				progress = (points / 500) * 100;
				label = `${points} 點 / 500 點`;
				remainingPoints = 500 - points;
				currentLevel = '藍藍會員';
				nextLevel = '紫紫會員';
			} else if (points <= 1000) {
				progress = ((points - 500) / 500) * 100;
				label = `${points} 點 / 1000 點`;
				remainingPoints = 1000 - points;
				currentLevel = '紫紫會員';
				nextLevel = '金金會員';
			} else {
				progress = 100; // Maximum level, progress complete
				label = `${points} 點`;
				currentLevel = '金金會員';
				nextLevel = '';
			}

			setProgressValue(progress);
			setPointsLabel(label);
			setProgressText(
				currentLevel === '金金會員'
					? `您好: 金金會員 ${name}`
					: `您好: ${currentLevel}, 再${remainingPoints}點 即可成為${nextLevel}`
			);
		}
	}, [userData?.token]);
	return (
		<div className='flex flex-col items-center space-y-6'>
			{/* <h2>{memberTitle}</h2> */}
			<Progress
				size='md'
				aria-label='Loading...'
				value={progressValue}
				// label={pointsLabel}
				// showValueLabel={true}
				classNames={{
					base: 'max-w-lg',
					track: 'drop-shadow-md border border-default',
					indicator: `${progressColors}`, // Apply the dynamic colors here
					label: 'tracking-wider font-small text-default-600 text-right',
					value: 'text-foreground/60',
				}}
			/>
			<p className='text-foreground/60 tracking-wider font-medium text-right'>
				{pointsLabel}
			</p>

			<p className='text-foreground/60 tracking-wider font-medium'>
				{progressText}
			</p>
		</div>
	);
};

export default MemberProgress;
