import { usersAPI } from "../api/api";
import { BasicThunkType } from './redux-store'

export const getFollowedUsersData = (followedUsersData: Array<ItemsType>) => ({type: 'friends/GET_FOLLOWED_USERS_DATA', followedUsersData} as const)
export const setTotalCount = (totalUsersCount: number) => ({type: 'friends/SET_TOTAL_COUNT', totalUsersCount} as const);
export const setPageNumber = (pageNumber: number) => ({type: 'friends/SET_PAGE_NUMBER', pageNumber} as const)

let initialState = {
    friendsData: [] as Array<ItemsType>,
    totalUsersCount: 0,
    pageSize: 6,
    pageNumber: 1,
};

const friendsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "friends/GET_FOLLOWED_USERS_DATA":
            return {
                ...state,
                friendsData: action.followedUsersData,
            };

        case "friends/SET_PAGE_NUMBER":
            return {
                ...state,
                pageNumber: action.pageNumber
            }
        
        case "friends/SET_TOTAL_COUNT":
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

// Types

export type ItemsType = {
    name: string
    id: number
    photos: {
      small?: null | string,
      large?: null | string
    },
    status?: null | string,
    followed: boolean
}

type InitialStateType = typeof initialState

// one of the way to create set of types for all actions but it's beter to use 
// InferActionsType<T> = T extends {[key: string]: infer U} ? U : never
type ActionsThunkType =  typeof getFollowedUsersData |
                        typeof setTotalCount | 
                        typeof setPageNumber
type ActionsType =  ReturnType<ActionsThunkType> 
type ThunkType = BasicThunkType<ActionsType>
// export type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>
