import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BannerImage from '../components/BannerImage/BannerImage';
import AboutForm from '../components/Admin/AboutForm';
import SocialMediasForm from '../components/Admin/SocialMediasForm';
import { AiOutlineRollback as BackIcon } from 'react-icons/ai';

const AdminWorksList = () => {
	return (
		<>
			<Helmet>
				<title>Bio and Links - Admin - Flo Barth Web Developer</title>
				<meta
					name="description"
					content="Edit your bio and social medias links"
				/>
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<section className="admin d-flex flex-column p-2 p-sm-4 ">
					<div className="d-flex flex-column align-items-center flex-md-row align-items-md-stretch">
						<AboutForm />
						<SocialMediasForm />
					</div>
					<div className="actions align-self-stretch align-self-sm-end mt-3">
						<button className="button-form m-0">
							<div id="underline"></div>
							<Link to="/admin" className="p-0">
								Back
								<BackIcon color="#f1f0f2" size="1.3em" />
							</Link>
						</button>
					</div>
				</section>
			</main>
		</>
	);
};

export default AdminWorksList;
