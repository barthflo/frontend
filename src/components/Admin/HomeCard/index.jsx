import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCard.css';

const HomeCart = ({ title, photo, linkTitle, linkTo, icon }) => {
	return (
		<section className="home-card flex-grow-1 d-flex flex-column mx-3 mt-3 align-items-center">
			<img className="flex-grow-1" src={photo} alt={title} />
			<h3>{title}</h3>
			<div className="card-footer w-100 d-flex justify-content-center align-items-center p-4">
				<div className="button-project m-0 px-3">
					<div id="underline"></div>
					<Link to={linkTo} className="pr-1">
						{linkTitle}
					</Link>
					{icon}
				</div>
			</div>
		</section>
	);
};

export default HomeCart;
