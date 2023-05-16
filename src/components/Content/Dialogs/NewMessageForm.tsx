import React, { useEffect, useRef } from "react";
import { Form, Field, FormikProps } from "formik";
import s from './NewMessageForm.module.css'
import { FormValuesType, OtherPropsType } from "./Dialogs";

const NewMessageForm = ({ errors, touched, handleReset, chatId }: OtherPropsType & FormikProps<FormValuesType>) => {
    
    const setFocus = (): void => {
        messageInput.current && messageInput.current.focus()
    }
    const messageInput = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        handleReset()
        setFocus()
    }, [chatId, handleReset])
    
    return (
        <Form className={s.form+' '+(touched.newMessage && errors.newMessage ? s.errorMsg : '')}>
            <div>
                <Field innerRef={messageInput} name='newMessage' autoFocus = {true} component='textarea' placeholder='New Message' />
            </div>
            {touched.newMessage && errors.newMessage && <div className={s.errorMsg}>{errors.newMessage}</div>}
            <div className={s.sendMessageBtn}>
                <button type='submit'>Send Answer</button>
            </div>
        </Form>
    )
}
export default NewMessageForm;
