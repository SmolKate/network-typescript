import { Action, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import friendsReducer from './friends-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunk from 'redux-thunk';
import appReducer from './app-reducer';
import { ThunkAction } from "@reduxjs/toolkit";

let rootReducer = combineReducers({
    friendsNavbar: friendsReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

let store = configureStore({      // another method: let store = configureStore({rootReducer}, applyMiddleware (thunk));
    reducer: rootReducer,                          // export type RootState = ReturnType<typeof store.getState>
    middleware: [thunk] as const,
  });


export default store;

// Types 

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch // It is an example and necessary only to define type for dispatches without ThunkType. See 'getUsers' in users-reducer.ts

// Define types for actions from actions themselves. 
// Condition "T extends (...args: any[])=> any" is neseccary for cases when action creators are not in one object. See "friends-reducer.ts"
// If action creators are placed in a separate file (see auth-actions.ts) or listed in the form of object this condition could be deleted in all 3 types below
export type BasicActionsType<T> = T extends {[key: string]: (...args: any[])=> infer U} ? U : T extends (...args: any[])=> any ? T : never // "T extends (...args: any[])=> any" is neseccary for cases when action creators are not in one object. See "friends-reducer.ts"
export type BasicThunkType<T extends Action, P = Promise<void>> = ThunkAction<P, RootState, unknown, T>
