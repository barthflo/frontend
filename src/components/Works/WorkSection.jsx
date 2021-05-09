import React from 'react';
import { BACKEND } from '../../endpoints';
import { Parallax } from 'react-scroll-parallax';
import './WorkSection.css';
import 'html5-device-mockups/dist/device-mockups.min.css';
import { MacbookPro, IPhone7 } from 'react-device-mockups';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

const WorkSection = ({ project }) => {
	return (
		<section className="work-section d-flex flex-column align-items-center justify-content-around p-3">
			<Parallax x={[5, 0]} y={[-50, -20]}>
				<h3 className="mt-4 mb-5">{project.title}</h3>
			</Parallax>
			<div className="d-flex flex-column-reverse flex-sm-row-reverse justify-content-center align-items-center">
				<Parallax
					y={[40, -40]}
					className="px-3 pt-5 pt-sm-0 text-center"
					tagOuter="div"
				>
					<ul className="list-unstyled list-inline mb-0">
						<h4>Technical Stack :</h4>
						{project.Categories &&
							project.Categories.map((tag, index) => (
								<li className="list-inline-item" key={index}>
									<p className="text-capitalize">{tag.name}</p>
								</li>
							))}
					</ul>
					{project.link_url && (
						<div className={`button-project`}>
							<div id="underline"></div>
							<a
								href={project.link_url}
								target="_blank"
								rel="noreferrer"
								title={project.title}
							>
								See the project
							</a>
						</div>
					)}
				</Parallax>
				<MacbookPro className="mock-up" orientation="landscape" color="black">
					<Carousel
						showThumbs={false}
						autoPlay={true}
						infiniteLoop={true}
						showArrows={false}
						showStatus={false}
						showIndicators={false}
					>
						{project.Pictures &&
							project.Pictures.filter((picture) =>
								picture.name.includes('desktop'),
							).map((picture) => (
								<img
									key={picture.id}
									src={`${BACKEND}/storage/${picture.name}`}
									alt={picture.alt}
									style={{
										width: '100%',
										height: '100%',
										margin: 0,
										objectFit: 'contain',
									}}
								/>
							))}
					</Carousel>
				</MacbookPro>
				{window.innerWidth > 768 ? (
					<Parallax y={[-10, 10]}>
						<IPhone7
							height={250}
							className="mock-up"
							orientation="portrait"
							color="black"
						>
							<Carousel
								showThumbs={false}
								autoPlay={true}
								infiniteLoop={true}
								showArrows={false}
								showStatus={false}
								showIndicators={false}
							>
								{project.Pictures &&
									project.Pictures.filter((picture) =>
										picture.name.includes('mobile'),
									).map((picture) => (
										<img
											key={picture.id}
											src={`${BACKEND}/storage/${picture.name}`}
											alt={picture.alt}
											style={{
												width: '100%',
												height: '100%',
												margin: 0,
												objectFit: 'contain',
											}}
										/>
									))}
							</Carousel>
						</IPhone7>
					</Parallax>
				) : null}
			</div>
			<Parallax y={[10, -10]}>
				<p className="px-3 mt-4 px-lg-5 mx-lg-5 project-description">
					{project.description}
				</p>
			</Parallax>
		</section>
	);
};

export default WorkSection;
