import React from "react";
import s from './FriendsItem.module.css';
import userPhoto from '../../../../assets/ava3.png';
import { Link } from "react-router-dom";

// Creating a friend item with ability to unfollow and redirect to his/her profile

const FriendsItem = (props) => {
   
    return (
        <div className={s.item}>
            <div className = {s.image}>
                <Link to={"/profile/"+props.id}><img src={props.photo || userPhoto} /></Link>
                <div className = {s.btn}>
                    <button className = {s.unfollowBtn} disabled={props.isFollowingInProgress.some(id => id === props.id)} 
                        onClick={ () => {props.unfollow(props.id)}}>Unfollow</button> 
                </div>
            </div>
            <div className={s.name}>
                {props.name}
            </div>         
        </div>
    )
}

export default FriendsItem;