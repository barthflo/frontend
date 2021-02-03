import {Link, useHistory} from 'react-router-dom'
import './Menu.css'

const menuItems = [
    { title :'Home', path : '/'},
    { title :'Works', path : '/works'},
    { title :'About', path : '/about'},
    { title :'Contact', path : '/contact'},
    { title :'Login', path: '/admin'}
]

const Menu = ({className, closeMenu}) => {

    const pathname = useHistory().location.pathname;

    return (
        <div className={"menu mt-4 mt-sm-0 " + className}>
            <ul className="list-unstyled d-inline-flex justify-content-around align-items-center w-100 h-100 mb-0">
                {window.innerWidth < 768 ? 
                menuItems.filter(item => item.title !== "Login").map((item, index) => 
                    <li className={pathname === item.path ? "menu-item-active" : null} key={index} onClick={closeMenu}>
                        <Link to={item.path}>{item.title}</Link>
                    </li> 
                ) :
                menuItems.map((item, index) => 
                    <li className={pathname === item.path ? "menu-item-active" : null} key={index} onClick={closeMenu}>
                        <Link to={item.path}>{item.title}</Link>
                    </li> 
                    )
                }
            </ul> 
        </div>
    )
}

export default Menu
