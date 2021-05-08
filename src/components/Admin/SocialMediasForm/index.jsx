import React, { useState, useEffect, useCallback, useRef } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'react-simple-snackbar';
import { BACKEND } from '../../../endpoints';
import './SocialMediasForm.css';

const options = {
	position: 'bottom-right',
	style: {
		background: 'var(--primary-color-dark)',
		color: 'var(--color-light)',
		fontFamily: 'var(--secondary-font)',
		fontSize: '.8em',
		fontWeight: 600,
		textTransform: 'uppercase',
		boxShadow: '2px 2px 1px -2px #585864',
		letterSpacing: 1.5,
		border: 'none',
		borderRadius: 0,
		padding: 0,
		textAlign: 'center',
	},
	closeStyle: {
		color: 'var(--color-light)',
	},
};

const SocialMediasForm = () => {
	const [socialMedias, setSocialMedias] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const formRef = useRef();
	const [openSnackbar] = useSnackbar(options);

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();

			const length = Object.entries(data).length / Number(formRef.current.id);
			const datas = [];
			for (const item of Object.entries(data)) {
				datas.push(item);
			}
			const obj = [];
			for (let i = 1; i <= length; i++) {
				const filtering = datas.filter(
					(data) => data && data[0].includes(i) && data,
				);
				obj.push(Object.fromEntries(filtering));
			}
			const formated = obj.map((item) => {
				const key = Object.keys(item)[0];
				const id = key.split('-').pop();
				return {
					id,
					name: item[Object.keys(item)[0]],
					linkTo: item[Object.keys(item)[1]],
					files: item[Object.keys(item)[2]],
				};
			});

			// eslint-disable-next-line array-callback-return
			formated.map((data) => {
				if (data.files.length) {
					formData.append('files', data.files[0]);
					formData.append('filename', data.id);
				}
				formData.append('id', data.id);
				formData.append('name', data.name);
				formData.append('linkTo', data.linkTo);

				Axios.put(`${BACKEND}/contact`, formData, {
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
					.then((res) => {
						openSnackbar(res.data.success);
						reset();
					})
					.catch((err) => {
						console.log(err);
						openSnackbar('An error occured');
					});
			});
		} catch (err) {
			console.log(err);
		}
	};

	const fetchSocialMedias = useCallback(async () => {
		try {
			const res = await Axios.get(`${BACKEND}/contact`);
			if (res.status === 400) {
				console.log(res.data);
			}
			setSocialMedias(res.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchSocialMedias();
	}, [fetchSocialMedias]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="resume-form d-flex flex-column p-3 ml-md-1 mb-2 mb-md-0"
			id="links"
		>
			<h2 className="mb-2">Social Medias</h2>
			{socialMedias.map((media, index) => {
				return (
					<section key={media.id} id={media.id} ref={formRef}>
						<h5 className="mb-0">Link #{index + 1}</h5>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="name" hidden>
								Name
							</label>
							<input
								className={`flex-grow-1 p-1 px-2 ${
									errors[`name-${media.id}`] ? ' form-error' : ''
								}`}
								type="text"
								name="name"
								id="name"
								placeholder="Name"
								defaultValue={media.name}
								{...register(`name-${media.id}`, { required: true })}
							/>
							<div className="square mr-2"></div>
							{errors[`name-${media.id}`] &&
								errors[`name-${media.id}`].type === 'required' && (
									<p className="form-error-label">Required field</p>
								)}
						</div>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="url" hidden>
								Link Url
							</label>
							<input
								className={`flex-grow-1 p-1 px-2 ${
									errors[`url${media.id}`] ? ' form-error' : ''
								}`}
								type="text"
								name="url"
								id="url"
								placeholder="Link Url"
								defaultValue={media.linkTo}
								{...register(`url-${media.id}`, { required: true })}
							/>
							<div className="square mr-2"></div>
							{errors[`url${media.id}`] &&
								errors[`url${media.id}`].type === 'required' && (
									<p className="form-error-label">Required field</p>
								)}
						</div>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="logo" hidden>
								Logo
							</label>
							<input
								className={` p-1 px-2`}
								type="file"
								name="logo"
								id="logo"
								{...register(`logo-${media.id}`)}
							/>
							<div className="square mr-2"></div>
						</div>
					</section>
				);
			})}
			<div className="actions align-self-stretch align-self-sm-end  align-self-md-stretch mt-3">
				<button className="button-form px-3 " type="submit">
					<div id="underline"></div>
					Save
				</button>
			</div>
		</form>
	);
};

export default SocialMediasForm;
