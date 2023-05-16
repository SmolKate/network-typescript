import React, { FC } from "react";
import UserInfo from './UserInfo/UserInfo';
import s from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PropsFromRedux } from "./ProfileContainer";

// Display user's data and his/her posts

const Profile: FC<PropsFromRedux> = (props) => {
    let {isAuthFetching, getProfile, getStatus, userAuthId} = props

    // reload Component at the url changing
    const location = useLocation();   

    // get user id from url to show profile of the other user (not authenticated)
    const {userIdString} = useParams<Record<string, string | undefined>>(); 
    let userId: number | null = Number(userIdString) 
    if (!userIdString) {
        userId = null
    }
    
    // Get users data from server
    useEffect(() => { 
        if (isAuthFetching === false) {

            // Get data of currently authenticated user
            if (!userId) {
                getProfile(userAuthId)
                getStatus(userAuthId)

            // Get data of other user
            } else {
                getProfile(userId)
                getStatus(userId)
            }
            
        }}, [isAuthFetching, getProfile, getStatus, userAuthId, userId, location.pathname]);
    
    if (!userId && !props.isAuth) return <Navigate to={"/login"} />

    return (
        <div className = {s.profile}>
            <UserInfo profile={props.profile} userId={userId} 
            userAuthId={props.userAuthId} status={props.status} 
            updateStatus={props.updateStatus} updatePhoto={props.updatePhoto}
            updateProfile={props.updateProfile}
            />
            { !userId && <MyPostsContainer /> }
        </div>
    )
}
export default Profile;