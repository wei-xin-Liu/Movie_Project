import React, { useEffect } from 'react';
import barcode from '../../img/barcode.png';
import { Navigate } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import ExpandableCard from './ExpandableCard.jsx';
import useUserData from '../../api/useUserData.jsx';
import useLogout from '../../api/useLogout.jsx';
import { useStateContext } from '../../context/ContextProvider.jsx';
import {
	MostRecentOrderCard,
	UpcomingOrdersCard,
	PastOrdersCard,
} from '../member/FilteredOrderCard.jsx';

const MemberTop = () => {
	const { user, token, setUser, setToken } = useStateContext();
	const { data: userData, error, isLoading } = useUserData();
	const logoutMutation = useLogout();

	useEffect(() => {
		if (userData && userData.data) {
			setUser(userData && userData.data);
		}
	}, [userData, setUser]);

	// console.log(userData?.name);

	if (!token) {
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
			<div className='w-[90%]'>
				<header className='mt-6 py-2 w-36 h-16 md:w-48 md:ml-10 md:px-5 md:py-4 text-2xl bg-[#8e9aaf]  text-white text-center border-1  border-[#415a77] rounded-md'>
					會員中心
				</header>
			</div>
			<div className='flex justify-center mt-4'>
				<div className='flex container mx-auto w-[80%]'>
					<div className='flex-row w-1/3 h-min py-3 mx-3 mr-2 flex-1 overflow-auto  border-1.5 border-zinc-400'>
						<div className='py-2 px-5 align-middle'>
							<div className='text-lg text-slate-700 font-bold'>
								Hello! 親愛的會員{' '}
								<p className='text-2xl indent-2'> {userData?.name} </p>
							</div>
							<p className='text-lg text-slate-700 font-bold mt-3'>
								會員信箱：
								<span className='text-xl indent-2'> {userData?.email} </span>
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
								className='text-center text-slate-100 bg-blue-500 w-full h-11 mx-2 rounded-sm'
							>
								登出
							</Button>
						</div>
					</div>
					<div className='flex w-2/3  border-1.5 border-zinc-400 min-h-max  max-h-screen'>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl text-slate-700 font-bold text-center'>
									會員點數
								</p>
							</div>
							<div className='flex mt-6 py-4 justify-center item-center'>
								<p className='text-center text-2xl text-slate-700  tracking-[.45em]'>
									{' '}
									共 <span>0</span> 點{' '}
								</p>
							</div>
							<div className='flex justify-center mt-8'>
								<Button className='text-center bg-transparent text-[#415a77] border-1 border-[#415a77]  w-full h-11 mx-2 rounded-sm   transition-colors duration-150 ease-in-out hover:bg-[#415a77] hover:text-white hover:border-gray-300 focus:outline-none focus:ring-0'>
									查看點數明細
								</Button>
							</div>
						</div>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl font-bold text-center text-slate-700 '>
									最新訂單
								</p>

								<div className='flex mt-6 py-4 justify-center item-center'></div>
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
