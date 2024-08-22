import React from 'react';
import { Spinner } from '@nextui-org/spinner';
const Loading = () => {
	return (
		<div className='flex justify-center items-center'>
			<Spinner
				className='w-[200px] h-[200px]'
				label='Loading...'
				color='Primary'
			/>
		</div>
	);
};

export default Loading;
