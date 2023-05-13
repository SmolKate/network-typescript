import React, { useEffect } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem.js';
import MessageItem from './MessageItem/MessageItem.js';
import NewMessageForm from "./NewMessageForm";
import { withFormik } from "formik";
import * as Yup from 'yup'; 
import { useParams } from "react-router-dom";
import { PropsFromRedux } from "./DialogsContainer";

type MessagesType = Array<{
    id: number 
    text: string 
    userAuthId: boolean
}>

// Show all chats of authenticated user and input form to add a new message
const Dialogs: React.FC<PropsFromRedux> = ({dialogsPage, onAddMessage}) => {

    // Get id of the user, whose messeges need to be displayed, from url.
    const {chatId} = useParams<{chatId?: string}>() 
  
    // Create the list with all users, who have messages
    let dialogElements = dialogsPage.dialogsData
    .map (d => <DialogItem key={d.id} id={d.id} name={d.name}/>)

    // Get messages for the user with indicated id
    let messages: MessagesType = []
    let name: string
    if (!!chatId) {
        let userChat = dialogsPage.dialogsData.filter( i => i.id.toString() === chatId)
        messages = userChat[0].messages
        name = userChat[0].name
    }

    // Create the list with all messages of the user with indicated id
    let messageElements 
    if (!!chatId) {
        messageElements = messages.map(m => <MessageItem key={m.id} text={m.text} userAuthId={m.userAuthId} name={name}/>)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
               {dialogElements}
            </div>
            <div className={s.messagesSection}>
                { !!chatId && <div>
                    {messageElements}
                    <DialogsFormFormik onAddMessage={onAddMessage} chatId={chatId}/>
                </div>}
            </div>
        </div>
    )
}
export default Dialogs;



export const DialogsFormFormik = withFormik<MyFormPropsType & OtherPropsType, FormValuesType>({
    
    mapPropsToValues ({newMessage}) {
        return {
            newMessage: newMessage || ''
        }
    }, 
    validationSchema: Yup.object().shape({
        newMessage: Yup.string().max(100, 'Max length is 100 simbols.').required('')
    }),
    handleSubmit (values: FormValuesType, {...actions}) {
        actions.props.onAddMessage(values.newMessage, actions.props.chatId)
        values.newMessage = ''
    }
})(NewMessageForm)

// Types for the form

export type FormValuesType = {    // all the values that we’re going to have in our form
    newMessage: string
}

type MyFormPropsType = {  // to define some properties for our initial values
    newMessage?: string | undefined
}
export type OtherPropsType = {    // to pass other props to our component
    onAddMessage: PropsFromRedux["onAddMessage"]
    chatId: string
}
