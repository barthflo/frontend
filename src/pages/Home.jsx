import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './Home.css';

const Home = () => {
	const [greetings, setGreetings] = useState([
		'Hi.',
		'My Name Is Flo',
		"& I'm A Full Stack Developper!",
	]);
	const replaceGreetings = (index) => {
		switch (index) {
			case 0:
				greetings[0] = <Link to="/works">Projects</Link>;
				setGreetings([...greetings], greetings[0]);
				break;
			case 1:
				greetings[1] = <Link to="/about">About</Link>;
				setGreetings([...greetings], greetings[1]);
				break;
			case 2:
				greetings[2] = <Link to="/contact">Contact</Link>;
				setGreetings([...greetings], greetings[2]);
				break;
			default:
				return;
		}
	};

	return (
		<>
			<Helmet>
				<title>Home - Flo Barth Web Developer</title>
				<meta
					name="description"
					content="Welcome to my portfolio. I am a full stack developper and site creator with experience in JS, PHP and Python"
				/>
			</Helmet>
			<main className="home-page d-flex justify-content-center align-items-center w-100">
				<section className="mb-5 mb-sm-0 px-4 pb-sm-5 pr-sm-5 d-flex flex-column justify-content-end justify-content-sm-end align-items-center align-items-sm-end w-100 h-100">
					{greetings.map((greeting, index) => (
						<SwitchTransition mode="out-in">
							<CSSTransition
								classNames="fade"
								addEndListener={(node, done) => {
									node.addEventListener('transitionend', done, false);
								}}
								key={greeting}
							>
								<h2
									key={index}
									onMouseEnter={(e) =>
										window.innerWidth > 768 && replaceGreetings(index)
									}
									onClick={(e) =>
										window.innerWidth < 768 && replaceGreetings(index)
									}
								>
									{greeting}
								</h2>
							</CSSTransition>
						</SwitchTransition>
					))}
				</section>
			</main>
		</>
	);
};

export default Home;
