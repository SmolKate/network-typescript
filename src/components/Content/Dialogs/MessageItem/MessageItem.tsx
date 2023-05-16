import React, { FC } from "react";
import s from './MessageItem.module.css';

const MessageItem: FC<MessageElementType> = ({name, text, userAuthId}) => {

    // Set different styles for messages of authenticated user and his/her friend
    let className
    let nameField
    if (userAuthId) {
        className = s.messageItemMe
        nameField = "Me"
    } else {
        className = s.messageItemOther
        nameField = name
    }
    
    return (
        <div className={s.messages}>
            <div className={s.messageField + ' ' + className}>
                {nameField}: {text}
            </div>         
        </div>
    )
}

export default MessageItem;

// Types

type MessageElementType = {
    name: string 
    text: string 
    userAuthId: boolean
}