import React from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';
import { useForm } from 'react-hook-form';
import { RiLoginBoxLine as ConnectIcon } from 'react-icons/ri';
import useAuth from '../../hooks/useAuth';
import Axios from 'axios';
import { BACKEND } from '../../endpoints';

const LoginForm = () => {
	const history = useHistory();
	const { setUser } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm();

	const values = {
		name: '',
		password: '',
	};

	const setWithExpiry = (key, value, ttl) => {
		const now = new Date();
		const item = {
			value: value,
			expiry: now.getTime() + ttl,
		};
		localStorage.setItem(key, JSON.stringify(item));
	};

	const onSubmit = (data, e) => {
		e.preventDefault();

		Axios.post(`${BACKEND}/auth/login`, data, {
			withCredentials: true,
			credentials: 'include',
		})
			.then((res) => {
				console.log(res.data);
				reset();
				setWithExpiry('user', res.data.user, 86400000);
				setUser(true, res.data.user);
				history.push('/admin');
			})
			.catch((error) => {
				console.log(error);
				if (error.response && error.response.status === 404) {
					setError('name', {
						type: 'submit',
						message: error.response.data,
					});
					setUser(false, null);
				}
				if (error.response && error.response.status === 403) {
					setError('password', {
						type: 'submit',
						message: error.response.data,
					});
					setUser(false, null);
				}
			});
	};

	return (
		<form
			id="loginForm"
			onSubmit={handleSubmit(onSubmit)}
			className="d-flex flex-column align-items-center px-4 py-3 px-sm-5"
		>
			<h2 className="py-3 w-50 text-center">Login</h2>
			<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
				<label htmlFor="name" hidden>
					Your name
				</label>
				<input
					className={`flex-grow-1 p-1 px-2 ${errors.name ? ' form-error' : ''}
                    `}
					type="text"
					name="name"
					id="name"
					placeholder="Name"
					defaultValue={values.name}
					{...register('name', { required: true })}
				/>
				<div className="square mr-2"></div>
				{errors.name && errors.name.type === 'required' && (
					<p className="form-error-label">Required field</p>
				)}
				{errors.name && errors.name.type === 'submit' && (
					<p className="form-error-label">{errors.name.message}</p>
				)}
			</div>
			<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3 w-100">
				<label htmlFor="name" hidden>
					Your name
				</label>
				<input
					className={`flex-grow-1 p-1 px-2 ${
						errors.password ? ' form-error' : ''
					}
                    `}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					defaultValue={values.password}
					{...register('password', { required: true })}
				/>
				<div className="square mr-2"></div>
				{errors.password && errors.password.type === 'required' && (
					<p className="form-error-label">Required field</p>
				)}
				{errors.password && errors.password.type === 'submit' && (
					<p className="form-error-label">{errors.password.message}</p>
				)}
			</div>
			<button
				type="submit"
				className="button-form align-self-end"
				title="Connect"
			>
				<div id="underline"></div>
				Connect
				<ConnectIcon />
			</button>
		</form>
	);
};

export default LoginForm;
