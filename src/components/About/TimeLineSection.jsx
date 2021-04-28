import React, { useCallback, useEffect, useState } from 'react';
import { Chrono } from 'react-chrono';
import './TimeLineSection.css';
import { Parallax } from 'react-scroll-parallax';
import { BACKEND } from '../../endpoints';
import Axios from 'axios';

const TimeLineSection = () => {
	const [data, setData] = useState([]);

	const fetchData = useCallback(async () => {
		try {
			const res = await Axios.get(`${BACKEND}/resume`);
			setData(res.data);
		} catch (err) {
			console.log(err.response);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<section className="timeline-section d-flex flex-column align-items-center m-0">
			<Parallax x={[-20, 10]} y={[-30, 0]} className="order-1">
				<h2 className="align-self-start my-4">My resume</h2>
			</Parallax>

			<div
				style={{ width: window.innerWidth < 468 ? '100vw' : '90vw' }}
				className="order-2 order-sm-3 mb-4"
			>
				<Chrono
					items={data}
					itemWidth={400}
					hideControls={true}
					allowDynamicUpdate
					mode={window.innerWidth < 768 ? 'VERTICAL' : 'HORIZONTAL'}
					theme={{ primary: '#34343b', secondary: '#fcb591 ' }}
				></Chrono>
			</div>
			<div className="button-project order-3 order-sm-2">
				<div id="underline"></div>
				<a
					href={`${BACKEND}/storage/CV_FlorentBarth_DéveloppeurWebEtMobile.pdf`}
					download="CV_Florent_BARTH.pdf"
				>
					Download PDF
				</a>
			</div>
		</section>
	);
};

export default TimeLineSection;
