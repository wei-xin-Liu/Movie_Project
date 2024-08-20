import { Card, Button, CardHeader, CardBody } from '@nextui-org/react';
import { useState } from 'react';

export default function ExpandableCard({ width }) {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			className={`${width} shadow-xl border-2 transition-all duration-700 ease-in-out cursor-pointer hover:scale-105 focus:scale-105`}
		>
			<CardHeader className='justify-between'>
				<p>Movie Title</p>
				{/* Can I take payment status from database? change colour */}
				<div>
					<div className='flex-row'>
						<p>payment success</p>
						<div className='bg-red-500 w-20 h-20 justify-center item-center'></div>
					</div>
				</div>
			</CardHeader>
			<CardBody>
				<p className=''>地點</p>
				<p className='indent-4'>Cinemaaaaa</p>
				<p className=''>地點</p>
				<p className='indent-4'>Cinemaaaaa</p>
				<p className=''>地點</p>
				<p className='indent-4'>Cinemaaaaa</p>
				{/* <CardFooter className='flex-col justify-between items-center w-full'> */}
				<Button auto flat onPress={toggleExpand}>
					{expanded ? 'Collapse' : 'Expand'}
				</Button>

				{expanded && (
					<div
						className={`
                        overflow-hidden
                        transition-[max-height] duration-[3000ms] ease-in-out
                        transition-[opacity] duration-[2000ms] ease-in-out
                        transition-[margin] duration-[1000ms] ease-in-out
                        ${
													expanded
														? 'max-h-[1000px] opacity-100 mt-4'
														: 'max-h-0 opacity-0 mt-0'
												}
                      `}
					>
						<div className='flex-col 我px-4 py-2 border-t border-gray-200'>
							<p>地點</p>
							<p className='indent-4'>Cinemaaaaa</p>
							<p>地點</p>
							<p className='indent-4'>Cinemaaaaa</p>
							<p>地點</p>
							<p className='indent-4'>Cinemaaaaa</p>
						</div>
					</div>
				)}
				{/* </CardFooter> */}
			</CardBody>
		</Card>
	);
}
