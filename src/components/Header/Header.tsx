import React, {FC} from "react";
import s from './Header.module.css';
import { Link } from "react-router-dom";
import { PropsFromRedux } from "./HeaderContainer";

const Header: FC<PropsFromRedux> = ({isAuth, login, logout}) => {
  
  return (
    <header className = {s.head}>
      <img src='https://static.vecteezy.com/system/resources/thumbnails/008/977/302/small/simple-logo-in-the-shape-of-a-mountain-panorama-themed-logo-vector.jpg'></img>
      <div className = {s.loginBlock}>
        <div className = {s.innerLoginBlock}>
          { isAuth 
            ? <div>
                {login}
                <button><Link to="/profile" onClick={logout}>Log Out</Link></button>
              </div>
            : <button><Link to="/login">Log In</Link></button>}
        </div>
      </div>
    </header>
  )
}
export default Header;