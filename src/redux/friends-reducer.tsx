import { usersAPI } from "../api/api.js";
import { RootState } from './redux-store'
import { ThunkAction } from '@reduxjs/toolkit';


type ItemsType = {
    name: string
    id: number
    photos: {
      small?: null | string,
      large?: null | string
    },
    status?: null | string,
    followed: boolean
}
type ActionsType =  ReturnType<typeof getFollowedUsersData> |
                    ReturnType<typeof setTotalCount> | 
                    ReturnType<typeof setPageNumber> 

export type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

const GET_FOLLOWED_USERS_DATA = 'friends/GET_FOLLOWED_USERS_DATA';
const SET_TOTAL_COUNT = 'friends/SET_TOTAL_COUNT';
const SET_PAGE_NUMBER = 'friends/SET_PAGE_NUMBER';

export const getFollowedUsersData = (followedUsersData: Array<ItemsType>) => ({type: GET_FOLLOWED_USERS_DATA, followedUsersData} as const)
export const setTotalCount = (totalUsersCount: number) => ({type: SET_TOTAL_COUNT, totalUsersCount} as const);
export const setPageNumber = (pageNumber: number) => ({type: SET_PAGE_NUMBER, pageNumber} as const)

let initialState = {
    friendsData: [] as Array<ItemsType>,
    totalUsersCount: 0,
    pageSize: 6,
    pageNumber: 1,
};

type InitialStateType = typeof initialState

const friendsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_FOLLOWED_USERS_DATA:
            return {
                ...state,
                friendsData: action.followedUsersData,
            };

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
    
        default:
            return state;
    }
}

export default friendsReducer;

// Get the list of followed friends of the authorised user and handle the response
export const getFollowedUsers = (pageNumber: number = 1, pageSize: number = 6): ThunkType => async (dispatch) => {
    const data = await usersAPI.getFollowedUsers(pageNumber, pageSize)
    dispatch(getFollowedUsersData(data.items))
    dispatch(setTotalCount(data.totalCount))
}