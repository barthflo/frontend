import Logo from './Logo';
import Menu from './Menu';
import {useState} from 'react'

const NavContainer = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleShow = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);
    
    return (
        <div className="nav-container position-relative d-flex justify-content-center align-items-center flex-wrap flex-sm-nowrap justify-content-sm-around w-100 pb-4" onMouseLeave={() => setShowMenu(false)}>
            <Logo showMenu={showMenu} handleShow={handleShow}/>
            <Menu className={showMenu ? "visible" : "invisible"} closeMenu={closeMenu}/>
        </div>
    )
}

export default NavContainer
