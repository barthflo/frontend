import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ListTable from '../components/Admin/ListTable';
import Axios from 'axios';
import { BACKEND } from '../endpoints';

const titles = ['Title', 'Published', 'Actions'];

const AdminWorksList = () => {
	const [projects, setProjects] = useState([]);

	const fetchProjects = useCallback(async () => {
		try {
			let res = await Axios.get(`${BACKEND}/projects`);
			res = res.data.map((item) => {
				return {
					id: item.id,
					title: item.title,
					published: item.published,
				};
			});
			setProjects(res);
		} catch (err) {
			console.log(err);
		}
	}, [setProjects]);

	const handleCheckBox = async (value, id) => {
		try {
			const res = await Axios.put(
				`${BACKEND}/projects/${id}`,
				{ published: value },
				{
					withCredentials: true,
				},
			);
			projects.find((project) => project.id === id).published =
				res.data.update.published;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	return (
		<>
			<Helmet>
				<title>Works Overview - Admin - Flo Barth Web Developer</title>
				<meta name="description" content="List of all the projects" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<section className="admin d-flex flex-column align-items-center p-4 ">
					<ListTable
						cols={titles}
						rows={projects}
						prefix="projects"
						setProjects={setProjects}
						handleCheckBox={handleCheckBox}
					/>
				</section>
			</main>
		</>
	);
};

export default AdminWorksList;
