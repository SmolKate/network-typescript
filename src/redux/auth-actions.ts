import {SET_USER_DATA, CHANGE_IS_AUTH_FETCHING, SET_LOGOUT, SET_CAPTCHA_URL} from './auth-constants'

export const setAuthUserData = (id: number, email: string, login: string) => ({type: SET_USER_DATA, data: {id, email, login}} as const)
export const setLogout = () => ({type: SET_LOGOUT} as const)
export const changeIsAuthFetching = (isAuthFetching: boolean) => ({type: CHANGE_IS_AUTH_FETCHING, isAuthFetching} as const)
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl} as const)
