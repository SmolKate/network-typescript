import { ThunkAction } from "@reduxjs/toolkit";
import { setAuth } from "./auth-reducer"; 
import { RootState } from "./redux-store";

type ActionsType = ReturnType<typeof setInitialisedSuccess> 

export type InitialStateType = typeof initialState
export type ThunkType = ThunkAction<void, RootState, unknown, ActionsType>


const SET_INITIALISED_SUCCESS = 'app/SET_INITIALISED_SUCCESS';

export const setInitialisedSuccess = () => ({type: SET_INITIALISED_SUCCESS} as const)

// type ActionsType = ReturnType<typeof setInitialisedSuccess>

let initialState = {
    isInitialised: false
};

const appReducer = (state = initialState, action : ActionsType): InitialStateType => {
    
    switch (action.type) {
        case SET_INITIALISED_SUCCESS:
            return {
                ...state,
                isInitialised: true
            };
        default:
            return state;
    }
}

export default appReducer;

// Get data from server about whether the user is authorized or not.
export const initialiseApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(setAuth())
    Promise.all([promise])
        .then( () => {
            dispatch(setInitialisedSuccess())
        }) 
}


