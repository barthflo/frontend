import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Masonry from 'react-masonry-css';
import { BACKEND } from '../../../endpoints';
import { IoCloseOutline as DeleteIcon } from 'react-icons/io5';
import './DropZone.css';

const deleteFile = {
	position: 'absolute',
	top: 0,
	right: 0,
	cursor: 'pointer',
	width: 20,
	height: 20,
	minWidth: 'unset',
};

const DropZone = ({
	register,
	errors,
	setValue,
	prevFiles,
	filesToRemove,
	setFilesToRemove,
	setPdf,
}) => {
	const { pathname } = useLocation();
	const [files, setFiles] = useState([]);

	const handleRemove = (previewName) => {
		const temp = [...files];
		const newFiles = temp.filter((file) => file.name !== previewName);
		setFiles(newFiles);
		setValue('files', newFiles);
	};

	const handleRemoveExisting = (id, index) => {
		setFilesToRemove([
			...filesToRemove,
			...prevFiles.filter((file) => file.id === id),
		]);
		prevFiles.splice(index, 1);
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: ['image/*', 'application/pdf'],
		onDrop: (acceptedFiles) => {
			if (pathname.includes('resume')) {
				const preview = acceptedFiles.map((file) => {
					file.preview = URL.createObjectURL(file);
					return file;
				});
				setPdf(preview[0].preview);
				setValue('files', acceptedFiles);
			} else {
				const getHeightAndWidthFromDataUrl = (dataURL) =>
					new Promise((resolve) => {
						const img = new Image();
						img.onload = () => {
							resolve({
								height: img.height,
								width: img.width,
							});
						};
						img.src = dataURL;
					});
				const filesWithPreview = acceptedFiles.map((file) => {
					if (file.type.includes('image')) {
						file.preview = URL.createObjectURL(file);

						getHeightAndWidthFromDataUrl(file.preview)
							.then((res) => {
								file.width = res.width;
								file.height = res.height;
							})
							.catch((err) => console.log(err));
					}
					return file;
				});
				setFiles([...files, ...filesWithPreview]);
				setValue('files', [...files, ...acceptedFiles]);
			}
		},
	});

	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files],
	);
	return (
		<>
			<section className={`dropzone w-100 p-2 `}>
				<div
					{...getRootProps({
						className:
							'w-100 d-flex flex-column justify-content-center align-items-center p-5 position-relative',
					})}
				>
					<input {...getInputProps({})} />
					{pathname.includes('edit') ||
					pathname.includes('resume') ||
					pathname.includes('bio') ? (
						<p className="mb-0">
							{pathname.includes('resume')
								? 'Upload a new PDF'
								: "Drag 'n' drop some new files here or click to select files"}
						</p>
					) : (
						<>
							<p className="mb-0" {...register('files', { required: true })}>
								Drag 'n' drop some files here, or click to select files
							</p>
							{errors.files && errors.files.type === 'required' && (
								<p style={{ color: 'var(--secondary-color)' }}>
									Pictures required
								</p>
							)}
						</>
					)}
				</div>
			</section>

			<section className="previews mt-3">
				<Masonry
					breakpointCols={{ default: 4, 1200: 5, 568: 3 }}
					className="masonry-grid"
					columnClassName="masonry-col"
				>
					{prevFiles &&
						prevFiles.map((file, index) => (
							<div className="position-relative pb-4" key={file.id}>
								<img src={`${BACKEND}/storage/${file.name}`} alt={file.alt} />
								<div
									className="button-form"
									style={deleteFile}
									onClick={() => handleRemoveExisting(file.id, index)}
								>
									<div id="underline"></div>
									<DeleteIcon color={'white'} size="1.2em" />
								</div>
							</div>
						))}
					{files.map(
						(file, index) =>
							file.preview && (
								<div className="position-relative" key={index}>
									<img src={file.preview} alt={file.name} />
									<div
										className="button-form"
										style={deleteFile}
										onClick={() => handleRemove(file.name)}
									>
										<div id="underline"></div>
										<DeleteIcon color={'white'} size="1.2em" />
									</div>
								</div>
								// ) : (
								// 	<ul className="position-relative" key={index}>
								// 		<li>{file.name}</li>
								// 		<div
								// 			className="button-form"
								// 			style={deleteFile}
								// 			onClick={() => handleRemove(file.name)}
								// 		>
								// 			<div id="underline"></div>
								// 			<DeleteIcon color={'white'} size="1.2em" />
								// 		</div>
								// 	</ul>
								// ),
							),
					)}
				</Masonry>
			</section>
		</>
	);
};

export default DropZone;
