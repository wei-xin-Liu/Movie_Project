import React from 'react';
import { Spinner } from '@nextui-org/spinner';
const Loading = () => {
	return (
		<div className='flex justify-center items-center min-h-screen'>
			<Spinner
				className='w-[250px] h-[250px]'
				label='Loading...'
				color='Primary'
			/>
		</div>
	);
};

export default Loading;
