import Logo from './Logo';
import Menu from './Menu';
import { useState } from 'react';

const NavContainer = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [background, setBackground] = useState(false);
	const handleShow = () => setShowMenu(true);
	const closeMenu = () => setShowMenu(false);
	const position = () => {
		if (window.scrollY > 24) {
			setBackground(true);
		} else {
			setBackground(false);
		}
	};
	window.addEventListener('scroll', position);

	return (
		<div
			className={
				'nav-container nav-background d-flex justify-content-center align-items-center flex-wrap justify-content-sm-around w-100 pb-4 pt-3 position-fixed ' +
				(background && showMenu ? ' show' : ' hidden')
			}
			onMouseLeave={() => setShowMenu(false)}
		>
			<Logo showMenu={showMenu} handleShow={handleShow} />
			<Menu
				className={showMenu ? 'visible' : 'invisible'}
				closeMenu={closeMenu}
			/>
		</div>
	);
};

export default NavContainer;
