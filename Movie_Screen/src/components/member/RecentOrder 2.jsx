import OrderCard from './OrderCard';
import { useUserOrders } from '../../api/useOrder'; // Adjust path as necessary

export default function RecentOrder() {
	const { data: orders, isLoading, error } = useUserOrders();
  
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders: {error.message}</div>;
	if (!orders || orders.length === 0) return <div>No recent orders found.</div>;
  
	const recentOrder = orders.reduce((latest, current) =>
	  new Date(current.createTime) > new Date(latest.createTime) ? current : latest
	);
  
	return <OrderCard order={recentOrder} width="full" />;
  }
