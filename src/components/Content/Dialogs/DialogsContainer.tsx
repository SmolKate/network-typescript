import { addMessageActionCreator } from "../../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { ConnectedProps, connect } from "react-redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from 'redux';  
import { AppDispatch, RootState } from "../../../redux/redux-store";

let mapStateToProps = (state: RootState) => {
    return {
        dialogsPage : state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onAddMessage : (newMessage: string, chatId: string) => {dispatch(addMessageActionCreator(newMessage, chatId))},
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps)

// Create two containers: connect and withAuthRedirect HOC, which checks authentification

export default compose<React.ComponentType>(connector, withAuthRedirect)(Dialogs)

// Types
export type PropsFromRedux = ConnectedProps<typeof connector>
