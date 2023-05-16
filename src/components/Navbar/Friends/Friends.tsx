import React, {FC} from "react";
import s from './Friends.module.css';
import { PropsFromRedux } from "./FriendsContainer";
import { ItemsType } from "../../../redux/friends-reducer";
import FriendsItem from "./FriendsItem/FriendsItem";

// Creating the list of followed users

const Friends: FC<PropsFromRedux> = ({friendsData, isFollowingInProgress, unfollow}) => {

    let friendsItem = null
    if(!!friendsData) {
        friendsItem = friendsData
            .map ((p: ItemsType) => <FriendsItem key={p.id} id={p.id} name={p.name} photo={p.photos.small} 
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