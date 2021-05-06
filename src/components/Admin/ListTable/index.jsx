/* eslint-disable array-callback-return */
import React from 'react';
import { FiEdit as EditIcon } from 'react-icons/fi';
import {
	AiOutlineDelete as DeleteIcon,
	AiOutlineRollback as BackIcon,
} from 'react-icons/ai';
import { IoAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BACKEND } from '../../../endpoints';
import { confirmAlert } from 'react-confirm-alert';
import { useSnackbar } from 'react-simple-snackbar';
import './ListTables.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

const ListTable = ({
	cols,
	rows,
	prefix,
	setRows,
	handleCheckBox,
	children,
	classes,
}) => {
	const [openSnackbar] = useSnackbar(options);

	const handleConfirm = (id) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="confirm-alert p-5">
						<h4>Are you sure?</h4>
						<p>This action will delete the data permanently</p>
						<div className="d-flex align-items-end justify-content-start">
							<button
								className="button-project mb-0 ml-0 mr-1"
								onClick={onClose}
							>
								<div id="underline"></div>
								Cancel
							</button>
							<button
								className="button-form"
								onClick={() => {
									handleDelete(id);
									onClose();
								}}
							>
								<div id="underline"></div>
								Confirm
							</button>
						</div>
					</div>
				);
			},
		});
	};

	const handleDelete = async (id) => {
		try {
			const res = await Axios.delete(`${BACKEND}/${prefix}/${id}`, {
				withCredentials: true,
			});
			openSnackbar(res.data.success);
			setRows(rows.filter((row) => row.id !== id));
		} catch (err) {
			console.log(err);
			openSnackbar((err.response && err.response.statusText) || err);
		}
	};

	return (
		<div className="d-flex flex-column w-100">
			<div className="table-responsive table-container d-flex flex-column flex-md-row ">
				<table className={'table mb-0 ' + classes}>
					<thead>
						<tr>
							{cols.map((col, index) => (
								<th scope="col" key={index}>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							return (
								<tr key={index}>
									{Object.entries(row)
										// .filter((item) => item[0] !== 'id')
										.map((item, index) => {
											if (typeof item[1] === 'boolean') {
												return (
													<td key={index}>
														<input
															type="checkbox"
															name="published"
															id="publishedCheck"
															// value={item[1]}
															defaultChecked={item[1]}
															onChange={(e) => {
																item[1] = !item[1];
																console.log(e.target.checked);
																handleCheckBox(e.target.checked, row.id);
															}}
														/>
													</td>
												);
											}
											if (item[0] !== 'id') {
												return <td key={index}>{item[1]}</td>;
											}
										})}
									<td>
										<div className="d-flex justify-content-end">
											<button className="button-project m-0 mr-1">
												<div id="underline"></div>
												<Link
													to={`/admin/${prefix}/${row.id}/edit`}
													className="p-0"
												>
													<EditIcon size="1.3em" color="#5b666a" />
												</Link>
											</button>
											<button
												className="button-project m-0"
												onClick={() => handleConfirm(row.id)}
											>
												<div id="underline"></div>

												<DeleteIcon size="1.3em" color="#5b666a" />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{children}
			</div>
			<div className="align-self-end mt-3">
				<button className="button-project m-0 mr-3">
					<div id="underline"></div>
					<Link to="/admin" className="p-0">
						Back
						<BackIcon color="#5b666a" size="1.3em" />
					</Link>
				</button>
				<button className="button-form px-3" style={{ width: 'fit-content' }}>
					<div id="underline"></div>
					<Link to={`/admin/${prefix}/create`} className="p-0">
						Add {prefix === 'resume' ? ' an experience' : ` a project`}
						<IoAddSharp color="f1f0f2" size="1.3em" />
					</Link>
				</button>
			</div>
		</div>
	);
};

export default ListTable;
