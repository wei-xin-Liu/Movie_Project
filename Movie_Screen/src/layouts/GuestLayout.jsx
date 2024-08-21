import React from 'react';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import MyTop from '../components/MyTop';
import MovieCursor from '../components/MovieCursor';

import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
	return (
		<div>
			<MyHeader />
			<MovieCursor />
			<Outlet />
			<MyFooter />
			<MyTop />
		</div>
	);
};

export default GuestLayout;
