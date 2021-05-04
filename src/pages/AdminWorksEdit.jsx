import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ProjectFormCreate from '../components/Admin/ProjectFormCreate';
import CategoriesForm from '../components/Admin/CategoriesForm/Edit';
import DropZone from '../components/Admin/DropZone';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { BACKEND } from '../endpoints';

const AdminWorksEdit = () => {
	const { id } = useParams();
	const history = useHistory();
	const [project, setProject] = useState(null);
	const [categories, setCategories] = useState([]);
	const [progress, setProgress] = useState(0);
	let [picturesToRemove, setPicturesToRemove] = useState([]);
	console.log(picturesToRemove);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
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
		console.log(data);
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('link_url', data.link_url);
		formData.append('categories', data.results);
		if (data.files) {
			// eslint-disable-next-line array-callback-return
			data.files.map((file) => {
				let filename = file.name.split('.').slice(0, -1).join('.');
				let extension = file.name.split('.').pop();

				if (file.width > file.height) {
					formData.append('filename', filename + '.desktop.' + extension);
				} else {
					formData.append('filename', filename + '.mobile.' + extension);
				}

				formData.append('files', file);
			});
		}

		if (picturesToRemove) {
			picturesToRemove = picturesToRemove.map((pic) => pic.name);
			formData.append('picturesToRemove', picturesToRemove);
		}

		console.log(...formData);
		try {
			const response = await Axios.put(`${BACKEND}/projects/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
				onUploadProgress: (progressEvent) =>
					setProgress(
						Math.round((100 * progressEvent.loaded) / progressEvent.total),
					),
			});
			reset();
			history.push('/admin/projects');
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchCategories = useCallback(async () => {
		try {
			const response = await Axios.get(`${BACKEND}/projects/categories`);
			setCategories(response.data);
		} catch (err) {
			console.log(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchProject = useCallback(async () => {
		try {
			const response = await Axios.get(`${BACKEND}/projects/${id}`, {
				withCredentials: true,
			});
			setProject(response.data);
		} catch (err) {
			console.log(err);
		}
	}, [id]);

	useEffect(() => {
		fetchCategories();
		fetchProject();
	}, [fetchCategories, fetchProject]);

	return (
		<>
			<Helmet>
				<title>Edit Work - Admin - Flo Barth Web Developer</title>
				<meta name="description" content="Add a new project" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>
				<div className="progress-bar" style={progressBar}></div>
				<div className="d-flex flex-column p-4">
					{project && (
						<form
							id="project-create-form"
							className="admin grid mb-4"
							onSubmit={handleSubmit(onSubmit)}
						>
							<ProjectFormCreate
								errors={errors}
								register={register}
								values={project}
							/>
							<CategoriesForm
								register={register}
								categories={categories}
								setValue={setValue}
								prevCat={project.Categories}
							/>
							<DropZone
								setValue={setValue}
								errors={errors}
								prevFiles={project.Pictures}
								filesToRemove={picturesToRemove}
								setFilesToRemove={setPicturesToRemove}
							/>
							<div className="button-form-container d-flex flex-column flex-md-row">
								<Link
									to="/admin/projects"
									className="button-project align-self-end m-0 mb-3 m-md-3"
								>
									<div id="underline"></div>
									Cancel
								</Link>
								<button
									className="button-form align-self-end mb-3"
									type="submit"
									form="project-create-form"
								>
									<div id="underline"></div>
									Save
								</button>
							</div>
							<footer id="footer-project-create"></footer>
						</form>
					)}
				</div>
			</main>
		</>
	);
};

export default AdminWorksEdit;
