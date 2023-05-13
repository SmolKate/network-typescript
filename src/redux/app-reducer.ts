import { setAuth } from "./auth-reducer"; 
import { BasicActionsType, BasicThunkType, RootState } from "./redux-store";

type InitialStateType = typeof initialState
type ActionsType = BasicActionsType<typeof actions> 
type ThunkType = BasicThunkType<ActionsType, void>

export const actions = {
    setInitialisedSuccess : () => ({type: 'app/SET_INITIALISED_SUCCESS'} as const)
}

let initialState = {
    isInitialised: false
};

const appReducer = (state = initialState, action : ActionsType): InitialStateType => {
    
    switch (action.type) {
        case "app/SET_INITIALISED_SUCCESS":
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
            dispatch(actions.setInitialisedSuccess())
        }) 
}


