import React, { useEffect, useState } from 'react';
import barcode from '../../img/barcode.png';
import { Navigate } from 'react-router-dom';
import { Button, Progress } from '@nextui-org/react';
import ExpandableCard from './ExpandableCard.jsx';
import useUserData from '../../api/useUserData.jsx';
import useLogout from '../../api/useLogout.jsx';
import { useStateContext } from '../../context/ContextProvider.jsx';
import {
	MostRecentOrderCard,
	UpcomingOrdersCard,
	PastOrdersCard,
} from '../member/FilteredOrderCard.jsx';
import { jwtDecode } from 'jwt-decode';
import useTotalPoints from '../../api/useTotalPoint.jsx';
import MemberProgress from './MemberProgress.jsx';

const MemberTop = () => {
	// const { user, token, setUser, setToken } = useStateContext();
	const { data: userData, error, isLoading } = useUserData();

	const { data: points } = useTotalPoints();
	const logoutMutation = useLogout();
	// console.log(points);
	const [memberTitle, setMemberTitle] = useState('');

	useEffect(() => {
		if (userData?.token) {
			const decodedToken = jwtDecode(userData?.token);
			const membershipLevel = decodedToken.membership_level;

			// Determine the membership title based on the membership level
			const title =
				membershipLevel === '金金會員'
					? '金金會員' // "Dear Gold Member"
					: membershipLevel === '紫紫會員'
						? '親紫紫會員' // "Dear Silver Member"
						: '藍藍會員'; // "Dear Member"

			setMemberTitle(title);
		}
	}, [userData?.token]);
	// Determine the membership title based on the membership level

	// useEffect(() => {
	// 	if (userData && userData.data) {
	// 		setUser(userData && userData.data);
	// 	}
	// }, [userData, setUser]);

	if (isLoading) return <div>Loading...</div>;
	// console.log(userData?.name);
	if (!userData?.token) {
		<Navigate to='/signin' />; // Redirect to login if token is not available
	}
	// const mutation = useMutation({
	// 	mutationFn: logOut,
	// 	onSuccess: () => {
	// 		// Clear user data and token on successful logout
	// 		setUser(null);
	// 		setToken(null);
	// 	},
	// 	onError: (error) => {
	// 		console.error('Logout failed:', error);
	// 		// Handle errors, show a message, etc.
	// 	},
	// });
	// const onLogout = () => {
	// 	mutation.mutate(); // Trigger the mutation when the button is clicked
	// };
	const onLogout = () => {
		logoutMutation.mutate(); // Trigger the mutation when the button is clicked
	};
	const handleScrollToSection = (sectionId) => {
		setTimeout(() => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		}, 1100); // 1-second delay
	};

	return (
		<>
			<div className='w-[85%] mx-auto border-b-1 border-[#002855]/80 h-16 mt-8'>
				<header className='flex items-center justify-center my-5 py-2 w-36 h-14 md:w-40 md:ml-0 md:p-5 md:mt-10 md:mb-10 border-b-3 border-1 bg-[#415a77]/80 border-[#415a77]/80 rounded-sm'>
					<p className='flex justify-center items-center text-center text-2xl text-white '>
						會員中心
					</p>
				</header>
			</div>
			<div className='flex justify-center mt-10'>
				<div className='flex container mx-auto w-[75%]'>
					<div className='flex-row w-1/3 h-min py-3 mx-3 mr-5 flex-1 overflow-auto  border-1 border-[#002855]/80'>
						<div className='py-2 px-5 align-middle'>
							<div className='text-lg text-foreground/60 font-bold'>
								Hello! 親愛的{memberTitle}{' '}
								<p className='mt-4 text-2xl text-center text-[#415a77]/90'>
									{' '}
									{userData?.name}{' '}
								</p>
							</div>
							<br />

							<p className='text-lg text-foreground/60 font-bold mt-3'>
								會員信箱：
								<span className='text-xl indent-2 text-[#415a77]/90'>
									{' '}
									{userData?.email}{' '}
								</span>
							</p>
						</div>
						<div className='mt-2'>
							<img className='mx-auto w-72 h-40' src={barcode} alt='' />
						</div>
						{/* //TODO Need write condition to display or not */}
						{/* <div className='mt-4'>
							<p className='text-center'>還有資料還沒填唷</p>
						</div> */}
						<div className='flex justify-center mt-4'>
							<Button
								onPress={() => {
									handleScrollToSection('memberInfo');
								}}
								className='text-center bg-transparent text-[#415a77] border-1 border-[#415a77]  w-full h-11 mx-2 rounded-sm   transition-colors duration-150 ease-in-out hover:bg-[#415a77] hover:text-white hover:border-gray-300 focus:outline-none focus:ring-0'
							>
								編輯會員資料
							</Button>
						</div>
						<hr className='mt-2 border-1 border-zinc-200' />
						<div className='flex justify-center mt-2'>
							<Button
								onPress={onLogout}
								className='text-center text-slate-100 bg-[#0488c8] w-full h-11 mx-2 rounded-sm'
							>
								登出
							</Button>
						</div>
					</div>
					<div className='flex w-2/3  border-1 border-[#002855]/80 min-h-max  max-h-screen'>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl text-foreground/60 font-bold text-center'>
									會員點數
								</p>
							</div>
							<div className='flex mt-6 py-4 justify-center item-center'>
								<p className='text-center text-2xl text-foreground/60  tracking-[.45em]'>
									{' '}
									共 <span>{points}</span> 點{' '}
								</p>
							</div>
							<div className='mt-6 ml-5'>
								{/* <Progress
									size='md'
									aria-label='Loading...'
									value={100}
									classNames={{
										base: 'max-w-lg',
										track: 'drop-shadow-md border border-default',
										indicator: 'bg-[#A88F6F]',
										label: 'tracking-wider font-medium text-default-600',
										value: 'text-foreground/60',
									}}
								/> */}
								<MemberProgress />
							</div>
							<div className='flex justify-center mt-8'>
								<Button className='text-center bg-transparent   text-[#415a77] border-1 border-[#415a77]  w-full h-11 ml-5 rounded-sm   transition-colors duration-150 ease-in-out hover:bg-[#415a77] hover:text-white hover:border-gray-300 focus:outline-none focus:ring-0'>
									查看點數明細
								</Button>
							</div>
						</div>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl font-bold text-center text-foreground/60 '>
									最新訂單
								</p>

								<div className='flex mt-3 py-2 justify-center item-center'></div>
								<MostRecentOrderCard />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// // method to jump to the desired element by using the element's id
// const jumpToReleventDiv = (id) => {
// 	const releventDiv = document.getElementById(id);
// 	// behavior: "smooth" parameter for smooth movement
// 	releventDiv.scrollIntoView({behavior: "smooth"});
//   }

export default MemberTop;
