import { ConnectedProps, connect } from "react-redux";
import Login from './Login';
import { login } from '../../../redux/auth-reducer';
import { RootState } from "../../../redux/redux-store";

let mapStateToProps = (state: RootState) => {
    return {
        isAuth : state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

const connector = connect(mapStateToProps, {login});

export default connector(Login)

// Types
export type PropsFromRedux = ConnectedProps<typeof connector>

