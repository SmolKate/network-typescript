import React from "react";
import s from './UserInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileData = (props) => {
    
    // Create the list of indicated contacts, pass the undefined contacts
    let contacts = Object.keys(props.profile.contacts).map( key => {
        return props.profile.contacts[key] && <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
    })

    return <div className={s.profileData}>
        <div className={s.userNameStatus}>
            <div>{props.profile.fullName}</div>
            <ProfileStatus userId={props.userId} userAuthId={props.userAuthId} status={props.status} updateStatus={props.updateStatus}/>  
        </div>
        <div className={s.userInfo}>
            <div className={s.aboutMe}>
                <b>About me</b>: {props.profile.aboutMe}
            </div>
            { props.profile.lookingForAJob && 
                <div className={s.profSkills}>
                    <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                </div>}
        </div>
        
        <div className={s.contacts}><b>Contacts</b>: {contacts}</div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contactItem}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileData;
