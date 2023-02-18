import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import friendsReducer from './friends-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunk from 'redux-thunk';
import appReducer from './app-reducer';

// export type AppStateType = ReturnType<typeof rootReducer> 

let rootReducer = combineReducers({
    friendsNavbar: friendsReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

let store = configureStore({
    reducer: rootReducer,
    middleware: [thunk] as const,
  });

// let store = configureStore({rootReducer}, applyMiddleware (thunk));
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;