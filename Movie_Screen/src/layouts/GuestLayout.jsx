import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import { useStateContext } from '../context/ContextProvider';

const GuestLayout = () => {
	const { token } = useStateContext();

	return (
		<div>
			<MyHeader />
			<NavBar />
			<Outlet />
			<MyFooter />
		</div>
	);
};

export default GuestLayout;
