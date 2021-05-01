/* eslint-disable no-unused-vars */
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import './Menu.css';

const menuItems = [
	{ title: 'Home', path: '/', admin: false },
	{ title: 'Works', path: '/works', admin: false },
	{ title: 'About', path: '/about', admin: false },
	{ title: 'Contact', path: '/contact', admin: false },
	{ title: 'Login', path: '/login', admin: false },
	{ title: 'Overview', path: '/admin', admin: true },
	{ title: 'Projects View', path: '/admin/projects', admin: true },
	{ title: 'Resume', path: '/admin/resume', admin: true },
	{ title: 'About and Links', path: '/admin/bio', admin: true },
];

const Menu = ({ className, closeMenu }) => {
	const pathname = useHistory().location.pathname;
	const { user, setUser } = useAuth();
	const [_cookies, _setCookie, removeCookie] = useCookies();

	useEffect(() => {
		const login = menuItems.find((item) => item.path === '/login');

		if (user.isVerified) {
			login.title = 'Admin';
		} else {
			login.title = 'Login';
		}
	}, [user]);
	return (
		<div className={'menu mt-4 mt-sm-0 ' + className}>
			<ul className="list-unstyled d-inline-flex flex-wrap justify-content-around align-items-center w-100 h-100 mb-0">
				{!pathname.includes('admin')
					? window.innerWidth < 768
						? menuItems
								.filter(
									(item) =>
										item.title !== 'Login' &&
										item.title !== 'Admin' &&
										!item.admin,
								)
								.map((item, index) => (
									<li
										className={
											pathname === item.path ? 'menu-item-active' : null
										}
										key={index}
										onClick={closeMenu}
									>
										<Link to={item.path}>{item.title}</Link>
									</li>
								))
						: menuItems
								.filter((item) => !item.admin)
								.map((item, index) => (
									<li
										className={
											pathname === item.path ? 'menu-item-active' : null
										}
										key={index}
										onClick={closeMenu}
									>
										<Link to={item.path}>{item.title}</Link>
									</li>
								))
					: window.innerWidth > 768 && (
							<>
								{menuItems
									.filter((item) => item.admin)
									.map((item, index) => (
										<li
											className={
												pathname === item.path ? 'menu-item-active' : null
											}
											key={index}
											onClick={closeMenu}
										>
											<Link to={item.path}>{item.title}</Link>
										</li>
									))}
								<li>
									<Link
										onClick={() => {
											localStorage.removeItem('user');
											removeCookie('accessToken');
											setUser(false, null);
										}}
										to="/login"
									>
										Exit
									</Link>
								</li>
							</>
					  )}
			</ul>
		</div>
	);
};

export default Menu;
