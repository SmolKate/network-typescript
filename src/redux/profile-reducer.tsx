import { profileAPI } from "../api/api";
import { PostType, ProfileType } from '../types/types'
import { BasicActionsType, BasicThunkType } from "./redux-store.jsx";

export const actions = {
    addPostActionCreator : (newPostText: string) => ({type: 'profile/ADD_POST', newPostText} as const),
    setProfile : (profile: ProfileType) => ({type: 'profile/SET_PROFILE', profile} as const),
    setStatus : (status: string) => ({type: 'profile/SET_STATUS', status} as const)
}

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
        case "profile/ADD_POST":
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        
        case "profile/SET_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };

        case "profile/SET_STATUS":
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
    dispatch(actions.setProfile(data))    
}

// Get user's status and save it in the state
export const getStatus = (userId: number | null): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

// Set new status of the authorised user and get it back from the server
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

// Set new avatar of the authorised user and get it back from the server
export const updatePhoto = (file: File): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(getProfile(userId))
    }
}

// Set new profile data of the authorised user and get it back from the server
export const updateProfile = (profile: Omit<ProfileType, "photos">, setStatus: (status?: any) => void, setEditMode: (value: React.SetStateAction<boolean>) => void): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updateProfile(profile)
    if (data.resultCode === 0) {
        setEditMode(false)
        dispatch(getProfile(userId))
    } else {
        setStatus(data.messages)
    }
}

// Types

type InitialStateType = typeof initialState
type ActionsType = BasicActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>