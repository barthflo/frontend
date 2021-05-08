import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { BACKEND } from '../../../endpoints';
import { useForm } from 'react-hook-form';
import DropZone from '../DropZone';
import { useSnackbar } from 'react-simple-snackbar';
import './AboutForm.css';

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

const AboutForm = () => {
	const [bio, setBio] = useState();
	let [picturesToRemove, setPicturesToRemove] = useState([]);
	const [prevFiles, setPrevFiles] = useState([]);
	const [progress, setProgress] = useState(0);
	const [openSnackbar] = useSnackbar(options);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const progressBar = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: `${progress}%`,
		height: 2,
		backgroundColor: 'var(--primary-color-dark)',
		zIndex: 10000,
	};

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append('description', data.bio);
		if (picturesToRemove.length && !data.files) {
			openSnackbar('You need to upload one file');
			return;
		}
		if (data.files) {
			if (data.files.length > 0 && !picturesToRemove.length) {
				openSnackbar('A picture is already present');
				return;
			} else {
				// eslint-disable-next-line array-callback-return
				data.files.map((file) => {
					formData.append('filename', file.name);
					formData.append('files', file);
				});
			}
		}
		if (picturesToRemove.length) {
			picturesToRemove = picturesToRemove.map((pic) => pic.name);
			formData.append('picturesToRemove', picturesToRemove);
		}

		try {
			const response = await Axios.put(`${BACKEND}/about/${bio.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
				onUploadProgress: (progressEvent) =>
					setProgress(
						Math.round((100 * progressEvent.loaded) / progressEvent.total),
					),
			});
			console.log(response);
			// reset();
			openSnackbar(response.data.success);
			fetchBio();
			setProgress(0);
		} catch (err) {
			console.log(err);
			setProgress(0);
		}
	};

	const fetchBio = useCallback(async () => {
		try {
			const res = await Axios.get(`${BACKEND}/about`);
			console.log(res);
			setBio(res.data[0]);
			setPrevFiles([res.data[0].picture]);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchBio();
	}, [fetchBio]);

	// console.log(bio);
	return (
		<>
			<div className="progress-bar" style={progressBar}></div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="resume-form d-flex flex-column w-100 p-3 mr-md-1 flex-grow-1 mb-2 mb-md-0"
			>
				<h2 className="mb-2">Biography</h2>
				{bio && (
					<>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="bio" hidden>
								Biography
							</label>
							<textarea
								className={`flex-grow-1 p-1 px-2 ${
									errors.bio ? ' form-error' : ''
								}`}
								type="text"
								name="bio"
								id="bio"
								placeholder="Biography"
								defaultValue={bio.description}
								{...register('bio', { required: true })}
							/>
							<div className="square mr-2"></div>
							{errors.bio && errors.bio.type === 'required' && (
								<p className="form-error-label">Required field</p>
							)}
						</div>

						<DropZone
							setValue={setValue}
							errors={errors}
							prevFiles={prevFiles}
							filesToRemove={picturesToRemove}
							setFilesToRemove={setPicturesToRemove}
						/>
					</>
				)}
				<div className="actions align-self-stretch align-self-sm-end mt-3">
					<button className="button-form px-3" type="submit">
						<div id="underline"></div>
						Save
					</button>
				</div>
			</form>
		</>
	);
};

export default AboutForm;
