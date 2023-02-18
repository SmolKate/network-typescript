import { usersAPI } from "../api/api.js";
import { getFollowedUsers } from "./friends-reducer";
import { UsersDataType } from "../types/types"
import { RootState, AppDispatch } from './redux-store'
import { ThunkAction } from "@reduxjs/toolkit";

type InitialStateType = typeof initialState

export type ActionsType =  ReturnType<typeof followSuccess> |
                    ReturnType<typeof unfollowSuccess> | 
                    ReturnType<typeof setUsers> |
                    ReturnType<typeof setTotalCount> |
                    ReturnType<typeof setPageNumber> |
                    ReturnType<typeof changeIsFetching> |
                    ReturnType<typeof changeIsFollowingInProgress>


export type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const SET_PAGE_NUMBER = 'users/SET_PAGE_NUMBER';
const CHANGE_IS_FETCHING = 'users/CHANGE_IS_FETCHING';
const CHANGE_IS_FOLLOWING_PROGRESS= 'users/CHANGE_IS_FOLLOWING_PROGRESS'

export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const);
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsers = (usersData: Array<UsersDataType>) => ({type: SET_USERS, usersData} as const);
export const setTotalCount = (totalUsersCount: number) => ({type: SET_TOTAL_COUNT, totalUsersCount} as const);
export const setPageNumber = (pageNumber: number) => ({type: SET_PAGE_NUMBER, pageNumber} as const)
export const changeIsFetching = (isFetching: boolean) => ({type: CHANGE_IS_FETCHING, isFetching} as const)

// if isFetching is true - add the user to the isFollowingInProgress list; 
// if isFetching is false - delet the user from the isFollowingInProgress list;
export const changeIsFollowingInProgress = (isFetching: boolean, userId: number) => ({type: CHANGE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)

let initialState = {
    usersData: [] as Array<UsersDataType>,
    totalUsersCount: 40,
    pageSize: 10,
    pageNumber: 1,
    isFetching: true,
    isFollowingInProgress: [] as Array<number>// array what contains all users with follow/unfollow process in progress
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, 
                usersData: state.usersData.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state, 
                usersData: state.usersData.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
            }
        case SET_USERS:
            return {
                ...state,
                usersData: action.usersData
            }

        case SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.pageNumber
            }
        
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case CHANGE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case CHANGE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFetching 
                ? [...state.isFollowingInProgress, action.userId]
                : state.isFollowingInProgress.filter(id => id !== action.userId)
            }
        
        default:
            return state;
    }
}

export default usersReducer;

// Get a portion of users from the server and save data
export const getUsers = (pageNumber: number, pageSize: number) => async (dispatch: AppDispatch, getState: () => RootState ) => {
    dispatch(changeIsFetching(true))
    const data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(changeIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
}

// Set the user as followed and put this to the server
export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(changeIsFollowingInProgress(true, userId));
    const data = await usersAPI.setFolow(userId)
    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    };
    dispatch(changeIsFollowingInProgress(false, userId));
    dispatch(getFollowedUsers())
}

// Set the user as unfollowed and put this to the server
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(changeIsFollowingInProgress(true, userId));
    const data = await usersAPI.setUnfolow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    };
    dispatch(changeIsFollowingInProgress(false, userId));
    dispatch(getFollowedUsers())
}

