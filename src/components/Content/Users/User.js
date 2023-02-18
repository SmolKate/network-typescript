import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../../assets/ava3.png';
import { Link } from 'react-router-dom';

const User = (props) => {
    return (<div className={s.userBlock}>
        <div className={s.photo}>
            <Link to={"/profile/"+props.user.id}><img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} /></Link>
        </div>
        <div className={s.info}>
            <div>Name: {props.user.name}</div>
            <div>Status: {props.user.status}</div>
            { props.isAuth &&
            <div>
                {props.user.followed 
                    ? <button className={s.followBtn} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} 
                        onClick={ () => {props.unfollow(props.user.id)}}>Unfollow</button> 
                    : <button className={s.followBtn} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} 
                        onClick={ () => {props.follow(props.user.id)}}>Follow</button>}
            </div>}
        </div>
    </div>)
}

export default User;