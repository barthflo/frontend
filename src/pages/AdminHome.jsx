import React from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import HomeCard from '../components/Admin/HomeCard';
import { BACKEND } from '../endpoints';
import { GiHistogram } from 'react-icons/gi';
import { RiHistoryLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

const AdminHome = () => {
	return (
		<>
			<Helmet>
				<title>Admin Overview - Flo Barth Web Developer</title>
				<meta name="description" content="Manage your website content" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<div className="admin d-flex flex-column flex-md-row justify-md-content-center py-2">
					<HomeCard
						title="Projects"
						photo={`${process.env.PUBLIC_URL}/assets/art.jpeg`}
						linkTitle="Edit Projects"
						linkTo="/admin/projects"
						icon={<GiHistogram color="#5b666a" />}
					/>
					<HomeCard
						title="Resume"
						photo={`${process.env.PUBLIC_URL}/assets/man.jpeg`}
						linkTitle="Edit Resume"
						linkTo="/admin/resume"
						icon={<RiHistoryLine color="#5b666a" />}
					/>
					<HomeCard
						title="Bio and Links"
						photo={`${BACKEND}/storage/profile_pic.jpg`}
						linkTitle="Edit Bio and Links"
						linkTo="/admin/bio"
						icon={<AiOutlineUser color="#5b666a" />}
					/>
				</div>
			</main>
		</>
	);
};

export default AdminHome;
