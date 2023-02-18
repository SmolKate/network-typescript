import { connect } from "react-redux";
import Header from './Header';
import { logout } from '../../redux/auth-reducer.ts'

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {logout})(Header)
