import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useState } from 'react';
import { IconArrowBadgeDown, IconArrowBadgeUp } from '@tabler/icons-react';

const OrderCard = ({ order, width = 'w-full' }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	if (!order) {
		return <div>No order data available</div>;
	}

	let orderDetails;
	try {
		orderDetails = JSON.parse(order.detail);
	} catch (error) {
		console.error('Error parsing order details:', error);
		return <div>Error loading order details</div>;
	}
	const {
		ticketCounts = {},
		selectedSeats = [],
		selectedFoods = [],
	} = orderDetails;

	return (
		<Card
			key={order.oid}
			className={`${width} shadow-xl border-2 transition-all duration-700 ease-in-out cursor-pointer hover:scale-105 focus:scale-105`}
		>
			<CardHeader className='justify-between'>
				<div className='flex-col'>
					<p className='text-base tracking-tight text-[#0488c8]'>
						{orderDetails.title || 'No Title'}
					</p>
					<p className='text-sm tracking-tight text-slate-500'>
						{orderDetails.e_title || 'No English Title'}
					</p>
				</div>
				<div>
					<div className='flex-row'>
						<p className='text-sm text-zinc-600'>訂單成功</p>
					</div>
				</div>
			</CardHeader>
			<CardBody className='space-y-1'>
				<p className='text-sm tracking-tight text-slate-500'>影廳</p>
				<p className='indent-4 text-sm tracking-tight text-zinc-800'>
					{orderDetails.theater || 'N/A'}
				</p>
				<p className='text-sm tracking-tight text-slate-500'>時間</p>
				<p className='indent-4 text-sm tracking-tight text-zinc-800'>
					{orderDetails.date || 'N/A'} {'  '} {orderDetails.time || 'N/A'}
				</p>
				<p className='text-sm tracking-tight text-slate-500'>座位</p>
				<p className='indent-4 text-sm text-zinc-800'>
					<span>座位：</span>
					{selectedSeats.length > 0 ? (
						selectedSeats.map((seat, index) => (
							<span key={index}>
								{seat}
								{index < selectedSeats.length - 1 ? ', ' : ''}
							</span>
						))
					) : (
						<span>無座位</span>
					)}
				</p>
				<div
					className='py-2 flex items-center justify-center cursor-pointer hover:text-gray-500 transition-colors duration-200'
					onClick={toggleExpand}
				>
					{expanded ? (
						<IconArrowBadgeUp stroke={2} className='text-[#0488c8]' />
					) : (
						<IconArrowBadgeDown stroke={2} className='text-[#0488c8]' />
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
							<p className='text-sm tracking-tight text-slate-500'>票別：</p>
							<p className='flex indent-4 text-sm list-none tracking-tight text-zinc-800'>
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
							<p className='flex indent-4 text-sm list-none tracking-tight text-zinc-800'>
								{ticketCounts.adult > 0 && (
									<li>全票 {ticketCounts.adult} 張</li>
								)}
								{ticketCounts.student > 0 && (
									<li>學生票: {ticketCounts.student} 張</li>
								)}
								{ticketCounts.love > 0 && (
									<li>愛心票: {ticketCounts.love} 張</li>
								)}
								{selectedFoods.length > 0 ? (
									selectedFoods.map((food, index) => (
										<li key={index}>
											餐點：{food.name} - 數量: {food.quantity}
										</li>
									))
								) : (
									<li>餐點: 無餐點</li>
								)}
							</p>
							<p className='text-sm tracking-tight text-slate-500'>
								訂單編號：
							</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								{order.oid || 'N/A'}
							</p>
							<p className='text-sm tracking-tight text-slate-500'>
								訂單時間：
							</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								{order.createTime || 'N/A'}
							</p>
							<p className='text-sm tracking-tight text-slate-500'>金額：</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								{order.totalPrice || 'N/A'} 元
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
			</CardBody>
		</Card>
	);
};

export default OrderCard;
