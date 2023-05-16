import React, {FC} from "react";
import s from './UserInfo.module.css';
import ProfileStatus from './ProfileStatus';
import Contact from './Contact';
import { ContactsType, ProfileType } from "../../../../types/types";

const ProfileData: FC<ProfileDataType> = (props) => {
    
    // Create the list of indicated contacts, pass the undefined contacts
    let keys = Object.keys(props.profile.contacts) as Array<keyof ContactsType>
    let contacts = keys.map( (key: keyof ContactsType) => {
        return !!props.profile.contacts[key] && <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
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

export default ProfileData;

// Types

export type ProfileDataType = {
    profile: ProfileType
    userId: number | null
    userAuthId: number | null
    status: string
    updateStatus: (status: string) => void
}

