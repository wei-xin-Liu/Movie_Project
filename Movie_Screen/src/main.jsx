import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContextProvider } from './context/ContextProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<NextUIProvider>
					<Router />
				</NextUIProvider>
			</ContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
