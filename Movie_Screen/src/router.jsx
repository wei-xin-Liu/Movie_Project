import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import MovieInfo from './pages/MovieInfo';
import MovieClass from './pages/MovieClass';
import TheaterInfo from './pages/TheaterInfo';
import Header_Footer_Top from './layouts/Header_Footer_Top';
import ProtectedRoute from './layouts/ProtectedRoute';
import GuestLayout from './layouts/GuestLayout';
import New1 from './pages/New1';
import New2 from './pages/New2';
import New3 from './pages/New3';
import Ticketing from './pages/Ticketing';
import Seats from './pages/Seats';
import Program from './pages/Program';
import Bluepay from './pages/Bluepay';
import Bluepaysuccess from './pages/Bluepaysuccess';
import Choosepay from './pages/Choosepay';
import MemberPage from './pages/MemberPage';
import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage';
import NotFound from './pages/NotFound';
import GoogleError from './pages/GoogleError';
import GoogleBtn from './components/member/GoogleBtn';
import AuthCallBack from './api/AuthCallBack';
import AuthError from './pages/AuthError';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Header_Footer_Top />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/News',
				element: <News />,
			},
			{
				path: '/New1',
				element: <New1 />,
			},
			{
				path: '/New2',
				element: <New2 />,
			},
			{
				path: '/New3',
				element: <New3 />,
			},
			{
				path: '/MovieClass',
				element: <MovieClass />,
			},
			{
				path: '/MovieInfo/:id',
				element: <MovieInfo />,
			},
			{
				path: '/TheaterInfo',
				element: <TheaterInfo />,
			},
			{
				path: '/ticketing',
				element: <Ticketing />,
			},
			{
				path: '/program/:id',
				element: <Program />,
			},
			{
				path: '/seats',
				element: <Seats />,
			},
			{
				path: '/Choosepay',
				element: <Choosepay />,
			},
			{
				path: '/Bluepay',
				element: <Bluepay />,
			},
			{
				path: '/Bluepaysuccess',
				element: <Bluepaysuccess />,
			},
			{
				path: '/GoogleBtn',
				element: <GoogleBtn />,
			},
			{
				path: '/googleerror',
				element: <GoogleError />,
			},
			{
				path: '/auth-callback',
				element: <AuthCallBack />,
			},
			{
				path: '/autherror',
				element: <AuthError />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
			{
				path: '/member',
				element: <ProtectedRoute element={<MemberPage />} />,
			},
		],
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <LogInPage />,
			},
			{
				path: '/register',
				element: <RegistrationPage />,
			},
		],
	},
]);

function Router() {
	return (
		<>
			<RouterProvider router={routes} />
		</>
	);
}
export default Router;
