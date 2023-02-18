import React from 'react'
import LoginForm from './LoginForm';
import { withFormik } from 'formik';
import * as Yup from 'yup'; 
import { Navigate } from 'react-router-dom';
import s from './Login.module.css';

// Login form with validation at submiting. It could also show captcha if neseccary. 
// User will be redirected to his/her profile at successful authentication.

const Login = (props) => {
    
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

const LoginFormFormik = withFormik ({
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
    handleSubmit (values, {props, setStatus, setSubmitting, ...actions}) {
        props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
        setSubmitting(false);       
        
    }
})(LoginForm)

