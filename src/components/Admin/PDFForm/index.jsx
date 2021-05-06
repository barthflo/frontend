import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BACKEND } from '../../../endpoints';
import DropZone from '../DropZone';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useSnackbar } from 'react-simple-snackbar';
import './PDFForm.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFForm = () => {
	const [pdf, setPdf] = useState([]);
	const [progress, setProgress] = useState(0);
	const {
		register,
		handleSubmit,
		// formState: { errors },
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
	const [openSnackbar] = useSnackbar(options);

	const onSubmit = async (data) => {
		if (Object.keys(data).length) {
			try {
				const formData = new FormData();
				data.files.map((file) => formData.append('files', file));

				const res = await Axios.post(`${BACKEND}/resume/pdf`, formData, {
					withCredentials: true,
					onUploadProgress: (progressEvent) =>
						setProgress(
							Math.round((100 * progressEvent.loaded) / progressEvent.total),
						),
				});

				openSnackbar(res.data.success);
				reset();
				setProgress(0);
			} catch (err) {
				console.log(err);
			}
		} else {
			openSnackbar('You need to upload a new PDF');
		}
	};

	const fetchPDF = useCallback(async () => {
		try {
			const res = await Axios.get(`${BACKEND}/resume/pdf`);
			setPdf(`${BACKEND}/storage/${res.data.name}`);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchPDF();
	}, [fetchPDF]);

	return (
		<>
			<div className="progress-bar" style={progressBar}></div>

			<form
				className="flex-grow-0 px-4 py-2 pdf-container"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h3 className="mt-1 mb-3">CV Preview</h3>
				{pdf.length && (
					<Document file={pdf} className="w-100" style={{ minHeight: 200 }}>
						<Page
							pageNumber={1}
							renderAnnotationLayer={false}
							renderTextLayer={false}
							className="pdf-document"
						/>
					</Document>
				)}
				<DropZone register={register} setValue={setValue} setPdf={setPdf} />
				<button type="submit" className="button-form w-100 mt-3">
					<div id="underline"></div>
					Save
				</button>
			</form>
		</>
	);
};

export default PDFForm;
