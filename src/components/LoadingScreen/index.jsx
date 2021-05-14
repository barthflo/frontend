import React from 'react';
import SquareLoader from 'react-spinners/SquareLoader';

const styles = {
	text: {
		fontSize: '1.2em',
		fontFamily: 'var(--secondary-font)',
	},
};

const LoadingScreen = ({ loading }) => {
	return (
		<div className="h-100 w-100 position-absolute d-flex flex-column justify-content-center align-items-center">
			<SquareLoader color={'#fcb694'} loading={loading} />
			<h2 className="mt-2" style={styles.text}>
				Page loading...
			</h2>
		</div>
	);
};

export default LoadingScreen;
