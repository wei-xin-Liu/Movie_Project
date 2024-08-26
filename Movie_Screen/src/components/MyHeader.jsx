import React, { useState } from 'react';
import { IconMovie } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import LogInCard from './member/LogInCard';
import { useStateContext } from '../context/ContextProvider';
import useLogout from '../api/useLogout.jsx';

function MyHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	// console.log(isMobileMenuOpen);

	const openMenu = (event) => {
		// event.stopPropagation(); // Prevent event from affecting other elements
		setIsMobileMenuOpen(true);
	};
	const closeMenu = () => setIsMobileMenuOpen(false);

	const [isLogInCardVisible, setIsLogInCardVisible] = useState(false);
	const toggleLogInCard = () => {
		setIsLogInCardVisible(!isLogInCardVisible);
	};

	const { token } = useStateContext();
	const logoutMutation = useLogout();
	const onLogout = () => {
		logoutMutation.mutate(); // Trigger the mutation when the button is clicked
		setIsLogInCardVisible(false);
	};

	const handleLoginLogout = (event) => {
		// event.stopPropagation(); // Prevent event from affecting other elements
		if (token) {
			onLogout();
		} else {
			toggleLogInCard();
		}
	};

	return (
		<header className='bg-[#002855] text-white m-0 p-4'>
			<div className='flex justify-between items-center h-10'>
				<div className='font-bold text-center'>
					<a href='/' className='flex items-center text-xl'>
						<IconMovie className='ml-16 mr-3 w-[40px] h-[40px]' stroke={1.75} />
						第一影城
					</a>
				</div>
				<div className='hidden md:flex space-x-4 font-bold'>
					<div>
						<a href='/News' className=' hover:text-gray-300'>
							最新公告
						</a>
					</div>
					<div>
						<a href='/MovieClass' className=' hover:text-gray-300'>
							電影資訊
						</a>
					</div>
					<div>
						<a href='/TheaterInfo' className=' hover:text-gray-300'>
							影城介紹
						</a>
					</div>
					<div>
						<Link
							to='/member'
							relative='path'
							className=' hover:text-gray-300 cursor-pointer'
						>
							會員中心
						</Link>
					</div>
					<div>
						<div
							className='w-52 text-center cursor-pointer hover:text-gray-300 text-lg'
							onClick={handleLoginLogout}
						>
							{token ? '會員登出' : '會員登入'}
						</div>

						{isLogInCardVisible && !token && (
							<div>
								<LogInCard />
							</div>
						)}
					</div>
				</div>
				<button className='md:hidden focus:outline-none' onClick={openMenu}>
					<svg
						className='
							h-6
							w-6
						'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'
						></path>
					</svg>
				</button>
			</div>

			{isMobileMenuOpen && (
				<div className='fixed inset-0 bg-blue-600 z-40 items-center justify-center'>
					<button
						className='absolute top-4 right-4 focus:outline-none'
						onClick={closeMenu}
					>
						<svg
							className='
								h-6
								w-6
							'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							></path>
						</svg>
					</button>
					<nav className='text-center'>
						<a
							href='/News'
							className='block text-2xl hover:bg-blue-600 px-4 py-2 mb-4 mt-8'
						>
							最新公告
						</a>
						<a
							href='/MovieClass'
							className='block text-2xl hover:bg-blue-600 px-4 py-2 mb-4'
						>
							電影資訊
						</a>
						<a
							href='/TheaterInfo'
							className='block text-2xl hover:bg-blue-600 px-4 py-2 mb-4'
						>
							影城介紹
						</a>
						<Link
							to='/member'
							relative='path'
							className='block text-2xl hover:bg-blue-600 px-4 py-2 mb-4 cursor-pointer'
						>
							會員中心
						</Link>
						<div>
							<div
								className='block text-2xl hover:bg-blue-600 px-4 py-2 mb-4 cursor-pointer hover:text-gray-300'
								onClick={handleLoginLogout}
							>
								{token ? '會員登出' : '會員登入'}
							</div>

							{isLogInCardVisible && !token && <LogInCard />}
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}

export default MyHeader;
