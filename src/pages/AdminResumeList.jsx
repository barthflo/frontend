import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ListTable from '../components/Admin/ListTable';
import PDFForm from '../components/Admin/PDFForm';
import Axios from 'axios';
import { BACKEND } from '../endpoints';

const titles = ['Title', 'Date', 'Published', 'Actions'];

const AdminResumeList = () => {
	const [experiences, setExperiences] = useState([]);

	const fetchExperiences = useCallback(async () => {
		try {
			let res = await Axios.get(`${BACKEND}/resume`);
			res = res.data.map((item) => {
				return {
					id: item.id,
					title: item.cardSubtitle,
					date: item.title,
					published: item.published,
				};
			});
			setExperiences(res);
		} catch (err) {
			console.log(err);
		}
	}, [setExperiences]);

	const handleCheckBox = async (value, id) => {
		try {
			const res = await Axios.put(
				`${BACKEND}/resume/${id}`,
				{ published: value },
				{
					withCredentials: true,
				},
			);
			experiences.find((experience) => experience.id === id).published =
				res.data.update.published;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchExperiences();
	}, [fetchExperiences]);

	return (
		<>
			<Helmet>
				<title>Resume Overview - Admin - Flo Barth Web Developer</title>
				<meta name="description" content="List of all the work experiences" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<section className="admin d-flex flex-column align-items-center flex-md-row p-2 p-sm-4 ">
					<ListTable
						cols={titles}
						rows={experiences}
						prefix="resume"
						setRows={setExperiences}
						handleCheckBox={handleCheckBox}
						classes="flex-grow-1"
						children={<PDFForm />}
					/>
				</section>
			</main>
		</>
	);
};

export default AdminResumeList;
