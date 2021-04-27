import { Helmet } from 'react-helmet';
import LoginForm from '../components/LoginForm/LoginForm';
import useAuth from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const { user } = useAuth();
	return (
		<>
			{user.isVerified ? (
				<Redirect to="/admin" />
			) : (
				<>
					<Helmet>
						<title>Home - Flo Barth Web Developer</title>
						<meta
							name="description"
							content="Login page - Enter your credentials to login"
						/>
					</Helmet>
					<main className="home-page d-flex justify-content-center align-items-end align-items-md-center w-100">
						<LoginForm />
					</main>
				</>
			)}
		</>
	);
};

export default Login;
