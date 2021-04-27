import React from 'react';
import { useForm } from 'react-hook-form';
import { RiSendPlaneFill as SendIcon } from 'react-icons/ri';
import './ContactForm.css';
import emailjs, { init } from 'emailjs-com';
import { useSnackbar } from 'react-simple-snackbar';
init('user_tho81D94A14QYrTqlflOC');

const ContactForm = () => {
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
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const values = {
		name: '',
		email: '',
		object: '',
		message: '',
	};

	const onSubmit = (data, e) => {
		console.log(data);
		openSnackbar('Sending your message...');
		emailjs
			.send('service_kdrq9sg', 'template_16lw92i', {
				from_name: data.name,
				to_name: 'Flo',
				object: data.object,
				message: data.message,
				reply_to: data.email,
			})
			.then((res) => {
				console.log(res);
				openSnackbar('Your message has been sent!');
				reset();
			})
			.catch((err) => {
				console.log(err);
				openSnackbar('An error has occured. Please try again');
			});
	};

	console.log(values);
	return (
		<section className="contact flex-sm-grow-1 d-flex flex-column justify-content-around px-4 pt-5 pb-2 p-sm-5 ">
			<div>
				<h3 className="text-center mb-4">Having a question?</h3>
				<h4 className="text-left mb-4">
					Fill in the form below and I'll get back to you shortly :){' '}
				</h4>
			</div>

			<form
				id="contactForm"
				className="w-100 d-flex flex-column"
				onSubmit={handleSubmit(onSubmit)}
			>
				<p className="font-italic small">
					** None of your informations will be stored in the system
				</p>
				<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3">
					<label htmlFor="name" hidden>
						Your name
					</label>
					<input
						className={`flex-grow-1 p-1 px-2 ${
							errors.name ? ' form-error' : ''
						}`}
						type="text"
						name="name"
						id="name"
						placeholder="Your name"
						defaultValue={values.name}
						{...register('name', { required: true })}
					/>
					<div className="square mr-2"></div>

					{errors.name && errors.name.type === 'required' && (
						<p className="form-error-label">Required field</p>
					)}
				</div>
				<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3">
					<label htmlFor="email" hidden>
						Your name
					</label>
					<input
						className={`flex-grow-1 p-1 px-2 ${
							errors.email ? ' form-error' : ''
						}`}
						type="text"
						name="email"
						id="email"
						placeholder="Your email address"
						defaultValue={values.email}
						{...register('email', {
							required: true,
							pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
						})}
					/>
					<div className="square mr-2"></div>

					{errors.email && errors.email.type === 'required' && (
						<p className="form-error-label">Required field</p>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<p className="form-error-label">Invalid email</p>
					)}
				</div>
				<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3">
					<label htmlFor="object" hidden>
						Object of your message
					</label>
					<input
						className={`flex-grow-1 p-1 px-2 ${
							errors.object ? ' form-error' : ''
						}`}
						type="text"
						name="object"
						id="object"
						placeholder="Specify the object of your message"
						defaultValue={values.object}
						{...register('object', {
							required: true,
						})}
					/>
					<div className="square mr-2"></div>

					{errors.object && <p className="form-error-label">Required field</p>}
				</div>
				<div className="input-container d-flex flex-row-reverse align-items-center mb-2 py-3">
					<label htmlFor="message" hidden>
						Your message
					</label>
					<textarea
						name="message"
						id="message"
						placeholder="Your message"
						className={`flex-grow-1 p-1 px-2 ${
							errors.message ? ' form-error' : ''
						}`}
						defaultValue={values.message}
						{...register('message', {
							required: true,
						})}
					/>
					<div className="square mr-2"></div>
					{errors.message && <p className="form-error-label">Required field</p>}
				</div>
				<button
					type="submit"
					className="button-form align-self-end"
					title="Send message"
				>
					<div id="underline"></div>
					Send
					<SendIcon />
				</button>
			</form>
		</section>
	);
};

export default ContactForm;
