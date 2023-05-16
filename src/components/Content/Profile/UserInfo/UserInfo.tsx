import React, { FC, useState } from "react";
import s from './UserInfo.module.css';
import Preloader from "../../../../common/Preloader/Preloader";
import userPhoto from '../../../../assets/ava3.png';
import JobPicture from '../../../../assets/lookingForAJob.jpeg';
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import { withFormik } from "formik";
import * as Yup from 'yup'; 
import { ProfileType } from "../../../../types/types";

// Show user's data and form to change it

const UserInfo: FC<UserInfoType> = (props) => {
    const [hoverMode, setHoverMode]=useState<boolean>(false)
    const [editMode, setEditMode]=useState<boolean>(false)

    if (!props.profile) {
        return <div className={s.preloader}>
            <Preloader />
        </div>
    }
    // Handler to save the file chosen as user avatar
    const onFileSelecting = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
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
            { !props.userId && 
                <input id="file-upload" type="file" className={s.inp} onChange={onFileSelecting}/>}

            { !!hoverMode && !props.userId && 
                <div className={s.changePhoto} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                    <label htmlFor="file-upload" className={s.chooseFileBtn}>
                        Change photo   
                    </label>
                </div>}
                
            { editMode 
                ? <ProfileDataFormFormik profile={props.profile} updateProfile={props.updateProfile} 
                    setEditMode={setEditMode}/> 
                : <ProfileData profile={props.profile} userId={props.userId} 
                    userAuthId={props.userAuthId} 
                    status={props.status} updateStatus={props.updateStatus}/>}
                            
        </div>
    )
}

export default UserInfo;

const ProfileDataFormFormik = withFormik<MyFormPropsType & OtherPropsType, FormValuesType> ({
    
    mapPropsToValues ({profile}) {
        return {
            userId: profile.userId,
            fullName: profile.fullName || '',
            lookingForAJob: profile.lookingForAJob || false,
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            aboutMe: profile.aboutMe || '',
            contacts: {
                facebook: profile.contacts.facebook || '',
                website: profile.contacts.website || '',
                vk: profile.contacts.vk || '',
                twitter: profile.contacts.twitter || '',
                instagram: profile.contacts.instagram || '',
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

    handleSubmit (values: FormValuesType, {props, setStatus, setSubmitting, ...actions}) {
        props.updateProfile(values, setStatus, props.setEditMode)
        setSubmitting(false)
    }
})(ProfileDataForm)

// Types for the form

type UserInfoType = {
    profile: ProfileType | null
    userId: number | null
    userAuthId: number | null
    status: string
    updateStatus: (status: string) => void
    updatePhoto: (file: File) => void
    updateProfile: (profile: Omit<ProfileType, "photos">, 
                setStatus: (value: React.SetStateAction<boolean>) => void, 
                setEditMode: (value: React.SetStateAction<boolean>) => void) => void
}

export type FormValuesType = Omit<ProfileType, "photos">    // all the values that we’re going to have in our form

type MyFormPropsType = Partial<FormValuesType>  // to define some properties for our initial values
    
export type OtherPropsType = {    // to pass other props to our component
    profile: ProfileType
    updateProfile: (profile: Omit<ProfileType, "photos">, 
                setStatus: (value: React.SetStateAction<boolean>) => void, 
                setEditMode: (value: React.SetStateAction<boolean>) => void) => void
    setEditMode: (value: React.SetStateAction<boolean>) => void
}