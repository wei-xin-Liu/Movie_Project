import { parse, isAfter } from 'date-fns';

export const sortAndFilterOrders = (orders, limit, upcoming = true) => {
	const currentDate = new Date();
	return orders
		.filter((order) => {
			const orderDetails = JSON.parse(order.detail);
			const orderDateTime = parse(
				`${orderDetails.date} ${orderDetails.time}`,
				'yyyy-MM-dd HH:mm',
				new Date()
			);
			return upcoming
				? isAfter(orderDateTime, currentDate)
				: !isAfter(orderDateTime, currentDate);
		})
		.sort((a, b) => {
			const dateA = new Date(a.createTime);
			const dateB = new Date(b.createTime);
			return upcoming ? dateA - dateB : dateB - dateA;
		})
		.slice(0, limit);
};
