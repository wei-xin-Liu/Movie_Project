import React, { useState } from 'react';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import MyTop from '../components/MyTop';
import { Outlet, Link } from 'react-router-dom';
import NavBar from '../components/member/NavBar';

import { TicketContext } from '../pages/Program';

function Header_Footer_Top() {
	const [selectedTicket, setSelectedTicket] = useState({});
	return (
		<>
			<TicketContext.Provider value={{ selectedTicket, setSelectedTicket }}>
				<MyHeader />
				<NavBar />
				<Outlet />
				<MyFooter />
				<MyTop />
			</TicketContext.Provider>
		</>
	);
}

export default Header_Footer_Top;
