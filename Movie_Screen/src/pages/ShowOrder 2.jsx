import React from 'react';
import { useUserOrders } from '../api/useOrder'; // Adjust path as necessary

const ShowOrder = () => {
	const { data: orders, isLoading, isSuccess, error } = useUserOrders();
	console.log('Orders in component:', orders); // Add this line

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;

	if (isSuccess && orders.length > 0) {
		return (
			<div>
				<h1>Your Orders</h1>
				<ul>
					{orders.map((order) => {
						const orderDetails = JSON.parse(order.detail); // Parse the detail
						return (
							<li key={order.oid}>
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
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
};
export default ShowOrder;
