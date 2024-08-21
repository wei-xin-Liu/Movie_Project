import React from 'react';
import MovieCursor from '../components/MovieCursor';
import QuickBuy from '../components/QuickBuy';
import NewsList from '../components/NewsList';
import MovieCardCursor from '../components/MovieCardCursor';
import LogInCard from '../components/member/LogInCard';
import { useLocation } from 'react-router-dom';

function Home() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const showLoginCard = queryParams.get('showLogin') === 'true';

	return (
		<React.Fragment>
			{showLoginCard && <LogInCard />}
			<MovieCursor />

			<div className='m-[2%] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0'>
				<QuickBuy />
				<NewsList />
			</div>

			<hr className='border-black mx-[2%]' />

			<div className='flex text-center'>
				<div className='mt-[7%] md:mt-[2%] ml-[2%] text-3xl'>現正熱映</div>
				<div className='text-3xl mt-[7%] md:mt-[2%] mr-[2%] ml-[25%] md:ml-[80%] hover:text-blue-400'>
					<a href='/MovieClass'>瀏覽更多</a>
				</div>
			</div>

			<MovieCardCursor />
		</React.Fragment>
	);
}

export default Home;
