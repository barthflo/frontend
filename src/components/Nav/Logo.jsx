import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ showMenu, handleShow }) => {
	return (
		<Fragment>
			{window.innerWidth > 768 ? (
				<Link to="/">
					<div
						className="position-relative logo-outer pt-1"
						onMouseEnter={handleShow}
					>
						<div
							className={'logo-outer-border' + (showMenu ? ' rotate' : ' ')}
							// style={{
							// 	backgroundImage: `url(${process.env.PUBLIC_URL}/assets/abstractsquares.jpeg)`,
							// }}
						></div>
						<div className="logo-inner position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
							<h1>
								<span>F</span>
								<span>B</span>
							</h1>
						</div>
					</div>
				</Link>
			) : (
				<div className="position-relative logo-outer" onClick={handleShow}>
					<div
						className={'logo-outer-border' + (showMenu ? ' rotate' : ' ')}
						// style={{
						// 	backgroundImage: `url(${process.env.PUBLIC_URL}/assets/abstractsquares.jpeg)`,
						// }}
					></div>
					<div className="logo-inner position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
						<h1>
							<span>F</span>
							<span>B</span>
						</h1>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Logo;
