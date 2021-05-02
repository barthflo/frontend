import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import BannerImage from '../components/BannerImage/BannerImage';
import ProjectFormCreate from '../components/Admin/ProjectFormCreate';
import CategoriesForm from '../components/Admin/CategoriesForm';
import DropZone from '../components/Admin/DropZone';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { BACKEND } from '../endpoints';

const AdminWorksCreate = () => {
	const [values, setValues] = useState({
		title: '',
		description: '',
		link_url: '',
		categories: [],
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const response = await Axios.post(`${BACKEND}/projects`, data, {
				withCredentials: true,
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchCategories = useCallback(async () => {
		try {
			const response = await Axios.get(`${BACKEND}/projects/categories`);
			setValues({ ...values, categories: response.data });
		} catch (err) {
			console.log(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<>
			<Helmet>
				<title>Admin Add Work - Flo Barth Web Developer</title>
				<meta name="description" content="Add a new project" />
			</Helmet>
			<main className="works-page w-100 pb-5">
				<BannerImage
					backgroundImage={`${process.env.PUBLIC_URL}/assets/abstractsquares.jpg`}
				/>

				<div className="d-flex flex-column p-4">
					<form
						id="project-create-form"
						className="admin grid "
						onSubmit={handleSubmit(onSubmit)}
					>
						<ProjectFormCreate
							errors={errors}
							register={register}
							values={values}
						/>
						<CategoriesForm
							register={register}
							categories={values.categories}
							setValue={setValue}
						/>
						<DropZone />
					</form>
					<button
						className="button-form align-self-end"
						type="submit"
						form="project-create-form"
					>
						<div id="underline"></div>
						Save
					</button>
				</div>
			</main>
		</>
	);
};

export default AdminWorksCreate;
