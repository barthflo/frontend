import React from 'react';
import './ProjectFormCreate.css';

const ProjectFormCreate = ({ errors, register, values }) => {
	return (
		<section className="project-form p-2 pt-3">
			<h2 className="ml-3 mb-2">Project Details</h2>

			<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
				<label htmlFor="title" hidden>
					Project Title
				</label>
				<input
					className={`flex-grow-1 p-1 px-2 ${errors.title ? ' form-error' : ''}
                    `}
					type="text"
					name="title"
					id="title"
					placeholder="Title"
					defaultValue={values.title}
					{...register('title', { required: true })}
				/>
				<div className="square mr-2"></div>
				{errors.title && errors.title.type === 'required' && (
					<p className="form-error-label">Required field</p>
				)}
			</div>
			<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
				<label htmlFor="description" hidden>
					Project Description
				</label>
				<textarea
					className={`flex-grow-1 p-1 px-2 ${
						errors.description ? ' form-error' : ''
					}
                    `}
					type="text"
					name="description"
					id="description"
					placeholder="Description"
					defaultValue={values.description}
					{...register('description', { required: true })}
				/>
				<div className="square mr-2"></div>
				{errors.description && errors.description.type === 'required' && (
					<p className="form-error-label">Required field</p>
				)}
			</div>
			<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
				<label htmlFor="link_url" hidden>
					Project URL
				</label>
				<input
					className={`flex-grow-1 p-1 px-2 ${
						errors.link_url ? ' form-error' : ''
					}
                    `}
					type="text"
					name="link_url"
					id="link_url"
					placeholder="Project URL"
					defaultValue={values.link_url}
					{...register('link_url', { required: true })}
				/>
				<div className="square mr-2"></div>
				{errors.link_url && errors.link_url.type === 'required' && (
					<p className="form-error-label">Required field</p>
				)}
			</div>
		</section>
	);
};

export default ProjectFormCreate;
