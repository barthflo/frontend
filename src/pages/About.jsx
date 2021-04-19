import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { BACKEND, FRONTEND } from '../endpoints';
import BannerImage from '../components/BannerImage/BannerImage';
import AboutSection from '../components/About/AboutSection';
import TimeLineSection from '../components/About/TimeLineSection';
import './About.css';

const About = () => {
	const [about, setAbout] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [profilePic, setProfilePic] = useState([]);
	useEffect(() => {
		const fetchAbout = async () => {
			await Axios.get(`${BACKEND}/about`)
				.then((res) => {
					console.log({ status: res.status, message: res.statusText });
					setAbout(res.data[0]);
				})
				.catch((err) => console.log(err));
		};
		const fetchPic = async () => {
			await Axios.get(`${BACKEND}/about/profile-pic`)
				.then((res) => {
					console.log({ status: res.status, message: res.statusText });
					setProfilePic(res.data[0]);
				})
				.catch((err) => console.log(err));
		};
		(async () => {
			await fetchAbout();
			await fetchPic();
			setIsLoading(false);
		})();
	}, []);

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
				<BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`} />
				<h2 className="page-title">About Me</h2>
				{!isLoading && (
					// 	'Loading....'
					// ) : (
					<>
						<AboutSection about={about} profilePic={profilePic} />
						<TimeLineSection />
					</>
				)}
			</main>
		</>
	);
};

export default About;
