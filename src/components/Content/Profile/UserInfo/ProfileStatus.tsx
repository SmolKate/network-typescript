import React, { FC, useEffect, useState } from "react";
import s from './ProfileStatus.module.css';
import AvaMenu from '../../../../assets/3dots.png';
import { ProfileDataType } from "./ProfileData";

const ProfileStatus: FC<ProfileStatusType> = (props) => {
    
    let {status} = props
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localStatus, setStatus] = useState<string>(status)
    
    // Necessary to equal status and props.status after new status saving
    useEffect( () => {
        setStatus(status)
    }, [status])

    const activateEditMode = () => {
        if (!props.userId) {
            setEditMode(true)
        }
    }

    const deactivateEditMode = () => {
        props.updateStatus(localStatus)
        setEditMode(false)
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }; 
    
    return (
        <div>
            {!editMode &&
                <div className={s.status}>
                    <span onDoubleClick={activateEditMode}><b>Status</b>: {status || "-----"}</span>
                    {!props.userId &&
                    <div className={s.avaMenu} onClick={activateEditMode}>
                        <img src={AvaMenu}/> 
                    </div>}
                </div>}
            {editMode &&
                <div className={s.edit}>
                    <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={localStatus}></input>
                </div>}
        </div>
    )
}

export default ProfileStatus;

// Types

type ProfileStatusType = Omit<ProfileDataType, "profile">