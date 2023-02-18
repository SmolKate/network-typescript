import React, { useState } from "react";
import s from './UserInfo.module.css';
import Preloader from "../../../../common/Preloader/Preloader";
import userPhoto from '../../../../assets/ava3.png';
import JobPicture from '../../../../assets/lookingForAJob.jpeg';
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import { withFormik } from "formik";
import * as Yup from 'yup'; 

// Show user's data and form to change it

const UserInfo = (props) => {
    const [hoverMode, setHoverMode]=useState(false)
    const [editMode, setEditMode]=useState(false)

    if (!props.profile) {
        return <div className={s.preloader}>
            <Preloader />
        </div>
    }
    // Handler to save the file chosen as user avatar
    const onFileSelecting = (e) => {
        if (!!e.target.files[0]) {
            const file = e.target.files[0]
            props.updatePhoto(file)
        }
    }

    // Display form to change user's data 
    const onEditBtnClick = () => {
        setEditMode(true)
    }
    // Display button to change avatar when mouse points on picture 
    const handleMouseEnter = () => {
        setHoverMode(true)
    }

    // Hide button for avatar changing when mouse leaves the picture 
    const handleMouseLeave = () => {
        setHoverMode(false)
    }

    return (
        <div className={s.description}>
            <div className={s.avaPhoto} >
                <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} src={props.profile.photos.large || userPhoto}></img> 
            </div>
            <div className={s.jobPicture}>
                {props.profile.lookingForAJob && <img src={JobPicture}/> }
            </div>
            { !props.userId && !editMode && 
            <div className={s.editBtn}>
                <button  onClick={onEditBtnClick}>Edit profile</button>
            </div>}
            { !props.userId && <input id="file-upload" type="file" className={s.inp} onChange={onFileSelecting}/>}

            { !!hoverMode && !props.userId && 
                    <div className={s.changePhoto} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                        <label htmlFor="file-upload" className={s.chooseFileBtn}>
                            Change photo   
                        </label>
                    </div>}
                { editMode 
            ? <ProfileDataFormFormik profile={props.profile} updateProfile={props.updateProfile} setEditMode={setEditMode}/> 
            : <ProfileData profile={props.profile} userId={props.userId} 
                userAuthId={props.userAuthId} 
                status={props.status} updateStatus={props.updateStatus}/>}
                        
        </div>
    )
}

export default UserInfo;

const ProfileDataFormFormik = withFormik ({
    mapPropsToValues ({profile}) {
        return {
            fullName: profile.fullName || '',
            lookingForAJob: profile.lookingForAJob || false,
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            aboutMe: profile.aboutMe || '',
            contacts: {
                facebook: profile.contacts.facebook || '',
                website: profile.contacts.website || '',
                vk: profile.contacts.vk || '',
                twitter: profile.contacts.twitter || '',
                istagram: profile.contacts.istagram || '',
                youtube: profile.contacts.youtube || '',
                github: profile.contacts.github || '',
                mainLink: profile.contacts.mainLink || '',
            }
        }
    },

    validationSchema: Yup.object().shape({
        fullName: Yup.string().max(20, 'Max length is 20 simbols.').required('Required'),
        lookingForAJobDescription: Yup.string().max(200, 'Max length is 200 simbols.'),
        aboutMe: Yup.string().max(200, 'Max length is 200 simbols.'),
    }),

    handleSubmit (values, {props, setStatus, setSubmitting, ...actions}) {
        props.updateProfile(values, setStatus, props.setEditMode)
        setSubmitting(false)
    }
})(ProfileDataForm)