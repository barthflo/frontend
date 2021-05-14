import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { BACKEND, FRONTEND } from '../endpoints';
import BannerImage from '../components/BannerImage/BannerImage';
import AboutSection from '../components/About/AboutSection';
import TimeLineSection from '../components/About/TimeLineSection';
import LoadingScreen from '../components/LoadingScreen';

import './About.css';

const About = () => {
	const [about, setAbout] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		const fetchAbout = async () => {
			await Axios.get(`${BACKEND}/about`)
				.then((res) => {
					console.log({ status: res.status, message: res.statusText });
					setAbout(res.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					history.push('/500');
				});
		};
		(async () => {
			window.scrollTo(0, 0);
			await fetchAbout();
		})();
	}, [history]);

	return (
		<>
			<Helmet>
				<title>About me- Flo Barth Web Developer</title>
				<meta
					name="description"
					content="Who am I and what I did. Find a resume of my life"
				/>
			</Helmet>
			<main className="about-page w-100">
				<BannerImage
					backgroundImage={`${FRONTEND}/assets/abstractsquares.jpg`}
				/>
				<h2 className="page-title">About Me</h2>
				{isLoading ? (
					<LoadingScreen loading={isLoading} />
				) : (
					<>
						<AboutSection about={about} />
						<TimeLineSection />
					</>
				)}
			</main>
		</>
	);
};

export default About;
