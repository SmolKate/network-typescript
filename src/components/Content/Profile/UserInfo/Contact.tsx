import React, {FC} from "react";
import s from './UserInfo.module.css';
import { ContactsType } from "../../../../types/types";


const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={s.contactItem}><b>{contactTitle}</b>: {contactValue}</div>
}

export default Contact;

// Types

type ContactType = {
    contactTitle: keyof ContactsType
    contactValue: string
} 
