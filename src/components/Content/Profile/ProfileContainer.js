import Profile from "./Profile";
import { getProfile, updateStatus, getStatus, updatePhoto, updateProfile } from "../../../redux/profile-reducer.ts";
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        userAuthId: state.auth.id,
        isAuthFetching: state.auth.isAuthFetching,
        status: state.profilePage.status,
        isAuth : state.auth.isAuth,
    }
}

export default connect (mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, updateProfile})(Profile);
