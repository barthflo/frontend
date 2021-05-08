import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav/NavContainer';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import AdminWorksList from './pages/AdminWorksList';
import AdminWorksCreate from './pages/AdminWorksCreate';
import AdminWorksEdit from './pages/AdminWorksEdit';
import AdminResumeList from './pages/AdminResumeList';
import AdminResumeCreate from './pages/AdminResumeCreate';
import AdminResumeEdit from './pages/AdminResumeEdit';
import AdminAbout from './pages/AdminBio';
import useAuth from './hooks/useAuth';

const routes = [
	{ path: '/', component: Home, exact: true },
	{ path: '/works', component: Works, exact: false },
	{ path: '/about', component: About, exact: false },
	{ path: '/contact', component: Contact, exact: false },
	{ path: '/login', component: Login, exact: false },
	{ path: '/admin', component: AdminHome, exact: true, guard: true },
	{
		path: '/admin/projects',
		component: AdminWorksList,
		exact: true,
		guard: true,
	},
	{
		path: '/admin/projects/create',
		component: AdminWorksCreate,
		exact: false,
		guard: true,
	},
	{
		path: '/admin/projects/:id/edit',
		component: AdminWorksEdit,
		exact: false,
		guard: true,
	},
	{
		path: '/admin/resume',
		component: AdminResumeList,
		exact: true,
		guard: true,
	},
	{
		path: '/admin/resume/create',
		component: AdminResumeCreate,
		exact: false,
		guard: true,
	},
	{
		path: '/admin/resume/:id/edit',
		component: AdminResumeEdit,
		exact: false,
		guard: true,
	},

	{ path: '/admin/bio', component: AdminAbout, exact: false, guard: true },
];

const App = () => {
	const { user } = useAuth();

	return (
		<div className="App">
			<Nav />
			<Switch>
				{routes.map((route, index) =>
					!user.isVerified && route.guard ? (
						<Redirect key={index} to="/login" />
					) : (
						<Route
							key={index}
							path={route.path}
							component={route.component}
							exact={route.exact}
						/>
					),
				)}
			</Switch>
		</div>
	);
};

export default App;
