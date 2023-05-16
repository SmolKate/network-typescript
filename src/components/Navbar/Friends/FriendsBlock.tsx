import React, { useEffect, FC } from "react";
import Friends from "./Friends";
import PagesNavigation from "../../../common/PagesNavigation/PagesNavigation";
import s from './Friends.module.css';
import { PropsFromRedux } from "./FriendsContainer";

const FriendsBlock: FC<PropsFromRedux> = (props) => {
    let {friendsData, getFollowedUsers, isAuth} = props

    // Get data about followed users from server after the current user authentication

    useEffect(() => { 
        if (friendsData.length === 0 ) {
            getFollowedUsers()
        }
    }, [getFollowedUsers, isAuth, friendsData.length])
    
    // Get new portion of followed users and pass the new page number to the state

    const onPageChange = (pageNumber: number) => { 
        getFollowedUsers (pageNumber, props.pageSize)
        props.setPageNumber(pageNumber) 
    }

    return (<div className={s.friendsComp}>
    {props.isAuth && <div>
        <h2>Friends</h2>
        <div className={s.pagesBlock}>
            <PagesNavigation totalUsersCount={props.totalUsersCount} 
                    pageSize={props.pageSize} 
                    pageNumber={props.pageNumber} 
                    onPageChange={onPageChange}/>
        </div>
        <Friends {...props}/>
        </div>}
    </div>)  
}

export default FriendsBlock