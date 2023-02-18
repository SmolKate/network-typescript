import { ThunkAction } from "@reduxjs/toolkit";
import { profileAPI } from "../api/api.js";
import { PostType, ProfileType } from '../types/types'
import { RootState } from "./redux-store.jsx";

type InitialStateType = typeof initialState

type ActionsType =  ReturnType<typeof addPostActionCreator> |
                    ReturnType<typeof setProfile> | 
                    ReturnType<typeof setStatus> 

export type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

const ADD_POST = 'profile/ADD-POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';


export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setProfile = (profile: ProfileType) => ({type: SET_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)


let initialState = {
    postsData: [
        {id:1, message:'Hello!', likesCount:11},
        {id:2, message:'Good morning!', likesCount:120},
        {id:3, message:'How are you?', likesCount:6},
        {id:4, message:'Hi, guys!', likesCount:54},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        
        default:
            return state;
    }
}

export default profileReducer;

// Get user's profile data and save it in the state
export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setProfile(data))    
}

// Get user's status and save it in the state
export const getStatus = (userId: number | null): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

// Set new status of the authorised user and get it back from the server
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

// Set new avatar of the authorised user and get it back from the server
export const updatePhoto = (file: any): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(getProfile(userId))
    }
}

// Set new profile data of the authorised user and get it back from the server
export const updateProfile = (profile: ProfileType, setStatus: any, setEditMode: any): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updateProfile(profile)
    if (data.resultCode === 0) {
        setEditMode(false)
        dispatch(getProfile(userId))
    } else {
        setStatus(data.messages)
    }
}
