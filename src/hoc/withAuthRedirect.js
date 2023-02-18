import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';

// HOC, which checks wethever the current user is authenticated. If not it redirects to Login page

let mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {

    const withAuthRedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to={"/login"} />
        return <Component {...props} />
    }

    let connectedAuthRedirectComponent = connect (mapStateToProps) (withAuthRedirectComponent)
    
    return connectedAuthRedirectComponent;
}