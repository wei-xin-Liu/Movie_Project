import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import MovieInfo from './pages/MovieInfo';
import MovieClass from './pages/MovieClass';
import TheaterInfo from './pages/TheaterInfo';
import Header_Footer_Top from './layouts/Header_Footer_Top';
import New1 from './pages/New1';
import New2 from './pages/New2';
import New3 from './pages/New3';
import Ticketing from './pages/Ticketing';
import Seats from './pages/Seats';
import Program from './pages/Program';
import Bluepay from './pages/Bluepay';
import Choosepay from './pages/Choosepay';
import LogInCard from './components/member/LogInCard';

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
				path: '/login',
				element: <LogInCard />,
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
