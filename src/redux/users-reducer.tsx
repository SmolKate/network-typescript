import { usersAPI } from "../api/api";
import { getFollowedUsers } from "./friends-reducer";
import { UsersDataType } from "../types/types"
import { RootState, AppDispatch, BasicActionsType, BasicThunkType } from './redux-store'

let initialState = {
    usersData: [] as UsersDataType[],
    totalUsersCount: 40,
    pageSize: 10,
    pageNumber: 1,
    isFetching: true,
    isFollowingInProgress: [] as number[] // array what contains all users with follow/unfollow process in progress
};

export const actions = {
    followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (usersData: Array<UsersDataType>) => ({type: 'users/SET_USERS', usersData} as const),
    setTotalCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalUsersCount} as const),
    setPageNumber: (pageNumber: number) => ({type: 'users/SET_PAGE_NUMBER', pageNumber} as const),
    changeIsFetching: (isFetching: boolean) => ({type: 'users/CHANGE_IS_FETCHING', isFetching} as const),
    changeIsFollowingInProgress: (isFetching: boolean, userId: number) => ({type: 'users/CHANGE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}
// Explanation for 'changeIsFollowingInProgress' action:
// if isFetching is true - add the user to the isFollowingInProgress list; 
// if isFetching is false - delet the user from the isFollowingInProgress list;



const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state, 
                usersData: state.usersData.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case "users/UNFOLLOW":
            return {
                ...state, 
                usersData: state.usersData.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
            }
        case "users/SET_USERS":
            return {
                ...state,
                usersData: action.usersData
            }

        case "users/SET_PAGE_NUMBER":
            return {
                ...state,
                pageNumber: action.pageNumber
            }
        
        case "users/SET_TOTAL_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case "users/CHANGE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "users/CHANGE_IS_FOLLOWING_PROGRESS":
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
    dispatch(actions.changeIsFetching(true))
    const data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(actions.changeIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalCount(data.totalCount))
}

// Set the user as followed and put this to the server
export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.changeIsFollowingInProgress(true, userId));
    const data = await usersAPI.setFolow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.followSuccess(userId))
    };
    dispatch(actions.changeIsFollowingInProgress(false, userId));
    dispatch(getFollowedUsers())
}

// Set the user as unfollowed and put this to the server
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.changeIsFollowingInProgress(true, userId));
    const data = await usersAPI.setUnfolow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.unfollowSuccess(userId))
    };
    dispatch(actions.changeIsFollowingInProgress(false, userId));
    dispatch(getFollowedUsers())
}

// Types

export type InitialStateType = typeof initialState
type ActionsType = BasicActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>
