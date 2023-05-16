import React from "react";
import { Field, Form, FormikProps } from "formik";
import s from './PostElem.module.css'
import { FormValuesType, OtherPropsType } from "../MyPosts";

const NewPostForm = ({ errors, touched }: OtherPropsType & FormikProps<FormValuesType>) => {
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
