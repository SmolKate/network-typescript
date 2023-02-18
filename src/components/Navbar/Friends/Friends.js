import React from "react";
import s from './Friends.module.css';
import FriendsItem from "./FriendsItem/FriendsItem";

// Creating the list of followed users

const Friends = ({friendsData, isFollowingInProgress, unfollow}) => {

    let friendsItem = null
    if(!!friendsData) {
        friendsItem = friendsData
            .map (p => <FriendsItem key={p.id} id={p.id} name={p.name} photo={p.photos.small} 
                isFollowingInProgress={isFollowingInProgress} unfollow={unfollow} />)
    }
    

   
    return (
        <div>
            <div className={s.friendsField}>
                {friendsItem}
            </div>         
        </div>
    )
}

export default Friends;