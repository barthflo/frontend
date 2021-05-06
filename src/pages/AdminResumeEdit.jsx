import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ResumeForm from '../components/Admin/ResumeForm';
import Axios from 'axios';
import { BACKEND } from '../endpoints';

const AdminResumeEdit = () => {
	const { id } = useParams();
	const [experience, setExperience] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchExperience = useCallback(async () => {
		try {
			const res = await Axios.get(`${BACKEND}/resume/${id}`);
			setExperience(res.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, [setExperience, id]);

	useEffect(() => {
		fetchExperience();
	}, [fetchExperience]);

	return (
		<>
			<Helmet>
				<title>Edit Resume - Admin - Flo Barth Web Developer</title>
				<meta name="description" content="Edit a work experience" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<section className="admin d-flex flex-column align-items-center p-4 ">
					{!loading && <ResumeForm values={experience} />}
				</section>{' '}
			</main>
		</>
	);
};

export default AdminResumeEdit;
