import React from 'react';
import { Chrono } from 'react-chrono';
import './TimeLineSection.css';
import { Parallax } from 'react-scroll-parallax';

const TimeLineSection = () => {
	const items = [
		{
			title: '6 Jan 1988',
			cardTitle: 'Saint Jean de Braye - France',
			cardSubtitle: 'Birth',
		},
		{
			title: 'Jun 2005',
			cardTitle: 'Lycée Benjamin Franklin - Orléans - France',
			cardSubtitle: 'A-level in Sciences and Engineering',
		},
		{
			title: 'Sept 2005 - Jun 2008',
			cardTitle:
				"Ecole Nationale Supérieure d'Architecture de Lyon - Lyon - France",
			cardSubtitle: 'Three years towards a bachelor degree in Architecture',
		},
		{
			title: 'Sept 2007 - Aug 2008',
			cardTitle: 'Unanime Architectes - Lyon - France',
			cardSubtitle: 'Intern Architect',
		},
		{
			title: 'Sept 2008 - Jun 2009',
			cardTitle: 'SA2T - VilleFranche-sur-Saone - France',
			cardSubtitle: 'Technical draftman',
		},
		{
			title: 'Jul 2009 - Jun 2010',
			cardTitle: 'Bloomsbury Bowling Lanes - London - UK',
			cardSubtitle: 'Barback',
		},
		{
			title: 'Sept 2010 - Oct 2013',
			cardTitle: 'Suite Hostel - Budapest - Hungary',
			cardSubtitle: 'Receptionnist',
		},
		{
			title: 'Oct 2013 - Nov 2016',
			cardTitle: 'Zigfrid Von Underbelly - Longon - UK',
			cardSubtitle: 'Bartender and Assistant Manager',
		},
		{
			title: 'Nov 2016 - Jun 2017',
			cardTitle: 'SomSaa - Longon - UK',
			cardSubtitle: 'Bartender',
		},
		{
			title: 'Jun 2017 - Jul 2018',
			cardTitle: 'Giant Robot - London - UK',
			cardSubtitle: 'Head Bartender',
		},
		{
			title: 'Sept 2018 - Mar 2020',
			cardTitle: 'World',
			cardSubtitle: 'Travelling the world without flying',
		},
		{
			title: 'Sept 2020 - Feb 2021',
			cardTitle: 'Wild Code School - Orléans - France',
			cardSubtitle: 'Studies in web and web mobile development',
		},
		{
			title: 'Feb 2021 - June 2021',
			cardTitle: 'Enedis - Orléans - France',
			cardSubtitle:
				'Intern Web Developer -  Worked on an internal dashboard for drone monitoring',
		},
	];

	return (
		<section className="timeline-section d-flex flex-column align-items-center m-0">
			<Parallax x={[-20, 10]} y={[-30, 0]}>
				<h2 className="align-self-start mb-4">My resume</h2>
			</Parallax>

			<div style={{ width: window.innerWidth < 468 ? '100vw' : '90vw' }}>
				{/* <Parallax y={[5, -10]}> */}
				<Chrono
					items={items}
					itemWidth={400}
					hideControls={true}
					slideShow={true}
					allowDynamicUpdate
					// mode="VERTICAL"
					mode={window.innerWidth < 768 ? 'VERTICAL' : 'HORIZONTAL'}
					theme={{ primary: '#34343b', secondary: '#bf3326' }}
					onScrollEnd
				></Chrono>
				{/* </Parallax> */}
			</div>
		</section>
	);
};

export default TimeLineSection;
