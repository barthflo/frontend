import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ParallaxProvider } from 'react-scroll-parallax';
import SnackbarProvider from 'react-simple-snackbar';
import { AuthProvider } from './contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<Router>
		<CookiesProvider>
			<AuthProvider>
				<SnackbarProvider>
					<ParallaxProvider>
						<App />
					</ParallaxProvider>
				</SnackbarProvider>
			</AuthProvider>
		</CookiesProvider>
	</Router>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
