import { ResultCodeForCaptchaEnum } from '../api/api';
import { ResultCodeEnum, authAPI } from "../api/api";
import * as actions from './auth-actions'
import { BasicActionsType, BasicThunkType } from "./redux-store.jsx";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isAuthFetching: true,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        case 'auth/SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        case 'auth/SET_LOGOUT':
            return {
                ...state,
                id: null,
                email: null,
                login: null,
                isAuth: false
            };
        case 'auth/CHANGE_IS_AUTH_FETCHING':
            return {
                ...state,
                isAuthFetching: action.isAuthFetching
            }
        case 'auth/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
      
        default:
            return state;
    }
}

export default authReducer;

// Get login data about the user if he/she is authorised and handle the response
export const setAuth = (): ThunkType => async (dispatch) => {
    dispatch(actions.changeIsAuthFetching(true))
    const data = await authAPI.getAuth();
    dispatch(actions.changeIsAuthFetching(false));
    if (data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = data.data;
        dispatch(actions.setAuthUserData(id, email, login));
    }
}

// Send login data of the user from login form to the server and handle the response
export const login = (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any): ThunkType => async (dispatch) => {
    dispatch(actions.changeIsAuthFetching(true))
    const data = await authAPI.login(email, password, rememberMe, captcha)
    dispatch(actions.changeIsAuthFetching(false))
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuth())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        setStatus(data.messages)
    }
}

// Send request to log out the user to the server and handle the response
export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.changeIsAuthFetching(true))
    const data = await authAPI.logout()
    dispatch(actions.changeIsAuthFetching(false))
    if (data.resultCode === 0) {
        dispatch(actions.setLogout())
    }
}

// Get captcha from the server in case of login error
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await authAPI.getCaptcha()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

// Types 

// create set of types for all actions which are returnd from all action creators. Action creators should be as an object:
type ActionsType = BasicActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>

// Another method:
// type InferActionsType<T> = T extends {[key: string]: infer U} ? U : never
// type ActionsType = ReturnType<InferActionsType<typeof actions>>
// export type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

type InitialStateType = typeof initialState

