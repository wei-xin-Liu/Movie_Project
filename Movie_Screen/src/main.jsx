import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<NextUIProvider>
				<Router />
			</NextUIProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
