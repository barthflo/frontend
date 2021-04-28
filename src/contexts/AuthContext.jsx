/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setAuthUser] = useState({ isVerified: false, user: null });

	const setUser = (verified, user) => {
		setAuthUser({ isVerified: verified, user: user });
	};

	useEffect(() => {
		if (localStorage.getItem('user')) {
			setAuthUser({
				isVerified: true,
				user: JSON.parse(localStorage.getItem('user')).value,
			});
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem('user')) {
			const expireDate = JSON.parse(localStorage.getItem('user')).expiry;
			const now = new Date().getTime();
			if (now > expireDate) {
				localStorage.removeItem('user');
				setAuthUser({ isVerified: false, user: null });
			}
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
