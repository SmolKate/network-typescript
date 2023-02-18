import React from "react";
import s from './Navbar.module.css';
import FriendsContainer from "./Friends/FriendsContainer";
import NavItem from './NavItem'

const Navbar = (props) => {

    // Array with data about navigation buttons
    
    const navList = [
        {title: 'Profile', link: '/profile'},
        {title: 'Chats', link: '/dialogs'},
        {title: 'Users', link: '/users'},
        {title: 'News', link: '/news'},
        {title: 'Music', link: '/music'},
        {title: 'Settings', link: '/settings'}
    ]

    // Creating the list of Components for every navigation button

    const navLink = navList.map(nav => <NavItem key={nav.title} nav={nav}/>)

    return (
        <div className = {s.nav}>
            <nav>{navLink}</nav>
        <div className = {s.friend}>
            <FriendsContainer store={props.store} />
        </div>
      </div>
    )
}
export default Navbar;