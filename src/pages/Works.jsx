import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { BACKEND, FRONTEND } from '../endpoints';
import BannerImage from '../components/BannerImage/BannerImage';
import WorkSection from '../components/Works/WorkSection';
import './Works.css';

const Works = () => {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		const fetchProjects = async () => {
			await Axios.get(`${BACKEND}/projects`)
				.then((res) => {
					console.log({ status: res.status, message: res.statusText });
					setProjects(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		(async () => {
			window.scrollTo(0, 0);
			await fetchProjects();
		})();
	}, []);

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
					backgroundImage={`${FRONTEND}/assets/abstractsquares.png`}
				/>
				<>
					<h2 className="page-title">Works</h2>
					{projects.map((project, index) => (
						<WorkSection key={index} project={project} />
					))}
				</>
			</main>
		</>
	);
};

export default Works;
