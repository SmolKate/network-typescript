import React, {FC} from 'react';
import s from './Users.module.css';
import userPhoto from '../../../assets/ava3.png';
import { Link } from 'react-router-dom';
import { UsersDataType } from '../../../types/types';

const User: FC<UserType> = (props) => {
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

// Types

type UserType = {
    key: React.Key
    user: UsersDataType
    isAuth: boolean    
    isFollowingInProgress: number[]
    unfollow: (userId: number) => Promise<void>
    follow: (userId: number) => Promise<void>
}