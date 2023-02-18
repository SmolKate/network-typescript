import Friends from "./Friends";
import { connect } from "react-redux";
import { getFollowedUsers, setPageNumber } from "../../../redux/friends-reducer.tsx";
import { getIsFollowingInProgress } from "../../../redux/users-selectors";
import { unfollow } from "../../../redux/users-reducer.ts";
import { useEffect } from "react";
import PagesNavigation from "../../../common/PagesNavigation/PagesNavigation";
import s from './Friends.module.css';


const FriendsContainer = (props) => {
    let {friendsData, getFollowedUsers, isAuth} = props

    // Get data about followed users from server after the current user authentication

    useEffect(() => { 
        if (friendsData.length === 0 ) {
            getFollowedUsers()
        }
    }, [getFollowedUsers, isAuth, friendsData.length])
    
    // Get new portion of followed users and pass the new page number to the state

    const onPageChange = (pageNumber) => { 
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

let mapStateToProps = (state) => {
    return {
        friendsData : state.friendsNavbar.friendsData,
        isFollowingInProgress: getIsFollowingInProgress(state), // selector
        isAuth: state.auth.isAuth,
        pageSize: state.friendsNavbar.pageSize,
        pageNumber: state.friendsNavbar.pageNumber,
        totalUsersCount: state.friendsNavbar.totalUsersCount,
    }
}

export default connect(mapStateToProps, {getFollowedUsers, unfollow, setPageNumber})(FriendsContainer);

