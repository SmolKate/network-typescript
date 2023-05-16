import Profile from "./Profile";
import { getProfile, updateStatus, getStatus, updatePhoto, updateProfile } from "../../../redux/profile-reducer";
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from "../../../redux/redux-store.jsx";

let mapStateToProps = (state: RootState) => {
    return {
        profile: state.profilePage.profile,
        userAuthId: state.auth.id,
        isAuthFetching: state.auth.isAuthFetching,
        status: state.profilePage.status,
        isAuth : state.auth.isAuth,
    }
}

let connector = connect (mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, updateProfile})

export default connector(Profile)

// Types
export type PropsFromRedux = ConnectedProps<typeof connector>
 
