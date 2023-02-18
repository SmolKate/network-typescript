import React from "react";
import { Field, Form } from "formik";
import s from './PostElem.module.css'

const NewPostForm = ({ errors, touched }) => {
    return (
        <Form className={s.form+' '+(touched.newPost && errors.newPost ? s.errorMsg : '')}>
            <div className={s.newPostText}>
                <Field component='textarea'  name='newPost' placeholder='New Post'/>
            </div>
            {touched.newPost && errors.newPost && <div className={s.errorMsg}>{errors.newPost}</div>}
            <div className={s.addPostButton}>
                <button type='submit'>Add Post</button>
            </div>
        </Form>
    )
}

export default NewPostForm;
