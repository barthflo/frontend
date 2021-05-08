import React from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ResumeForm from '../components/Admin/ResumeForm';

const AdminResumeCreate = () => {
	const values = {
		cardTitle: '',
		cardSubtitle: '',
		cardDetailedText: '',
		start: new Date(),
		end: new Date(),
	};
	return (
		<>
			<Helmet>
				<title>Create Resume - Admin - Flo Barth Web Developer</title>
				<meta name="description" content="Add a new work experience" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<section className="admin d-flex flex-column align-items-center p-4 ">
					<ResumeForm values={values} />
				</section>
			</main>
		</>
	);
};

export default AdminResumeCreate;
