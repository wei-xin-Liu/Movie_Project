import React, { useEffect, useState } from 'react';
import useDeleteAccount from '../../api/useDeleteAccount';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const DeleteAccountButton = () => {
	const { data, error, mutate, isLoading } = useDeleteAccount();
	const [showMessage, setShowMessage] = useState(false);
	const navigate = useNavigate();

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			mutate();
		}
	};

	useEffect(() => {
		if (data || error) {
			setShowMessage(true);

			// Hide the message after 2 seconds
			const timer = setTimeout(() => {
				setShowMessage(false);
				// Navigate to '/' after hiding the message
				if (data) {
					navigate('/');
				}
			}, 2000);

			return () => clearTimeout(timer); // Cleanup timeout on component unmount
		}
	}, [data, error, navigate]);

	// Navigate to "/" on successful deletion
	// useEffect(() => {
	// 	if (data) {
	// 		navigate('/');
	// 	}
	// }, [data, navigate]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Button
				onPress={handleDelete}
				disabled={isLoading}
				className='text-slate-100 bg-red-500 rounded-sm'
			>
				{isLoading ? 'Deleting...' : 'Delete Account'}
			</Button>

			{/* Display success message */}
			{showMessage && data && (
				<div className='text-green-500'>{data.message}</div>
			)}

			{/* Display error message */}
			{showMessage && error && (
				<div className='text-red-600'>{error.message}</div>
			)}
		</div>
	);
};

export default DeleteAccountButton;
