// @ts-ignore
import type { RootState } from "./redux-store"

export const getUsersData = (state: RootState) => {
    return state.usersPage.usersData
}

export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize
}

export const getPageNumber = (state: RootState) => {
    return state.usersPage.pageNumber
}

export const getTotalUsersCount= (state: RootState) => {
    return state.usersPage.totalUsersCount
}

export const getIsFetching= (state: RootState) => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgress= (state: RootState) => {
    return state.usersPage.isFollowingInProgress
}

