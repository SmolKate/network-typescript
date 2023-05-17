import { actions, follow, unfollow } from "./users-reducer"
import { usersAPI, ResponseType, CommonResultCodeEnum } from "../api/api"

jest.mock('../api/api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn(() => {
  Promise.resolve();
})
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear
  getStateMock.mockClear
})

let result: ResponseType = {
    data: [],
    messages: [],
    resultCode: CommonResultCodeEnum.Success
}


test('follow thunk', async () => {
  const thunk = follow(1)

  userAPIMock.setFolow.mockResolvedValue(Promise.resolve(result))
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(4)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeIsFollowingInProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.changeIsFollowingInProgress(false, 1))

})

test('unfollow thunk', async () => {
  const thunk = unfollow(1)

  userAPIMock.setUnfolow.mockResolvedValue(Promise.resolve(result))
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(4)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeIsFollowingInProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.changeIsFollowingInProgress(false, 1))

})