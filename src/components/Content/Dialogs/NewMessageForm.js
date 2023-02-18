import React from "react";
import { Form, Field } from "formik";
import s from './NewMessageForm.module.css'

const NewMessageForm = ({ errors, touched }) => {

    return (
        <Form className={s.form+' '+(touched.newMessage && errors.newMessage ? s.errorMsg : '')}>
            <div autoFocus>
                <Field name='newMessage' component='textarea' placeholder='New Message'/>
            </div>
            {touched.newMessage && errors.newMessage && <div className={s.errorMsg}>{errors.newMessage}</div>}
            <div className={s.sendMessageBtn}>
                <button type='submit'>Send Answer</button>
            </div>
        </Form>
    )
}
export default NewMessageForm;
