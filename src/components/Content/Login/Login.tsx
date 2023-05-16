import React,  { FC } from 'react'
import LoginForm from './LoginForm';
import { withFormik } from 'formik';
import * as Yup from 'yup'; 
import { Navigate } from 'react-router-dom';
import s from './Login.module.css';
import { PropsFromRedux } from './LoginContainer';

// Login form with validation at submiting. It could also show captcha if neseccary. 
// User will be redirected to his/her profile at successful authentication.

const Login: FC<PropsFromRedux> = (props) => {
    
    return (
        <div>
        {props.isAuth && <Navigate to={"/profile"}/>}
            <div className={s.loginBox}>
                <h1>Log in</h1>
                <LoginFormFormik login={props.login} captchaUrl={props.captchaUrl}/>
            </div>    
        </div>
    )
}

export default Login;

const LoginFormFormik  = withFormik<MyFormPropsType & OtherPropsType, FormValuesType> ({
    mapPropsToValues ({email, password, rememberMe, captcha}) {
        return {
            email: email || '',
            password: password || '',
            rememberMe: rememberMe || false,
            captcha: captcha || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().max(100, 'Max length is 100 simbols.').required('Required'),
        password: Yup.string().max(10, 'Max length is 10 simbols.').required('Required'),
    }),
    handleSubmit (values: FormValuesType, {props, setStatus, setSubmitting, ...actions}) {
        props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
        setSubmitting(false);       
    }
})(LoginForm)

// Types for the form

export type FormValuesType = {    // all the values that we’re going to have in our form
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type MyFormPropsType = {  // to define some properties for our initial values
    email?: string | undefined
    password?: string | undefined
    rememberMe?: boolean | undefined
    captcha?: string | undefined
}
export type OtherPropsType = {    // to pass other props to our component
    login: (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any) => void
    captchaUrl: string | null
}