import React from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';

const AdminHome = () => {
	return (
		<>
			<Helmet>
				<title>Works - Flo Barth Web Developer</title>
				<meta
					name="description"
					content="Have a look at the different kind of projects I worked on"
				/>
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
			</main>
		</>
	);
};

export default AdminHome;
