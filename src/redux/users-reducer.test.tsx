import usersReducer, { InitialStateType, actions } from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        usersData: [
            {id: 0, name: 'Me', followed: false, photos: {large: null, small: null}},
            {id: 1, name: 'You', followed: false, photos: {large: null, small: null}},
            {id: 2, name: 'They', followed: true, photos: {large: null, small: null}},
            {id: 3, name: 'He', followed: true, photos: {large: null, small: null}}
        ],
        totalUsersCount: 40,
        pageSize: 10,
        pageNumber: 1,
        isFetching: false,
        isFollowingInProgress: []
        }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.usersData[0].followed).toBeFalsy
    expect(newState.usersData[1].followed).toBeTruthy

})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))

    expect(newState.usersData[2].followed).toBeFalsy
    expect(newState.usersData[3].followed).toBeTruthy

})