import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContextProvider } from './context/ContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId='1013767351612-u7n2sth6cd41ggqjmatp0nd7mutvr6ag.apps.googleusercontent.com'>
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<ContextProvider>
					<NextUIProvider>
						<Router />
					</NextUIProvider>
				</ContextProvider>
			</QueryClientProvider>
		</React.StrictMode>
	</GoogleOAuthProvider>
);
