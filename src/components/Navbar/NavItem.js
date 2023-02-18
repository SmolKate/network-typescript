import React from "react";
import s from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const NavItem = ({nav}) => {
    
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        navigate(nav.link)
    }
    
    return (
        <div className = {s.item}>
            <button className = {s.navBtn + ' ' + (location.pathname === nav.link ? s.active : '')} onClick={handleClick} >
                {nav.title}
            </button>
        </div>
    )
}

export default NavItem;