import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/redux-store";

// HOC, which checks wethever the current user is authenticated. If not it redirects to Login page

export const withAuthRedirect = <P extends object> (Component: React.ComponentType<P>): React.ComponentType<P> => {
   
    const WithAuthRedirectComponent = (props: P) => {
        const isAuth = useSelector((state: RootState) => state.auth.isAuth)
        return isAuth ? <Component {...props as P} /> : <Navigate to={"/login"} />
    }

    return WithAuthRedirectComponent
}