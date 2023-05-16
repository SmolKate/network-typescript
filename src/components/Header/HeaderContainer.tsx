import { ConnectedProps, connect } from "react-redux";
import { logout } from '../../redux/auth-reducer'
import { RootState } from "../../redux/redux-store";
import Header from "./Header";

let mapStateToProps = (state:RootState) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}
let connector = connect(mapStateToProps, {logout})

export default connector(Header)

// Types

export type PropsFromRedux = ConnectedProps<typeof connector>
