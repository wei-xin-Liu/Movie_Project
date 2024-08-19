import React from 'react';
import barcode from './img/barcode.jpg';
import { Button } from '@nextui-org/button';
import ExpandableCard from './ExpandableCard.jsx';

const MemberTop = () => {
	return (
		<>
			<div className='w-[90%] h-16'>
				<header className='py-2 w-36  md:w-48 md:ml-10 md:px-5 md:py-4 text-2xl text-center bg-indigo-200'>
					Hello
				</header>
			</div>
			<div className='flex justify-center mt-3'>
				<div className='flex container mx-auto w-[80%]'>
					<div className='flex-row w-1/3 h-min py-3 mx-3 mr-2 flex-1 overflow-auto  border-1.5 border-zinc-400'>
						<div className='py-2 px-8 align-middle'>
							<p className='text-2xl font-bold'>Member Name</p>
							<p>hahaha@gmail.com</p>
						</div>
						<div className='mt-4'>
							<img className='mx-auto' src={barcode} alt='' />
							<p className='text-center'>123456789</p>
						</div>
						{/* //TODO Need write condition to display or not */}
						<div className='mt-4'>
							<p className='text-center'>還有資料還沒填唷</p>
						</div>
						<div className='flex justify-center mt-4'>
							<Button className='text-center bg-indigo-300 w-full h-11 mx-2 rounded-sm'>
								編輯會員資料
							</Button>
						</div>
						<hr className='mt-4 border-1.5 border-red-600' />
						<div className='flex justify-center mt-4'>
							<Button className='text-center bg-indigo-300 w-full h-11 mx-2 rounded-sm'>
								編輯會員資料
							</Button>
						</div>
					</div>
					<div className='flex w-2/3  border-1.5 border-zinc-400 min-h-max  max-h-screen'>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl font-bold text-center'>會員點數</p>
							</div>
							<div className='flex mt-6 py-4 justify-center item-center'>
								<p className='text-center text-2xl tracking-[.45em]'>
									{' '}
									共 <span>0</span> 點{' '}
								</p>
							</div>
							<div className='flex justify-center mt-8'>
								<Button className='text-center bg-indigo-300 w-full h-11 mx-2 rounded-sm'>
									查看點數明細
								</Button>
							</div>
						</div>
						<div className='w-1/2 py-3 overflow-auto '>
							<div className='py-2 px-8 align-middle'>
								<p className='text-2xl font-bold text-center'>最新訂單</p>

								<div className='flex mt-6 py-4 justify-center item-center'>
									<ExpandableCard width='w-full' />
								</div>
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
