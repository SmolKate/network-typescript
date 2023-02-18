import { connect, ConnectedProps } from 'react-redux'
import Users from './Users';
import { getUsers, follow, unfollow, setPageNumber} from '../../../redux/users-reducer'
import { getUsersData, getPageSize, getPageNumber, getTotalUsersCount, getIsFetching, getIsFollowingInProgress } from '../../../redux/users-selectors';
import type { RootState } from '../../../redux/redux-store';

let mapStateToProps = (state: RootState) => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        pageNumber: getPageNumber(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
}
const connector = connect(mapStateToProps, 
    {getUsers, follow, unfollow, setPageNumber})

export type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Users)

// Manually Typing connect without ConnectedProps:

// type MapStatePropsType = {
    //     usersData: Array<UsersDataType>
    //     pageNumber: number
    //     pageSize: number
    //     totalUsersCount: number
    //     isAuth: boolean
    //     isFollowingInProgress: Array<number>
    //     isFetching: boolean
    // }
    
    // type MapDispatchPropsType = {
    //     getUsers: (pageNumber: number, pageSize: number) => void
    //     setPageNumber: (pageNumber: number) => void
    //     unfollow: (userId: number) => void
    //     follow: (userId: number) => void
    // }
    // type OwnProps = {}
    
    // export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

    // export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, RootState>(mapStateToProps, 
//     {getUsers, follow, unfollow, setPageNumber}) (Users);
