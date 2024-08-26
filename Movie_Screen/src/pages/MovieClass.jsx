import React, { useState, useEffect } from 'react';

function MovieClassName() {
	const [movies, setMovies] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('全部');

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				// const response = await axios.get(
				// 	'http://localhost/Movie_Project/Movie/public/api/movieinfo'
				// );
				const response = await axios.get('http://127.0.0.1:8000/api/movieinfo');
				const sortedMovies = response.data.sort((a, b) =>
					new Date(b.release_date) - new Date(a.release_date)
				);
				setMovies(sortedMovies);
				// setMovies(response.data);
			} catch (error) {
				console.error('Error fetching movies:', error);
			}
		};

		fetchMovies();
	}, []);

	const filterMovies = () => {
		if (selectedCategory === '全部') {
			return movies;
		} else {
			return movies.filter((movie) => movie.genre.includes(selectedCategory));
		}
	};

	const CategoryButton = ({ category, label }) => (
		<button
			className={`
				rounded-md
				font-bold
				
				mb-4
				mr-4
				w-28
				h-10
				${selectedCategory === category ? 'bg-[#61a5c2] text-white' : 'bg-[#bfc0c0] text-white'}
			`}
			onClick={() => setSelectedCategory(category)}
		>
			{label}
		</button>
	);

	return (
		<>
			<div className='ml-[5%] mt-8 mb-2'>
				{['全部', '動作', '劇情', '驚悚', '動畫'].map((category) => (
					<CategoryButton key={category} category={category} label={category} />
				))}
				{/* <CategoryButton category="即將入場" label="即將入場" /> */}
			</div>

			<hr className='border-gray-500 mb-2'/>

			<div className="md:mx-[10%]">
				{/* <div className="ml-8 mt-8">
				<CategoryButton category="熱映中" label="熱映中" />
				<CategoryButton category="即將上映" label="即將上映" />
			</div> */}



				<div className="grid grid-flow-row md:grid-cols-5 gap-12 p-8">
					{filterMovies().map(({ MID, image, title, rating, e_title, release_date }) => (
						<a href={`/program/${MID}`} key={MID} className="no-underline">
							<div
								className="
                                flex
                                flex-col
                                h-full
                                bg-white
                                rounded
                                text-gray-500
                                shadow-md
                                relative
                                transition-transform
								font-bold
								hover:translate-y-[-5px]
                            "
							>
								<div className="relative">
									<div style={{ aspectRatio: '2/3' }} ><img className="h-full object-cover rounded-t" src={image} alt={title} /></div>
									<img className="absolute md:bottom-[-40px] right-2 w-8 z-10" src={rating.ratingimgurl} alt={rating.ratingdesc} />
								</div>
								<div className="h-full flex flex-col p-2">
									<p className="text-[#172121] text-xl">{title}</p>
									<p className="text-[#7F7b82] text-xs">{e_title}</p>
									<div className="grow" />
									<div className="content-center">
										<p className="text-[#002855] text-1xl pt-2">上映日期：{release_date}</p>
									</div>
								</div>
								<div className="content-center">
									<button
										className="
                                        w-full
                                        bg-[#0466c8]
                                        text-white
                                        p-2
                                        rounded-md
                                        hover:bg-[#0466c8]/[0.8]
                                        font-bold
                                    "
									>
										線上訂票
									</button>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</>

	);
}

export default MovieClassName;
