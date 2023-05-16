import { ConnectedProps, connect } from "react-redux";
import { getFollowedUsers, setPageNumber } from "../../../redux/friends-reducer";
import { getIsFollowingInProgress } from "../../../redux/users-selectors";
import { unfollow } from "../../../redux/users-reducer";
import { RootState } from "../../../redux/redux-store";
import FriendsBlock from "./FriendsBlock";

let mapStateToProps = (state: RootState) => {
    return {
        friendsData : state.friendsNavbar.friendsData,
        isFollowingInProgress: getIsFollowingInProgress(state), // selector
        isAuth: state.auth.isAuth,
        pageSize: state.friendsNavbar.pageSize,
        pageNumber: state.friendsNavbar.pageNumber,
        totalUsersCount: state.friendsNavbar.totalUsersCount,
    }
}

let connector = connect(mapStateToProps, {getFollowedUsers, unfollow, setPageNumber})

export default connector(FriendsBlock);

//Types

export type PropsFromRedux = ConnectedProps<typeof connector>

