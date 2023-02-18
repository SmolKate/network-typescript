import { addMessageActionCreator } from "../../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from 'redux';  

let mapStateToProps = (state) => {
    return {
        dialogsPage : state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage : (newMessage, chatId) => {dispatch(addMessageActionCreator(newMessage, chatId))},
    }
}

// Create two containers: connect and withAuthRedirect HOC, which checks authentification

export default compose (connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)

