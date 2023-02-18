import React, { useEffect, useState } from "react";
import s from './ProfileStatus.module.css';
import AvaMenu from '../../../../assets/3dots.png';

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    // Necessary to equal status and props.status after new status saving
    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (!props.userId) {
            setEditMode(true)
        }
    }

    const deactivateEditMode = () => {
        props.updateStatus(status)
        setEditMode(false)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }; 
    
    return (
        <div>
            {!editMode &&
                <div className={s.status}>
                    <span onDoubleClick={activateEditMode}><b>Status</b>: {props.status || "-----"}</span>
                    {!props.userId &&
                    <div className={s.avaMenu} onClick={activateEditMode}>
                        <img src={AvaMenu}/> 
                    </div>}
                </div>}
            {editMode &&
                <div className={s.edit}>
                    <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status}></input>
                </div>}
        </div>
    )
}

export default ProfileStatus;