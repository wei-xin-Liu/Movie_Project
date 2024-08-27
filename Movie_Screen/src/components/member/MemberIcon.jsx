import React, { useEffect, useState } from 'react';
import useUserData from '../../api/useUserData.jsx';
import { jwtDecode } from 'jwt-decode';
import { IconMedal2 } from '@tabler/icons-react';

export default function MemberIcon() {
	const { data: userData, error, isLoading } = useUserData();
	const [iconColor, setIconColor] = useState('');
	const [memberTitle, setMemberTitle] = useState('');

	useEffect(() => {
		if (userData?.token) {
			const decodedToken = jwtDecode(userData.token);
			const memberTitle = decodedToken.membership_level;
			console.log(decodedToken);

			// Determine the membership title, colors, and icon color based on the membership level
			if (memberTitle === '金金會員') {
				setMemberTitle('金金會員');
				setIconColor('text-[#fad643]'); // Gold
			} else if (memberTitle === '紫紫會員') {
				setMemberTitle('紫紫會員');
				setIconColor('text-[#7b2cbf]'); // Purple
			} else {
				setMemberTitle('藍藍會員');
				setIconColor('text-[#2196f3]'); // Blue
			}
		}
	}, [userData?.token]);

	return (
		<>
			<div className='flex justify-center mt-6 mb-4'>
				{memberTitle === '金金會員' && (
					<IconMedal2 className={`w-14 h-14 mx-auto ${iconColor}`} />
				)}
				{memberTitle === '紫紫會員' && (
					<IconMedal2 className={`w-14 h-14 mx-auto ${iconColor}`} />
				)}
				{memberTitle === '藍藍會員' && (
					<IconMedal2 className={`w-14 h-14 mx-auto ${iconColor}`} />
				)}
			</div>
		</>
	);
}
