import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FRONTEND } from '../endpoints';
import BannerImage from '../components/BannerImage/BannerImage';
import ContactForm from '../components/Contact/ContactForm';
import SocialMedia from '../components/Contact/SocialMedias';
import './Contact.css';

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<Helmet>
				<title>Contact me- Flo Barth Web Developer</title>
				<meta name="description" content="Get in touch with me" />
			</Helmet>
			<main className="contact-page w-100">
				<BannerImage
					backgroundImage={`${FRONTEND}/assets/abstractsquares.jpg`}
				/>
				<h2 className="page-title">Contact me</h2>
				<div className="d-flex flex-column flex-sm-row">
					<ContactForm />
					<SocialMedia />
				</div>
			</main>
		</>
	);
};

export default Contact;
