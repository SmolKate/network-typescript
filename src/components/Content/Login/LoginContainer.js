import { connect } from "react-redux";
import Login from './Login';
import { login } from '../../../redux/auth-reducer.ts';

let mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);

