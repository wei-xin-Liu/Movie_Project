import { useState, useEffect } from 'react';
import { parse, isAfter, isBefore } from 'date-fns';
import { useUserOrders } from '../../api/useOrder';
import OrderCard from './OrderCard';

const parseDateTime = (date, time) => {
	if (!date || !time) return null;
	return parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm:ss', new Date());
};

export function MostRecentOrderCard() {
	const { data: orders, isLoading, error } = useUserOrders();
	const [mostRecentOrder, setMostRecentOrder] = useState(null);

	useEffect(() => {
		if (orders) {
			const now = new Date();
			const sortedOrders = orders
				.map((order) => {
					const orderDetails = JSON.parse(order.detail);
					const orderDateTime = parseDateTime(
						orderDetails.date,
						orderDetails.time
					);
					return { ...order, orderDateTime };
				})
				.filter((order) => order.orderDateTime)
				.sort(
					(a, b) =>
						Math.abs(a.orderDateTime - now) - Math.abs(b.orderDateTime - now)
				)
				.slice(0, 1); // Get the closest order to now

			setMostRecentOrder(sortedOrders[0] || null);
		}
	}, [orders]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;

	return (
		<div>
			{mostRecentOrder ? (
				<OrderCard order={mostRecentOrder} />
			) : (
				<div className='text-center'>無最新訂單</div>
			)}
		</div>
	);
}

export function UpcomingOrdersCard() {
	const { data: orders, isLoading, error } = useUserOrders();
	const [upcomingOrders, setUpcomingOrders] = useState([]);

	useEffect(() => {
		if (orders) {
			const now = new Date();
			const filtered = orders
				.map((order) => {
					const orderDetails = JSON.parse(order.detail);
					const orderDateTime = parseDateTime(
						orderDetails.date,
						orderDetails.time
					);
					return { ...order, orderDateTime };
				})
				.filter(
					(order) => order.orderDateTime && isAfter(order.orderDateTime, now)
				)
				.sort((a, b) => a.orderDateTime - b.orderDateTime)
				.slice(0, 3); // Get up to 3 upcoming orders

			setUpcomingOrders(filtered);
		}
	}, [orders]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;

	return (
		<>
			{upcomingOrders.length > 0 ? (
				upcomingOrders.map((order) => (
					<OrderCard key={order.oid} order={order} />
				))
			) : (
				<div>無未觀賞電影</div>
			)}
		</>
	);
}
export function PastOrdersCard({ width }) {
	const { data: orders, isLoading, error } = useUserOrders();
	const [pastOrders, setPastOrders] = useState([]);

	useEffect(() => {
		if (orders) {
			const now = new Date();
			const filtered = orders
				.map((order) => {
					const orderDetails = JSON.parse(order.detail);
					const orderDateTime = parseDateTime(
						orderDetails.date,
						orderDetails.time
					);
					return { ...order, orderDateTime };
				})
				.filter(
					(order) => order.orderDateTime && isBefore(order.orderDateTime, now)
				)
				.sort((a, b) => b.orderDateTime - a.orderDateTime)
				.slice(0, 3); // Get up to 3 past orders

			setPastOrders(filtered);
		}
	}, [orders]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;

	return (
		<>
			{pastOrders.length > 0 ? (
				pastOrders.map((order) => (
					<OrderCard key={order.oid} order={order} width={width} />
				))
			) : (
				<div>無過去訂單</div>
			)}
		</>
	);
}
