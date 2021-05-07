import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import './ResumeForm.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import Axios from 'axios';
import { BACKEND } from '../../../endpoints';
import { useSnackbar } from 'react-simple-snackbar';

moment.locale('en-gb');

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

const ResumeForm = ({ values }) => {
	const [openSnackbar] = useSnackbar(options);
	const history = useHistory();
	console.log(history.location.pathname);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();
	const [selectionRange, setSelectionRange] = useState([
		{
			startDate: moment(values.start).toDate(),
			endDate: moment(values.end).isValid()
				? moment(values.end).toDate()
				: moment(values.start).toDate(),
			key: 'selection',
			color: '#229485',
		},
	]);

	const handleSelect = (ranges) => {
		console.log(ranges);
		setSelectionRange([ranges.selection]);
		setValue('start', moment(ranges.selection.startDate).format('YYYY-MM-DD'));
		setValue('end', moment(ranges.selection.endDate).format('YYYY-MM-DD'));
	};

	const onSubmit = async (data) => {
		console.log(data);
		try {
			if (!data.start) {
				data.start = moment(values.start).format('YYYY-MM-DD');
				data.end = moment(values.end).isValid()
					? moment(values.end).format('YYYY-MM-DD')
					: moment(values.start).format('YYYY-MM-DD');
			}
			if (data.start === data.end) {
				data.end = null;
			}
			let res;
			if (history.location.pathname.includes('create')) {
				res = await Axios.post(`${BACKEND}/resume`, data, {
					withCredentials: true,
				});
				console.log(res);
			}

			if (history.location.pathname.includes('edit')) {
				res = await Axios.put(`${BACKEND}/resume/${values.id}`, data, {
					withCredentials: true,
				});
				console.log(res);
			}
			reset();
			openSnackbar(res.data.success);
			history.push('/admin/resume');
		} catch (err) {
			console.log(err);
			openSnackbar((err.response && err.response.statusText) || err);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="resume-form d-flex flex-column w-100 p-3"
				id="resume-form"
			>
				<h2 className="mb-2">Experience Details</h2>

				<div className="main-container d-flex flex-column flex-md-row">
					<section className="flex-grow-1 mr-md-1">
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="cardTitle" hidden>
								Experience Title
							</label>
							<input
								className={`flex-grow-1 p-1 px-2 ${
									errors.cardTitle ? ' form-error' : ''
								}
                    `}
								type="text"
								name="cardTitle"
								id="cardTitle"
								placeholder="Title"
								defaultValue={values.cardTitle}
								{...register('cardTitle', { required: true })}
							/>
							<div className="square mr-2"></div>
							{errors.cardTitle && errors.cardTitle.type === 'required' && (
								<p className="form-error-label">Required field</p>
							)}
						</div>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="cardSubtitle" hidden>
								Experience Position
							</label>
							<input
								className={`flex-grow-1 p-1 px-2 ${
									errors.cardSubtitle ? ' form-error' : ''
								}
                    `}
								type="text"
								name="cardSubtitle"
								id="cardSubtitle"
								placeholder="Position"
								defaultValue={values.cardSubtitle}
								{...register('cardSubtitle', { required: true })}
							/>
							<div className="square mr-2"></div>
							{errors.cardSubtitle &&
								errors.cardSubtitle.type === 'required' && (
									<p className="form-error-label">Required field</p>
								)}
						</div>
						<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
							<label htmlFor="cardDetailedText" hidden>
								Experience Description
							</label>
							<textarea
								className={`flex-grow-1 p-1 px-2 `}
								type="text"
								name="cardDetailedText"
								id="cardDetailedText"
								placeholder="Description"
								defaultValue={values.cardDetailedText}
								{...register('cardDetailedText')}
							/>
							<div className="square mr-2"></div>
						</div>
					</section>
					<section
						className={`ml-md-1 flex-grow-1 flex-md-grow-0 flex-md-shrink-1 position-relative ${
							errors.date ? ' form-error' : ''
						}`}
						// {...register('date', { required: true })}
					>
						<DateRange
							ranges={selectionRange}
							moveRangeOnFirstSelection={false}
							editableDateInputs={true}
							onChange={handleSelect}
							scroll={{ enabled: true }}
						/>
						{errors.date && errors.date.type === 'required' && (
							<p className="form-error-label m-0">Required</p>
						)}
					</section>
				</div>
			</form>
			<div className="align-self-end mt-3">
				<button className="button-project m-0 mr-3">
					<div id="underline"></div>
					<Link to="/admin/resume" className="p-0">
						Cancel
					</Link>
				</button>
				<button
					className="button-form px-3"
					form="resume-form"
					type="submit"
					style={{ width: 'fit-content' }}
				>
					<div id="underline"></div>
					Save
				</button>
			</div>
		</>
	);
};

export default ResumeForm;
