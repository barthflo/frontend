import React from 'react';
import { BACKEND } from '../../endpoints';
import { Parallax } from 'react-scroll-parallax';

const AboutSection = ({ about }) => {
	return (
		<section className="about-section d-flex justify-content-center align-items-center mb-sm-5">
			<div className="d-flex d-flex flex-column-reverse flex-sm-row justify-content-around align-items-center align-items-sm-around flex-wrap pt-4 pt-sm-0 mt-5">
				<div className="about-description px-4 mt-4">
					<Parallax y={[30, -20]}>
						<p className="text-justify">
							<span>❝</span>
							{about.map((a) => a.description)}
							<span>❞</span>
						</p>
					</Parallax>
				</div>

				<div id="profile-pic-outer">
					<img
						id="profile-pic"
						src={`${BACKEND}/storage/${about[0].picture.name}`}
						alt={`${about[0].picture.alt}`}
					/>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
