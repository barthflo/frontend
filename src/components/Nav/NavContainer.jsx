import Logo from './Logo';
import Menu from './Menu';
import { useState } from 'react';

const NavContainer = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [positionFixed, setPositionFixed] = useState(false);
	const [background, setBackground] = useState(false);
	const handleShow = () => setShowMenu(true);
	const closeMenu = () => setShowMenu(false);
	const position = () => {
		if (window.scrollY > 24) {
			setPositionFixed(true);
			setBackground(true);
		} else {
			setPositionFixed(false);
			setBackground(false);
		}
	};
	window.addEventListener('scroll', position);

	return (
		<div
			className={
				'nav-container d-flex justify-content-center align-items-center flex-wrap justify-content-sm-around w-100 pb-4 ' +
				(positionFixed
					? `position-fixed mt-0 pt-0 pt-sm-3`
					: `position-relative pt-3`) +
				(background && showMenu ? ' nav-background' : ' ')
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
