import React from 'react';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
} from '@nextui-org/react';

import hamburger from '../../img/hamburger.jpg';
const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	];

	return (
		<>
			<div>
				<Navbar
					classNames={{ wrapper: 'px-0' }}
					className='w-full px-0  border-b-2 border-indigo-100 shadow-lg'
					isBordered
					shouldHideOnScroll
					onMenuOpenChange={setIsMenuOpen}
				>
					<NavbarBrand>
						<img className='w-10' src={hamburger} alt='' />
						<p className='font-bold text-inherit'>ACME</p>
					</NavbarBrand>
					<NavbarContent className='hidden sm:flex gap-4' justify='center'>
						<NavbarItem isActive={true}>
							<Link color='primary' href='#' className=''>
								Features
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color='foreground' href='#'>
								{/* aria-current='page' */}
								Customers
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color='foreground' href='#'>
								Integrations
							</Link>
						</NavbarItem>
					</NavbarContent>
					<NavbarContent justify='end'>
						<NavbarItem className='hidden lg:flex'>
							<Link href='#'>Login</Link>
						</NavbarItem>
						<NavbarItem>
							<Button as={Link} color='primary' href='#' variant='flat'>
								Sign Up
							</Button>
						</NavbarItem>
						<NavbarMenuToggle
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							className='sm:hidden'
						/>
						<NavbarMenu className='mt-10'>
							{menuItems.map((item, index) => (
								<NavbarMenuItem key={`${item}-${index}`}>
									<Link
										color={
											index === 2
												? 'primary'
												: index === menuItems.length - 1
													? 'danger'
													: 'foreground'
										}
										className='w-full'
										href='#'
										size='lg'
									>
										{item}
									</Link>
								</NavbarMenuItem>
							))}
						</NavbarMenu>
					</NavbarContent>
				</Navbar>
			</div>
		</>
	);
};

export default NavBar;
