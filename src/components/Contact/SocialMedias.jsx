import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BACKEND } from '../../endpoints';

const SocialMedias = () => {
	const [socialMedias, setSocialMedias] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await Axios.get(`${BACKEND}/contact`);
				setSocialMedias(res.data);
			} catch (err) {
				console.log(err.response.data);
			}
		})();
	}, []);

	return (
		<section className="social flex-sm-shrink px-4 pt-2 pb-5 p-sm-5 d-flex flex-wrap flex-sm-column  justify-content-around align-items-center">
			<h3 className="text-center text-capitalize w-100 mb-5 mb-sm-0">
				Or find me here
			</h3>
			{socialMedias.map((item, index) => (
				<a
					key={index}
					href={item.linkTo}
					title={`Link to ${item.name}`}
					target="_blank"
					rel="noreferrer"
				>
					<img src={`${BACKEND}/storage/${item.image}`} alt={item.name} />
				</a>
			))}
		</section>
	);
};

export default SocialMedias;
