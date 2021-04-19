import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { BACKEND, FRONTEND } from '../endpoints';
import BannerImage from '../components/BannerImage/BannerImage';
import ContactForm from '../components/Contact/ContactForm';
import SocialMedia from '../components/Contact/SocialMedias';
import './Contact.css';

const Contact = () => {
	const [socialMedias, setSocialMedias] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchAbout = async () => {
			await Axios.get(`${BACKEND}/social-media`)
				.then((res) => {
					console.log({ status: res.status, message: res.statusText });
					setSocialMedias(res.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});
		};
		fetchAbout();
	}, []);
	return (
		<>
			<Helmet>
				<title>Contact me- Flo Barth Web Developer</title>
				<meta name="description" content="Get in touch with me" />
			</Helmet>
			<main className="contact-page w-100">
				<BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`} />
				<h2 className="page-title">Contact me</h2>
				{!isLoading && (
					// 	'Loading....'
					// ) : (
					<div className="d-flex flex-column flex-sm-row">
						<ContactForm />
						<SocialMedia socialMedias={socialMedias} />
					</div>
				)}
			</main>
		</>
	);
};

export default Contact;
