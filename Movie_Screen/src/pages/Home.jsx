import React from 'react';
import MovieCursor from '../components/MovieCursor';
import QuickBuy from '../components/QuickBuy';
import NewsList from '../components/NewsList';
import MovieCardCursor from '../components/MovieCardCursor';

function Home() {
	return (
		<React.Fragment>
			<MovieCursor />

			<div className="mx-[10%] grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0 ">
				<QuickBuy />
				<NewsList />
			</div>

			<hr className='border-black mx-[2%]' />

			<div className="flex text-center pb-3">
				<div className="font-bold my-[7%] md:my-[2%] ml-[2%] text-3xl text-[#0466c8]">現正熱映</div>
				<div className="font-bold text-2xl my-[7%] md:my-[2%] mr-[2%] ml-[25%] md:ml-[80%] text-[#0466c8]/[0.8] hover:text-blue-800"><a href="/MovieClass">瀏覽更多</a></div>
			</div>

			<MovieCardCursor />
		</React.Fragment>
	);
}

export default Home;
