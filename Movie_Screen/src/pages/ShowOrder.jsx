import React from 'react';
import { useUserOrders } from '../api/useOrder'; // Adjust path as necessary
import { Card, Button, CardHeader, CardBody } from '@nextui-org/react';
import { useState } from 'react';
import { IconArrowBadgeDown } from '@tabler/icons-react';
import { IconArrowBadgeUp } from '@tabler/icons-react';

const ShowOrder = ({ width }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const { data: orders, isLoading, isSuccess, error } = useUserOrders();
	console.log('Orders in component:', orders); // Add this line
	// const ticket = JSON.parse(orders.detail);
	// console.log(ticket);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;

	if (isSuccess && orders.length > 0) {
		let test = orders;
		console.log('?', test);
		test.forEach((order) => {
			let test2 = JSON.parse(order.detail);
			console.log('??', test2); // Logs the parsed detail for each order
		});
		return (
			<div>
				<h1>Your Orders</h1>
				<ul>
					{orders.map((order) => {
						const orderDetails = JSON.parse(order.detail); // Parse the detail
						const { ticketCounts } = orderDetails; // Extract ticketCounts
						return (
							<li key={order.oid}>
								<Card
									className={`${width} shadow-xl border-2 transition-all duration-700 ease-in-out cursor-pointer hover:scale-105 focus:scale-105`}
								>
									<CardHeader className='justify-between'>
										<div className='flex-col'>
											<p className='text-base tracking-tight text-blue-500'>
												{orderDetails.title}
											</p>
											<p className='text-sm tracking-tight text-slate-500'>
												{orderDetails.e_title}
											</p>
										</div>
										{/* Can I take payment status from database? change colour */}
										<div>
											<div className='flex-row'>
												<p>payment success</p>
												{/* <div className='bg-red-500 w-20 h-20 justify-center item-center'></div> */}
											</div>
										</div>
									</CardHeader>
									<CardBody className='space-y-1'>
										<p className='text-sm tracking-tight text-slate-500'>
											影廳
										</p>
										<p className='indent-4 text-sm tracking-tight text-zinc-800'>
											{orderDetails.theater}
										</p>
										<p className='text-sm tracking-tight text-slate-500'>
											時間
										</p>
										<p className='indent-4 text-sm tracking-tight text-zinc-800'>
											{orderDetails.date} {'  '} {orderDetails.time}
										</p>
										<p className='text-sm tracking-tight text-slate-500'>
											座位
										</p>
										<p className='flex indent-4 text-sm tracking-tight text-zinc-800'>
											{orderDetails.selectedSeats.map((seat, index) => (
												<li key={index}>座位: {seat}</li>
											))}
										</p>

										{/* <CardFooter className='flex-col justify-between items-center w-full'> */}
										<div
											className='py-2 flex items-center justify-center cursor-pointer hover:text-gray-500 transition-colors duration-200'
											onClick={toggleExpand}
										>
											{expanded ? (
												<IconArrowBadgeUp stroke={1.25} />
											) : (
												<IconArrowBadgeDown stroke={1.25} />
											)}
										</div>
										{expanded && (
											<div
												className={`
													overflow-hidden
													transition-[max-height] duration-[3000ms] ease-in-out
													transition-[opacity] duration-[2000ms] ease-in-out
													transition-[margin] duration-[1000ms] ease-in-out
													${expanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
												`}
											>
												<div className='flex-col py-2 space-y-1 border-t border-gray-200'>
													<p className='text-sm tracking-tight text-slate-500'>
														票別：
													</p>
													<p className='flex indent-4 text-sm tracking-tight text-zinc-800'>
														{ticketCounts.adult > 0 && (
															<li>全票 {ticketCounts.adult} 張</li>
														)}

														{ticketCounts.student > 0 && (
															<li>學生票: {ticketCounts.student} 張</li>
														)}
														{ticketCounts.love > 0 && (
															<li>愛心票: {ticketCounts.love} 張</li>
														)}
													</p>
													<p className='text-sm tracking-tight text-slate-500'>
														訂單明細：
													</p>
													<p className='flex indent-4 text-sm tracking-tight text-zinc-800'>
														{ticketCounts.adult > 0 && (
															<li>全票 {ticketCounts.adult} 張</li>
														)}
														{ticketCounts.student > 0 && (
															<li>學生票: {ticketCounts.student} 張</li>
														)}
														{ticketCounts.love > 0 && (
															<li>愛心票: {ticketCounts.love} 張</li>
														)}

														{orderDetails.selectedFoods.map((food, index) => (
															<li key={index}>
																餐點： {food.name} - 數量: {food.quantity}
															</li>
														))}
													</p>
													<p className='text-sm tracking-tight text-slate-500'>
														訂單編號：
													</p>
													<p className='indent-4 text-sm tracking-tight text-zinc-800'>
														{order.oid}
													</p>
													<p className='text-sm tracking-tight text-slate-500'>
														訂單時間：
													</p>
													<p className='indent-4 text-sm tracking-tight text-zinc-800'>
														{order.createTime}
													</p>
													<p className='text-sm tracking-tight text-slate-500'>
														金額：
													</p>
													<p className='indent-4 text-sm tracking-tight text-zinc-800'>
														{order.totalPrice} 元
													</p>
													<p className='text-sm tracking-tight text-slate-500'>
														付款方式：
													</p>
													<p className='indent-4 text-sm tracking-tight text-zinc-800'>
														線上刷卡
													</p>
												</div>
											</div>
										)}
										{/* </CardFooter> */}
									</CardBody>
								</Card>
								<h2>
									{orderDetails.title} ({orderDetails.e_title})
								</h2>
								<p>userID: {order.user_id}</p>
								<p>Date: {orderDetails.date}</p>
								<p>Time: {orderDetails.time}</p>
								<p>Theater: {orderDetails.theater}</p>
								<p>Total Price: {order.totalPrice}</p>
								<p>Reward Points: {order.rewardPoint}</p>
								<h3>Seats:</h3>
								<ul>
									{orderDetails.selectedSeats.map((seat, index) => (
										<li key={index}>Seat: {seat}</li>
									))}
								</ul>
								<h3>Foods:</h3>
								<ul>
									{orderDetails.selectedFoods.map((food, index) => (
										<li key={index}>
											{food.name} - Quantity: {food.quantity}
										</li>
									))}
								</ul>
								;
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
};
export default ShowOrder;
