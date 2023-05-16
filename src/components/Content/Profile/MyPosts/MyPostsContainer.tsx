import { actions} from "../../../../redux/profile-reducer";
import { AppDispatch, RootState } from "../../../../redux/redux-store";
import MyPosts from "./MyPosts";
import { ConnectedProps, connect } from "react-redux";

let mapStateToProps = (state: RootState) => {
    return {
        profilePage: state.profilePage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addPost: (text: string) => {dispatch(actions.addPostActionCreator(text))},
    }
}

let connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(MyPosts)

// Types

export type PropsFromRedux = ConnectedProps<typeof connector>
 
