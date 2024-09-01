import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Seats from '../pages/Seats';

const ProtectedSeatsRoute = ({ allowedState }) => {
	const location = useLocation();

	return location.state && location.state.from === allowedState ? (
	<Seats />
	) : (
	<Navigate to="/" />
	);
};

export default ProtectedSeatsRoute;
