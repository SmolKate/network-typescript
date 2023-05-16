import React, { FC } from "react";
import s from './Navbar.module.css';
import FriendsContainer from "./Friends/FriendsContainer";
import NavItem from './NavItem'

const Navbar: FC = (props) => {

    // Array with data about navigation buttons
    
    const navList: NavbarType = [
        {title: 'Profile', link: '/profile'},
        {title: 'Chats', link: '/dialogs'},
        {title: 'Users', link: '/users'},
        {title: 'News', link: '/news'},
        {title: 'Music', link: '/music'},
        {title: 'Settings', link: '/settings'}
    ]

    // Creating the list of Components for every navigation button

    const navLink = navList.map((nav: NavbarElementType) => <NavItem key={nav.title} nav={nav}/>)

    return (
        <div className = {s.nav}>
            <nav>{navLink}</nav>
        <div className = {s.friend}>
            <FriendsContainer />
        </div>
      </div>
    )
}
export default Navbar;

// Types

export type NavbarElementType = {
    title: string
    link: string
}
type NavbarType = NavbarElementType []