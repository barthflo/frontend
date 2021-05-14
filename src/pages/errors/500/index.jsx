import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/Nav/Logo';
import '../styles.css';
const styles = {
	text: {
		fontSize: '1.2em',
		fontFamily: 'var(--secondary-font)',
		marginTop: 50,
		textAlign: 'center',
	},
	button: {
		width: 150,
	},
};

const errorServer = () => {
	return (
		<div className="position-absolute h-100 w-100 d-flex flex-column justify-content-center align-items-center">
			<Logo />
			<h2 style={styles.text}>
				Ooops. It seems there is a problem with the server.
				<br />
				Please try again later.
			</h2>
			<div className="button-error d-flex flex-column flex-md-row">
				<Link
					to="/"
					style={styles.button}
					className="button-form align-self-end m-0 mb-3 m-md-3"
				>
					<div id="underline"></div>
					Return Home
				</Link>
			</div>
		</div>
	);
};

export default errorServer;
