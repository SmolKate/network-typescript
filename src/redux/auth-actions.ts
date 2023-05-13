
export const setAuthUserData = (id: number, email: string, login: string) => ({type: 'auth/SET_USER_DATA', data: {id, email, login}} as const)
export const setLogout = () => ({type: 'auth/SET_LOGOUT'} as const)
export const changeIsAuthFetching = (isAuthFetching: boolean) => ({type: 'auth/CHANGE_IS_AUTH_FETCHING', isAuthFetching} as const)
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({type: 'auth/SET_CAPTCHA_URL', captchaUrl} as const)