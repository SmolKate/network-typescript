import React, { FC, useEffect } from 'react';
import User from './User.js';
import s from './Users.module.css';
import PagesNavigation from '../../../common/PagesNavigation/PagesNavigation';
import type { PropsFromRedux } from './UsersContainer'

const Users: FC<PropsFromRedux> = (props) => {

    const {usersData, getUsers, pageNumber, pageSize} = props

    // Get portion of users from the server at the page loading
    useEffect(() => { 
        if (usersData.length === 0) {
            getUsers (pageNumber, pageSize)
        }
    }, [usersData, getUsers, pageNumber, pageSize])
    
    const onPageChange = (pageNumber: number) => { 
        props.setPageNumber(pageNumber)
        props.getUsers (pageNumber, pageSize)
    }

    // Create the list of users as the list of components
    const users = props.usersData.map( u => 
        <User key={u.id} user={u} isAuth={props.isAuth} 
        isFollowingInProgress={props.isFollowingInProgress} 
        unfollow={props.unfollow} follow={props.follow}/>)

    return <div>
        <div className={s.preloaderBlock}>
            {props.isFetching ? <div>Loading...</div> : null}
        </div>
        <div className={s.pagesBlock}>
            <PagesNavigation totalUsersCount={props.totalUsersCount} 
                pageSize={props.pageSize} 
                pageNumber={props.pageNumber} 
                onPageChange={onPageChange}/>
        </div>
        <div className={s.usersContainer}>{users}</div>
    </div>
}

export default Users;